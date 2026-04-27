# File Storage Architecture for TradeOps

Research note on the file storage strategy for TradeOps. Module 2 (Document control) is the foundation of a document-first product, so this is a load-bearing architectural decision. This note proposes a default architecture, names the trade-offs, and lists the empirical questions that need TT-HN workshop input before locking in a provider.

## Constraints That Shape the Decision

- **Per-broker independent deployment.** Each broker = one isolated TradeOps instance; no infra or data shared between brokers. Storage architecture must work per-deployment, not as a shared multi-tenant service.
- **Multi-tenant within broker.** Many end-clients in one deployment; access control at end-client level inside the storage layer.
- **5-year retention floor.** Post-clearance audit window (Điều 77 Luật Hải quan 2014) sets the minimum retention. Loss of audit trail = product fail; this is a load-bearing claim of the proposal.
- **Document mix.** Scanned PDFs (5-50 MB typical), photos arriving via Zalo (1-10 MB), Excel BOM (small), email attachments. Most documents are scanned / photographed, not text-native.
- **Volume estimate (rough).** Per end-client per year: hundreds to low-thousands of documents. Per broker (10-50 end-clients) over 5 years: 50K-500K documents, 0.5-5 TB total. Modest by cloud-storage standards.
- **Read-heavy with peaks.** Daily ops read steadily; spikes during BCQT cycle (year-end) and during audit response (reactive, can be intense for days/weeks).
- **Sovereignty.** Customs brokers handle sensitive end-client data (DN chế xuất / SXXK). Sovereignty preference is generally strong; data leaving Vietnam needs a defensible reason.
- **Versioning + supersedence first-class.** BOM versions, document supersedence (newer Invoice version replaces older), C/O đầu vào linked to multiple dossiers — the storage model must support immutable originals plus metadata-tracked version chains.
- **Three workflow apps integrate via API.** Siafu / Barry-CO / Barry-BCQT read documents from TradeOps via API; signed URLs are the natural pattern for ephemeral document access.

## Boundary: What Tinsu AI Builds vs What the Provider Provides

The provider is a **hosted hard drive with an S3 API**, nothing more. All product intelligence stays in Tinsu AI's own code and database.

```
+-------- Tinsu AI builds (TradeOps app) --------+   +- Provider provides -+
| Backend (workflow, business logic, audit)      |   | Bytes of files       |
| Frontend (UI, dossier views, search)           |   | Durability           |
| Postgres                                       |   | Object Lock          |
|   - end-client / dossier / item master / BOM   |   |   enforcement        |
|   - multi-view inventory / audit trail         |   | Lifecycle to         |
|   - file metadata: hash, dossier link,         |   |   archive class      |
|     classification, version chain, ACL         |   | Download bandwidth   |
| Search index (Postgres FTS / Meilisearch)      |   |                      |
| Authentication / authorization                 |   |                      |
| Workflow engine                                |   |                      |
| API for Siafu / Barry-CO / Barry-BCQT          |   |                      |
+------------------------------------------------+   +----------------------+
            |                                                   ^
            |  S3 API (PUT / GET / signed URLs)                 |
            +---------------------------------------------------+
```

**Upload flow:** user → Tinsu AI backend → backend computes SHA-256 → backend writes metadata row to Postgres → backend uploads bytes to provider via S3 API → returns success.

**Download flow:** user requests doc → Tinsu AI backend authorizes (end-client tenancy + role check) → backend issues short-lived signed URL → user GETs bytes directly from provider.

**Why this boundary matters:**

- **Portability:** standard S3 SDK means switching to a different provider is a data migration (re-upload + update `storage_key` in Postgres), not a code change. Self-hosting MinIO later works the same way — different endpoint, same SDK.
- **Intelligence stays with us:** access control, version semantics, audit trail, search, workflow — all in code we own. The provider does not see any of this; they only see opaque blobs.
- **Provider lock-in is shallow:** if a provider deteriorates (price, reliability, compliance posture), migration is mechanical, not architectural.

## Default Architecture

### Hot/warm tier: VN cloud object storage (S3-compatible)

Deploy on a Vietnamese cloud provider with S3-compatible object storage. Candidates: **Viettel Cloud, VNG Cloud, FPT Cloud, CMC Cloud** — all offer S3-compatible API and have Vietnam-region presence.

Rationale:

- **Sovereignty:** data stays in VN; broker and end-clients are comfortable with that; no awkward cross-border data conversation
- **Cost:** typically lower than AWS S3 / GCP Cloud Storage in the Singapore region for hot tier
- **Compatibility:** standard S3 SDK works (with provider-specific quirks at the edges); team's engineering investment is portable across providers and to AWS later if needed
- **Match to tenant model:** each broker deployment has its own bucket; no cross-broker sharing in the storage layer either

### Cold/archive tier

After a dossier is `archived` (CO issued, BCQT submitted) and stays untouched for N years (suggested: 1-2 years), documents move to the provider's archive class (cheaper per-GB, retrieval latency higher). The 5-year retention horizon is most of the data's life by volume, but most of it is cold — only audit response touches it.

### Metadata layer: Postgres

Document records live in Postgres with: `id`, `end-client_id`, `dossier_link`, `version_chain_id`, `classification`, `source_channel`, `file_hash` (SHA-256), `storage_key`, `size`, `created_at`, `created_by`, `superseded_by`, `archive_tier`. Files in object store are addressed by hash; metadata lookup gives the storage key.

Never list files by walking the bucket; always go through Postgres. The bucket is a content-addressable blob store, not a filesystem.

### Content-addressable storage

The storage key is the SHA-256 hash of the file. Same physical file uploaded twice = stored once. Important for source C/Os linked to multiple shipments, and for the same end-client document arriving via multiple channels (Zalo and email of the same scan).

### Immutability + versioning

- Original upload is immutable (S3 Object Lock or "no DELETE from API" policy)
- Supersedence is a metadata link, not a file replacement
- Version chain reconstructible at any point in time per Module 3 (audit trail)

### Backup / DR

Daily replication to a second VN provider (cross-cloud DR). Important because:

- 5-year retention is a regulatory floor; loss of audit trail is catastrophic
- Single-provider outage or account compromise must not lose data
- Customer trust requires that data has a second copy somewhere

Cross-provider DR adds modest cost (~50% storage cost duplicated) but is the right insurance for the audit-defense product position.

### Access control

- Backend mediates every access request (auth + authz against end-client tenancy + role)
- Signed URLs (5-15 minute TTL) for direct download from object store after backend authorization
- Audit trail (Module 3) records every access — important for both internal compliance and any later customer query

### Search

Search at a customs broker is overwhelmingly **metadata-driven**, not content-driven: by end-client, dossier, item, date range, document type, source channel, version. All of these are in Postgres at intake (Module 2 captures classification + dossier link + supersedence + source channel) — Postgres queries cover the actual retrieval patterns.

Audit reconstruction is a relational query against metadata (find dossier → find linked documents), not full-text search across content.

**OCR is NOT in the default architecture.** Documents in TradeOps are evidence sitting behind structured data captured elsewhere (TKNK fields are in Siafu / VNACCS, BOM lines are in Module 5, CO outputs are in Barry-CO) — extracting text from scans does not unlock load-bearing functionality. OCR adds pipeline complexity, accuracy variance on stamped / handwritten Vietnamese documents, and ongoing per-document cost without a clear use case beyond "nice-to-have full-text search."

**Defer OCR to Phase 2+** if real usage shows search-by-content is needed. Even then, narrow-purpose extraction (e.g., auto-fill specific fields from invoices) is a feature, not infrastructure — handled by a separate service called from the workflow, not baked into storage.

## Trade-offs

| Decision | Option A | Option B | Trade-off |
|---|---|---|---|
| Storage location | VN cloud provider | International (AWS/GCP Singapore) | Sovereignty vs ecosystem maturity, SDK polish |
| Storage abstraction | Object store (S3) | NAS / filesystem | Cloud-native + signed URLs vs ops simplicity |
| Backup target | Cross-VN-provider | Same provider, different region | DR strength vs cost / simplicity |
| Cold tier | Lifecycle to archive class | Single hot tier | Long-term cost vs ops simplicity |
| Per-broker bucket | One bucket per deployment | Shared bucket with prefix-per-broker | Tenant isolation vs ops simplicity |

The trade-off table is the design-partner research output: for each row, broker #2 may push the choice the other way and we want to be ready.

## Open Questions for TT-HN Workshop

These cannot be resolved from desk research; they need TT-HN input:

1. Existing cloud provider relationships (Viettel / VNG / FPT / CMC) — TT-HN may already have a contract that prices a deployment cheaper or matches their procurement preference
2. End-client data sovereignty policies — any DN chế xuất / SXXK end-client that requires data in their own country or on-premise?
3. Current document volume at TT-HN — total GB, documents/month per end-client, peak rate during BCQT season
4. Budget split — broker pays hosting, or pass-through to end-client?
5. Need for on-premise option for any end-client (some industrial DN chế xuất may have IT policies requiring data to physically reside on their server)
6. Disaster recovery RPO / RTO tolerance — how much data loss tolerable, how fast must recovery be?
7. Do TT-HN's existing Excel / file-share workflows hold any documents that should be migrated at deployment, vs. only forward-looking?

## Recommendation

**Default architecture (defer specific provider until TT-HN workshop):**

- Object storage on a VN cloud provider (final choice deferred — Viettel / VNG / FPT / CMC, decided per TT-HN preference)
- Postgres metadata layer with content-addressable hash keys; metadata is the source of truth for what exists
- Object Lock / append-only pattern for immutability
- Cross-VN-provider daily replication for DR
- Lifecycle policy: archive class after N years per dossier
- Backend-mediated access; signed URLs for direct download
- Search via Postgres metadata (no OCR, no content full-text search at Phase 1)

**General vs TT-HN-specific:** the architecture above is general. Provider choice, OCR provider, and on-premise carve-outs are TT-HN-specific decisions that surface in workshop. The architecture stays portable — switching VN providers in future is a deployment-config change, not a product change.

**Out of scope (deferred):** specific bucket layout / prefix scheme; CDN edge caching for read performance; on-premise deployment option for sovereignty-strict end-clients (Phase 2+); content de-duplication at sub-file level; full-text search ranking tuning.

## Related Documents

- `file-storage-vn-providers.md` — point-in-time research on Viettel / VNG / FPT / CMC offerings (Object Lock support, archive class, OCR, pricing, compliance posture)
- `file-storage-poc-checklist.md` — verification gate to run on candidate providers before locking in, covering S3 API quirks, Object Lock semantics, lifecycle, performance, and cost estimation
