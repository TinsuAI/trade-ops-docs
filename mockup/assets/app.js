/* TradeOps mockup — hash router + partial loader.
 * Loads screens/<route>.html into #view based on location.hash.
 * Routes with parameters use the form #/co-dossier/co-2026-q1-001 — the screen
 * file is screens/co-dossier.html and the parameter is exposed on window.__route. */

const VIEW_EL_ID = "view";
const NAV_LINK_SELECTOR = ".topnav-link";
const CRUMB_EL_ID = "crumb";

const ROUTE_TABLE = {
    dashboard: { file: "dashboard", crumb: "Tổng quan danh mục", nav: "dashboard" },
    "end-client": { file: "end-client", crumb: "Khách hàng cuối", nav: "clients" },
    "item-master": { file: "item-master", crumb: "Mã hàng + dịch mã HQ↔ERP", nav: "data" },
    bom: { file: "bom", crumb: "BOM master", nav: "data" },
    inventory: { file: "inventory", crumb: "Tồn nhiều góc nhìn", nav: "data" },
    "document-control": { file: "document-control", crumb: "Quản lý tài liệu", nav: "documents" },
    "dossier-list": { file: "dossier-list", crumb: "Danh sách hồ sơ", nav: "dossiers" },
    "co-dossier": { file: "co-dossier", crumb: "Chi tiết hồ sơ C/O", nav: "dossiers" },
    "bcqt-cycle": { file: "bcqt-cycle", crumb: "Chu trình BCQT", nav: "dossiers" },
    "audit-defense": { file: "audit-defense", crumb: "Hồ sơ cũ — KTSTQ", nav: "dossiers" },
    "ktstq-response": { file: "ktstq-response", crumb: "Phản hồi KTSTQ", nav: "dossiers" },
    "audit-trail": { file: "audit-trail", crumb: "Nhật ký kiểm tra", nav: "log" },
};

function parseHash() {
    const raw = (location.hash || "#/dashboard").replace(/^#\/?/, "");
    const parts = raw.split("/");
    const route = parts[0] || "dashboard";
    const param = parts.slice(1).join("/") || null;
    return { route, param };
}

async function loadView() {
    const { route, param } = parseHash();
    const entry = ROUTE_TABLE[route] || ROUTE_TABLE.dashboard;
    const target = document.getElementById(VIEW_EL_ID);
    target.innerHTML = '<div class="view-loading">Đang tải…</div>';

    try {
        const res = await fetch(`screens/${entry.file}.html`, { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const html = await res.text();
        target.innerHTML = html;
    } catch (err) {
        target.innerHTML = `<div class="workspace-panel"><h2>Không tải được màn</h2><p class="muted">${err.message}. File <code>screens/${entry.file}.html</code> chưa tồn tại — đang trong quá trình build.</p></div>`;
    }

    updateNav(entry.nav);
    updateCrumb(entry.crumb, param);
    window.__route = { route, param };
    window.scrollTo({ top: 0, behavior: "instant" });
}

function updateNav(activeKey) {
    document.querySelectorAll(NAV_LINK_SELECTOR).forEach((link) => {
        if (link.dataset.nav === activeKey) {
            link.classList.add("topnav-link-active");
        } else {
            link.classList.remove("topnav-link-active");
        }
    });
}

function updateCrumb(crumb, param) {
    const el = document.getElementById(CRUMB_EL_ID);
    if (!el) return;
    el.innerHTML = param
        ? `<span>${crumb}</span> <span class="mono muted">/ ${param}</span>`
        : `<span>${crumb}</span>`;
}

window.addEventListener("hashchange", loadView);
window.addEventListener("DOMContentLoaded", loadView);
