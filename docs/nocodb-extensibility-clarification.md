# NocoDB extensibility — clarification trước khi commit architecture

**Ngày**: 2026-04-28
**Bối cảnh**: TradeOps đang cân nhắc dùng NocoDB làm substrate (partner đã triển khai NocoDB cho phía khách hàng để làm task assignment). Có ý kiến rằng NocoDB cho phép "cắm module vào, gọi là app". Tài liệu này verify capability đó dựa trên docs + release notes 2026.

---

## TL;DR

NocoDB có 3 khái niệm liên quan đến "module/app/extension" — nhưng **không khái niệm nào là SDK cho phép developer tự code 1 module rồi cắm vào instance NocoDB**. Mặt khác, phần lớn "module-like" capability bị **gate về Enterprise/Cloud paid tier** — Free OSS Community Edition không có.

Trước khi commit architecture cho TradeOps, đề nghị partner confirm cụ thể **feature nào** đang được nhắc đến.

---

## 3 khái niệm NocoDB hay nhầm lẫn

### 1. Extensions framework

- Side panel của installable modules per base
- 6 extensions chính thức do team NocoDB build sẵn: **Data Exporter / Upload from CSV / URL Preview / World Clock / Page Designer / Bulk Update**
- Built bằng JS + Vue
- **Custom extension SDK chưa support** — docs ghi rõ "available soon" từ tháng 11/2024 đến nay (>17 tháng) vẫn chưa ship. Release mới nhất 2026.04.0 (24/04/2026) cũng không có
- **Gate**: Cloud + Enterprise self-host. **Free OSS Community Edition KHÔNG có**

### 2. App Store

- Đây là chỗ NocoDB dùng từ "App" trong UI
- Là integration **configs**, không phải code modules:
  - **Chat**: Slack / Discord / Teams / Twilio / WhatsApp / Mattermost
  - **Email**: SMTP / SES / MailerSend
  - **Storage**: S3 / GCS / MinIO / Spaces / Backblaze
- **Free OSS có App Store** — nhưng chỉ cho phép config integration sẵn có, không thêm app type mới
- KHÔNG phải là chỗ cắm UI module vào

### 3. Scripts + Button + Workflows

- **Scripts**: JS/TS engine, chạy bằng manual run hoặc gắn vào Button field hoặc Workflow node
- **Button field**: trigger script trên row level
- **Workflows** (beta GA từ 2026.01.0): visual flow editor cho automation
- **Limit**: Scripts output chỉ text/markdown/table — **không render UI custom**. Workflows là behavior automation, không phải UI module
- **Gate**: Cloud Plus (Scripts) / Enterprise self-host (Workflows). **Free OSS KHÔNG có cả 2**

---

## Free self-host gating — chi tiết

| Capability | Free OSS Community | Enterprise / Cloud |
|------------|-------------------|--------------------|
| Tables, basic views (Grid/Form/Kanban/Gallery/Calendar/Map) | ✅ | ✅ |
| LinkToAnotherRecord, Lookup, Rollup, Formula, Attachment | ✅ | ✅ |
| App Store (Chat/Email/Storage integration configs) | ✅ | ✅ |
| Webhooks outgoing | ✅ | ✅ |
| REST API v3 | ✅ | ✅ |
| Workspace/base/table-level RBAC | ✅ | ✅ |
| **Extensions framework** | ❌ | ✅ |
| **Scripts (JS engine)** | ❌ | ✅ |
| **Workflows (automation)** | ❌ | ✅ |
| **Dashboards + iFrame widget** | ❌ | ✅ |
| **Granular Permissions (field-level)** | ❌ | ✅ |
| **Record-Level Security (RLS)** | ❌ | ✅ |
| **Teams** | ❌ | ✅ |
| **SSO / SAML** | ❌ | ✅ |
| **Custom Extension SDK** | ❌ KHÔNG có ở đâu cả | ❌ KHÔNG có ở đâu cả |

Source: [nocodb.com/pricing](https://nocodb.com/pricing), [docs/product-docs/account-settings/oss-specific-details](https://nocodb.com/docs/product-docs/account-settings/oss-specific-details/)

---

## SDK custom extension — status hiện tại

- Documentation extensions: *"The ability to develop custom extensions is not supported currently"* — đi kèm note "coming soon"
- Maintainer trên GitHub Discussion (#5593) đã **explicitly disavow** việc có plugin marketplace cho phép third-party authoring
- Community thread #1495 ("How to create a custom plugin?") không có câu trả lời chính thức
- Custom view types: KHÔNG support
- Custom field renderer: KHÔNG support
- Custom topnav/sidebar/dashboard widget tự author: KHÔNG support
- Custom Vue components ship vào NocoDB: KHÔNG support

Tóm lại: **không có SDK nào ở mọi tier để Tinsu AI tự code 1 module rồi cắm vào NocoDB instance**.

---

## Có thể partner đang nhìn vào gì? (3 khả năng)

### Khả năng 1: 2026.04.0 Minibar mới

Release 2026.04.0 (24/04/2026) thêm sidebar mới với sections **Data / Docs / Workflows / Chat / Settings**. Trông như "apps" nhưng đây là **fixed product nav**, không phải pluggable. Không có cách thêm section mới.

### Khả năng 2: App Store screenshot

Thấy chữ "App" trong UI App Store, hiểu là cắm app vào. Thực ra là integration connector configs (Slack/SMTP/S3), không phải code modules.

### Khả năng 3: Extensions Marketplace screenshot

Thấy chữ "Marketplace", hiểu là có third-party authoring. Thực ra chỉ 6 extensions first-party do team NocoDB build, không có authoring SDK.

---

## Câu hỏi đề nghị partner clarify

Trước khi commit architecture cho TradeOps, đề nghị partner trả lời:

1. **Feature cụ thể** nào của NocoDB cho phép "cắm module vào"? Link docs / screenshot UI để cùng verify.
2. NocoDB instance hiện tại đang ở **tier nào** — Free OSS Community, Cloud Free/Plus/Business, hay Enterprise self-host? Việc này quyết định Workflows + Scripts + RLS có hay không.
3. Module "cắm vào" sẽ được **author bằng ngôn ngữ gì** — JavaScript/Vue (theo Extensions framework giả định ship), hay là wrap external service (Python FastAPI) vào webhook?
4. Nếu module cần **custom UI** (ví dụ workflow stepper 8 bước, hero zone date contrast, multi-view inventory side-by-side reconciliation), NocoDB có render được không?

---

## Implication cho TradeOps architecture

- Nếu partner xác nhận feature thật và không phải nhầm: re-evaluate, có thể tận dụng được trong scope giới hạn
- Nếu partner nhầm: NocoDB Free OSS chỉ là "database UI thuần" — không đủ làm substrate cho TradeOps mockup. Default architecture là **Path A**: Python (FastAPI) + Postgres + Jinja/HTMX (theo pattern BCQT-System đã có), NocoDB ở partner side cho task assignment chỉ là sibling app integrate qua webhook
- Nếu partner muốn extensibility thật cho TradeOps: cần pivot sang tool có plugin SDK thực sự (**Directus** / **Strapi** / **Appsmith** / **Budibase**), hoặc upgrade NocoDB lên Enterprise (~$500-1500/month tuỳ seats), hoặc build custom (Path A)

---

## Sources

- [NocoDB Extensions Overview](https://nocodb.com/docs/product-docs/extensions/overview)
- [NocoDB OSS Specific Details](https://nocodb.com/docs/product-docs/account-settings/oss-specific-details/)
- [NocoDB Pricing](https://nocodb.com/pricing)
- [GitHub Discussion #5593 — maintainer disavow plugin marketplace](https://github.com/nocodb/nocodb/discussions/5593)
- [Community thread #1495 — how to create custom plugin](https://community.nocodb.com/t/how-to-create-a-custom-plugin/1495)
- [NocoDB Scripts docs](https://nocodb.com/docs/scripts)
- [NocoDB Workflow docs](https://nocodb.com/docs/product-docs/automation/workflow)
- [Changelog 2026.01.0 (Workflows beta)](https://nocodb.com/docs/changelog/2026.01.0)
- [Release 2026.04.0](https://github.com/nocodb/nocodb/releases/tag/2026.04.0)
- [Dashboards iFrame widget](https://nocodb.com/docs/product-docs/dashboards/widgets/iframe)
