# File Storage POC Checklist

Spike checklist for evaluating any candidate VN cloud object storage provider before locking the TradeOps deployment to it. Each item is concrete enough to test in 1-2 hours; a full POC against one provider should fit in roughly one day.

Run this as a verification gate **after** TT-HN workshop has narrowed to 1-2 candidate providers, not before. Running on all four providers up front is wasted effort if procurement preference rules out three of them.

## Pre-flight

- Sign up for trial / free tier
- Get API credentials (access key, secret key, endpoint URL)
- Confirm region location is in Vietnam (verify physical region claim, not marketing language)
- Install standard S3 SDK (e.g., `aws-sdk-go-v2`, `boto3`, or `aws-sdk-js`) and configure with the provider's custom endpoint URL
- Confirm SDK can authenticate without modifications

## Core S3 API smoke tests

- [ ] List buckets
- [ ] Create bucket programmatically (with region specified)
- [ ] PUT object — small file (<1 MB)
- [ ] PUT object — large file (>100 MB) via multi-part upload
- [ ] GET object
- [ ] HEAD object (for size + metadata)
- [ ] Custom metadata (`x-amz-meta-*`) on PUT, retrievable via HEAD and GET
- [ ] List objects with prefix
- [ ] List objects with continuation token (pagination correct?)
- [ ] DELETE object
- [ ] Conditional requests (`If-Match` ETag, `If-None-Match`)

## Pre-signed URL (load-bearing for our access pattern)

- [ ] Generate PUT pre-signed URL with 15-minute TTL
- [ ] Upload via that URL (curl, no SDK in path)
- [ ] Generate GET pre-signed URL with 5-minute TTL
- [ ] Download via that URL
- [ ] Verify URL expires after TTL (request after expiry returns 403)
- [ ] Verify URL signing handles `Content-Type` header correctly for PUT

## Versioning

- [ ] Enable versioning on bucket
- [ ] PUT same key twice → two versions
- [ ] List versions
- [ ] GET specific version by version-id
- [ ] DELETE on versioned bucket returns delete marker (does not actually delete)
- [ ] Permanent delete (DELETE with version-id) works

## Object Lock / immutability — load-bearing for audit defense

- [ ] Object Lock supported at all?
- [ ] Compliance mode supported (cannot be removed even by root account)?
- [ ] Governance mode supported (can be overridden by privileged role)?
- [ ] Default retention period configurable at bucket level?
- [ ] Per-object retention override
- [ ] Legal hold supported and removable independently of retention
- [ ] Verify cannot DELETE / overwrite during retention period (negative test)

If Object Lock is not supported, this is a hard limitation for our 5-year audit-defense claim. Either accept (and document the alternative immutability mechanism) or rule out the provider.

## Lifecycle policies

- [ ] Lifecycle rule configurable via API (not just web console)
- [ ] Transition rule: move to archive class after N days from object creation
- [ ] Expiration rule: optional, for non-retention-protected objects
- [ ] Verify the rule actually fires in test (small N for testing, like 1 day)

## Archive / cold storage class

- [ ] Archive class exists at this provider?
- [ ] Storage cost per GB at archive class (vs hot tier)
- [ ] Retrieval latency tiers (standard / expedited / bulk if applicable)
- [ ] Restore archived object via API and time the restore operation
- [ ] Minimum storage duration for archive class (some providers charge 90+ days minimum)
- [ ] Restore cost per GB

## Replication / DR

- [ ] Cross-region replication within same provider (if multiple VN regions)
- [ ] Cross-provider replication via SDK + scheduled job — measure throughput
- [ ] Document approximate replication lag

## Encryption

- [ ] HTTPS-only bucket policy enforceable
- [ ] SSE-S3 (provider-managed keys, default)
- [ ] SSE-KMS support (customer-managed keys, if needed for sovereignty argument)
- [ ] Verify encryption at rest is actually applied (check object metadata or provider docs)

## Audit logging

- [ ] Bucket access logs available (CloudTrail-equivalent or similar)
- [ ] Log delivery to a log bucket via API
- [ ] Log retention configurable
- [ ] Log additional cost (per request? per GB?)

## Performance

- [ ] Concurrent upload throughput (10 parallel uploads, time them)
- [ ] Latency from typical Vietnam ISP (broker office network) to bucket endpoint
- [ ] Per-prefix throughput limit (some providers throttle aggressively beyond a small request rate)

## Cost estimate at projected volume

Compute total cost over 5 years at the following assumed volume per broker deployment:

- 1 TB hot tier (active dossiers, last 1-2 years)
- 4 TB archive tier (older dossiers in retention)
- 100K PUTs/year
- 1M GETs/year (read-heavy, with audit-response spikes)
- Light egress (mostly within VN; signed URLs delivered to VN-based broker staff and end-clients)

Budget items:
- [ ] Storage hot tier — VND/GB/month × 12 × 5
- [ ] Storage archive tier — VND/GB/month × 12 × 5 (with minimum-storage-duration adjustment)
- [ ] Request cost per 1K PUT
- [ ] Request cost per 1K GET
- [ ] Egress cost (estimate small)
- [ ] Lifecycle transition cost
- [ ] Restore from archive cost (estimate occasional)
- [ ] Object Lock surcharge if any
- [ ] Replication cost to second provider (DR)

Express total in VND/month for the deployment. Compare across providers.

## Operational

- [ ] Billing currency (VND vs USD — affects broker accounting and TT-HN procurement)
- [ ] VAT invoice support
- [ ] Vietnamese-language support (response time, SLA, phone vs email)
- [ ] Console quality (Vietnamese UI, console feature parity with API)
- [ ] Documentation quality — API docs available, examples present, English vs Vietnamese only
- [ ] Published SLA (uptime guarantee, credit policy)
- [ ] Free trial duration and limits
- [ ] Time to provision a new bucket (matters for per-broker-deployment workflow at Tinsu AI)

## Compliance

- [ ] ISO 27001 certification
- [ ] Data residency guarantee in VN (legal commitment, not deployment-region only)
- [ ] Compliance with Luật An ninh mạng / Nghị định 53/2022 data localization rules (if relevant)
- [ ] VAT-invoice support for end-client / broker accounting

## Decision matrix

After running this checklist on each candidate, score and pick:

| Criterion | Weight | Provider 1 | Provider 2 |
|---|---|---|---|
| S3 API compatibility | High | | |
| Object Lock support | High | | |
| Archive class + retrieval cost | Medium | | |
| Lifecycle automation | Medium | | |
| Total 5-year cost (per the budget above) | Medium | | |
| Operational quality (docs, support, console) | Medium | | |
| Compliance posture | Medium | | |
| Existing relationship with TT-HN | High (TT-HN-specific) | | |
| Bundled OCR availability | Low-Medium | | |

The top 1-2 go to TT-HN workshop with concrete recommendation and cost figures. Document failed checklist items per provider explicitly — they may surface again at broker #2 with different priorities.

## Out of scope for this POC

- CDN edge caching for read performance (Phase 2+)
- On-premise deployment option (Phase 2+ if a sovereignty-strict end-client requires)
- Sub-file-level deduplication (over-engineering at our volume)
- Full-text search ranking tuning (separate Meilisearch / Postgres FTS POC)
- Backup of object store metadata (covered by Postgres backup, separate concern)

## When to re-run

This checklist is a verification gate before locking in a provider. Re-run only when:

- A candidate provider releases a major update touching Object Lock / archive class / API compatibility
- TT-HN's procurement preference shifts to a previously-untested provider
- Broker #2 brings a procurement preference for a provider not yet tested
- A provider deprecates a feature we depend on (forces re-evaluation)
