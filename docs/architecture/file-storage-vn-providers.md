# Vietnamese Cloud Object Storage Provider Survey

Point-in-time research note (2026-04-27) profiling the four major Vietnamese cloud providers on dimensions relevant to TradeOps file storage. Use this to narrow candidates before running the POC checklist (`file-storage-poc-checklist.md`). Providers update offerings quarterly — re-verify before final contract.

## Summary Table

| Provider | Object Lock | Archive class | OCR bundled | Pricing transparency | Public docs |
|---|---|---|---|---|---|
| Viettel Cloud (vObject) | Yes (Cloudian HyperStore base) | Yes, undocumented detail | Separate Viettel AI service | VND-tiered, 1,300→800 VND/GB/month | Vietnamese marketing; HyperStore upstream English |
| VNG Cloud (vStorage) | **Not publicly advertised** | Yes — 4 tiers (HP / Gold / Instant Archive / Archive) | No clearly documented OCR | Pricing page 404 at research time | **Best of the four** (docs.vngcloud.vn) |
| FPT Cloud (Object Storage) | Not in public marketing reviewed | No clearly named glacier-tier | **Strongest — FPT.AI Read 98%** | Flat capacity packages (2/5/10 TB) | Vietnamese + English, shallower than VNG |
| CMC Cloud (Cloud Storage S3) | **Yes — best documented** (compliance + governance + legal hold) | Yes, undocumented detail | Strong — Samsung SDS C.OPE2N + CATI-VLM | Entry 60K VND/month; per-GB by sales | Decent how-tos including Object Lock walkthrough |

## Provider Profiles

### Viettel Cloud (vObject)

- **Platform:** Cloudian HyperStore (deployed since 2022, 2 PB+ capacity). HyperStore is one of the most S3-faithful third-party implementations on the market.
- **S3 compatibility:** Fully compatible with S3 standard via HTTP/HTTPS APIs.
- **Object Lock:** Yes — Cloudian HyperStore Object Lock (compliance + governance modes) is highlighted as a Viettel selling point for ransomware/WORM. Suitable for 5-year retention enforcement.
- **Versioning:** Supported (HyperStore native S3 feature). Specifics not separately documented in Vietnamese marketing.
- **Lifecycle policies:** Standard S3 lifecycle supported via HyperStore.
- **Archive class:** Tiered standard vs. archive packages exist (archive aimed at logs, backups, infrequent access). Retrieval latency and minimum duration **not publicly documented** — verify via sales.
- **Pricing:** VND-tiered prepaid packages: 1,300 VND/GB/month at 100 GB; 800 VND/GB/month at 50 TB. No setup fee. 1-month free trial. 6/12/24-month contracts. Per-request and egress fees not publicly listed — typically negotiated.
- **Regions:** Multi-DC across Hanoi and HCMC. 5 Tier-III ANSI/TIA-942 Rated 3 facilities (only Vietnamese provider with that certification).
- **OCR/AI:** Viettel AI offers Vietnamese-document OCR (separate product, not bundled with vObject).
- **Compliance:** ISO 27001 / 27017 / 9001 / 50001 / 20000, SOC, PCI DSS. Decree 53 / 13 data residency by virtue of all-VN DCs.
- **Customers:** Government agencies, finance/banking institutes; ~40% VN DC market share (Nomura, 2019). One vObject customer reportedly generates 110M objects/day.
- **API docs:** Public Vietnamese marketing; HyperStore upstream docs are English. Less polished public developer portal than VNG / FPT.
- **Trial:** 1-month free trial on entry packages.

### VNG Cloud (vStorage)

- **Platform:** vStorage — multi-tier object/file/block storage. Object Storage tier offers 4 classes: High Performance, Gold, Instant Archive, Archive.
- **S3 compatibility:** Compatible with S3 SDK and S3 client tools; also supports OpenStack Swift and NFS/SMB layered atop. Documented Rclone / AWS-CLI interoperability.
- **Object Lock:** **Not advertised** on the product page or in the public docs reviewed. Marketing emphasizes "versioning and block public access" but is silent on Object Lock / WORM. **Treat as a gap until VNG sales confirms.** This is a hard requirement for our use case; if VNG cannot demonstrate compliance-mode Object Lock in writing, they fall out of contention.
- **Versioning:** Confirmed; cross-region backup also offered.
- **Lifecycle policies:** Yes — lifecycle rules to transition between the four tiers are a marketed feature. **This is VNG's strongest point** for cost optimization.
- **Archive class:** Two cold tiers — Instant Archive (millisecond access, cost-optimized) and Archive (cheapest, higher latency). Retrieval SLA and minimum duration not publicly numeric — verify.
- **Pricing:** Per-GB pricing page returned 404 at research time. Promotional 50 GB free Gold tier for 1 month. VND billing. "Most classes offer 100% free requests and 10× traffic" (free request and bundled egress up to 10× stored capacity) is the marketed model.
- **Regions:** Two — HAN01 (Hanoi) and HCM01/03/04 (HCMC). Dedicate-zone options. 10 Gbps scalable bandwidth.
- **OCR/AI:** Public catalog highlights AI training/infra and vCloudCam/AI Vision for video/face. **No clearly documented document-OCR product comparable to FPT.AI Read.**
- **Compliance:** PCI-DSS, ISO 27k.
- **Customers:** Zalo (parent), Bizzi, various game and media customers.
- **API docs:** **Best of the four** (docs.vngcloud.vn), Vietnamese + English, structured per region.
- **Trial:** 50 GB Gold class free for 1 month.

### FPT Cloud (Object Storage)

- **Platform:** FPT Object Storage — S3-compatible service for media, websites, mobile, IoT, backup, historical archives.
- **S3 compatibility:** "Compatible with S3 API standard". Tested clients: S3cmd, S3 Browser, Cyberduck, Rclone. SDK page links upstream MinIO docs, suggesting MinIO-class compatibility (broad but not 100% AWS S3).
- **Object Lock:** **Not documented in the public overview** reviewed; FPT's docs portal gates deeper feature detail. **Treat as unverifiable** until confirmed by sales. Likely supported (MinIO does support it) but cannot be confirmed from public surface.
- **Versioning / lifecycle:** Not listed in the marketing overview; basic bucket/object/folder/permission ops only at that level. Likely supported given MinIO base, but validate against a test bucket.
- **Archive class:** No clearly named glacier-equivalent in public marketing. Three packages positioned by capacity; 10 TB plan tagged "long-term, infrequent access" — closer to cold capacity than a true archive class.
- **Pricing:** Three flat capacity packages — 2 TB / 3.5M VND, 5 TB / 6M VND, 10 TB / 10M VND per month. Effective rate ~1,000–1,750 VND/GB/month. Per-request / egress / lifecycle pricing not split publicly.
- **Regions:** Hanoi (HN) and HCMC, with automatic cross-region bucket sync.
- **OCR / AI — strongest of the four:** FPT.AI Read / FPT AI Reader (>30 doc templates: VAT invoices, ID, driver's licence, passport, contracts; cited 98% accuracy on machine-print, with IDP+NLP layer). FPT.AI Vision for general image extraction. **Tightest fit for a customs broker product needing invoice / declaration OCR.**
- **Compliance:** ISO 27001 / 27017 / 27018, SOC 2 (FPT Smart Cloud, awarded 2023+).
- **Customers:** Vingroup, VPBank, banks, government — broadest public reference list among large VN enterprises.
- **API docs:** docs.fptcloud.com in Vietnamese + English; developer surface shallower than VNG's but covers SDK, CLI, S3 clients.
- **Trial:** No standardized free tier surfaced — credit / POC negotiated case-by-case.

### CMC Cloud (Cloud Storage S3)

- **Platform:** CMC Cloud Storage S3 — S3-compatible object storage marketed for unlimited capacity, 99.99% SLA, 12-nines durability.
- **S3 compatibility:** S3 API + HTTPS; compatible with standard S3 tooling per migration and S3-Client integration guides.
- **Object Lock:** **Yes — fully documented**, both Governance mode (bypassable with `s3:BypassGovernanceRetention`) and Compliance mode (immutable for retention period, even root cannot shorten); plus independent Legal Hold via `s3:PutObjectLegalHold`. **Best-documented Object Lock of the four.** Directly fits a 5-year retention compliance use case.
- **Versioning:** Confirmed; Object Lock auto-enables versioning when activated.
- **Lifecycle policies:** Listed as a feature ("lifecycle (managing data lifecycle)"). Exact transition rules and cold-tier targets not detailed publicly.
- **Archive class:** No publicly named glacier-tier separate from S3 standard at the bucket level. Verify via sales.
- **Pricing:** Entry from 60,000 VND/month. Bandwidth/egress free up to 10× stored capacity, then 250 VND/GB. 100 GB free trial. Per-GB rate at higher tiers not published — quoted by sales.
- **Regions:** 3 neutral DCs in Vietnam, Tier-III Uptime. Decree 13/2023 data-residency aligned.
- **OCR / AI:** Strong — Samsung SDS Vietnam OCR ("C.OPE2N") deployed on CMC Cloud (99% printed, 95% handwritten digits, 85% handwritten free text); CATI-VLM document-VLM (top 12 globally on DocVQA RRC 2025). Bundled within C.OpenAI ecosystem (SmartDoc, CLS, CMC KMS).
- **Compliance:** PCI-DSS, ISO 9001, ISO/IEC 27001. Explicitly markets Decree 53 compliance.
- **Customers:** Banking, healthcare, government per CMC marketing; named customers less prominently published than FPT / Viettel.
- **API docs:** Public Vietnamese docs at cmccloud.vn/document, decent how-tos including Object Lock walkthrough; English coverage thinner than VNG.
- **Trial:** 100 GB free for testing.

## Synthesis for TradeOps

For the dimensions that matter most — **Object Lock for legally-defensible 5-year immutability, archive tiering, S3 fidelity, and bundled OCR**:

- **Object Lock confidence:** CMC and Viettel are safest. CMC has the clearest public docs covering both compliance and governance modes; Viettel inherits Cloudian HyperStore's mature WORM implementation.
- **Multi-tier archive story:** VNG is strongest (4 classes with real lifecycle transitions) — but VNG does not publicly advertise Object Lock, which is a hard gap to clear with sales before committing.
- **OCR strength:** FPT is the standout (FPT.AI Read 98% on invoices / IDs) and SOC 2 certified — but its Object Storage public surface is the thinnest on Object Lock, lifecycle, and archive class. Likely capable but unverifiable from outside.
- **Pricing transparency:** Viettel and FPT have the most public pricing; VNG and CMC require sales engagement for full picture.
- **Documentation quality:** VNG > FPT > CMC > Viettel.
- **Enterprise track record:** FPT and Viettel have the broadest public customer lists in finance / banking / government.

**Recommended shortlist for paid POC against TT-HN's procurement preference:**

1. **CMC Cloud** — Object Lock + Decree 53 + Samsung SDS / CATI-VLM OCR — best technical fit on the load-bearing dimensions
2. **FPT Cloud** — OCR strength + SOC 2 + customer references — best brand recognition with broker procurement; require Object Lock verification

**Conditional candidates (depends on TT-HN preference):**

- **Viettel Cloud** — if TT-HN already has a Viettel relationship, Object Lock confidence is high; OCR is a separate Viettel AI product to consider in bundle
- **VNG Cloud** — if TT-HN already has a VNG relationship and is willing to accept written Object Lock confirmation from sales; archive tier story is genuinely the best of the four

## Caveats

- All findings as of 2026-04-27. Provider feature catalogs and pricing change quarterly — re-verify before contract.
- "Unverifiable from public sources" does NOT mean "not supported"; it means a sales conversation is required to confirm. Do not rule out a provider on absence of public marketing alone for the unverifiable items.
- The five-year retention compliance argument is the highest-stakes dimension. For TradeOps' audit-defense product position, Object Lock compliance mode (immutable even by root) is the appropriate technical posture — accept nothing weaker without explicit broker sign-off and documented mitigations.
- This survey did not test API quirks empirically. The POC checklist (`file-storage-poc-checklist.md`) is the empirical verification gate.
