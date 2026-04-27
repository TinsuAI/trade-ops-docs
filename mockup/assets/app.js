/* TradeOps mockup — hash router + scope-aware breadcrumb + Q-key overlay.
 *
 * Routes resolve to screens/<file>.html. Scope-aware: routes that operate on a
 * customer auto-render breadcrumb segments showing customer name. Pressing Q
 * (or clicking the chip) toggles a presenter overlay with the per-screen
 * questions extracted from <aside class="questions-panel">. */

const VIEW_EL_ID = "view";
const CRUMB_EL_ID = "crumb";
const Q_OVERLAY_BODY_ID = "q-overlay-body";

const CUSTOMERS = {
    "dn-det-may-01": { name: "Thiên Hà Dệt May", stripe: 1 },
    "dn-dien-tu-02": { name: "Linh Kiện Điện Tử Minh Phú", stripe: 2 },
    "dn-co-khi-03": { name: "Cơ Khí Tân Hưng", stripe: 3 },
    "dn-bao-bi-04": { name: "Bao Bì Việt Long", stripe: 4 },
};

function crumbForCurrentCustomer(leafLabel) {
    const id = (typeof window !== "undefined" && sessionStorage.getItem("currentCustomer")) || "dn-det-may-01";
    const c = CUSTOMERS[id] || CUSTOMERS["dn-det-may-01"];
    return [
        { text: "Khách hàng", href: "#/clients" },
        { customer: c.name, href: "#/end-client/" + id },
        { text: leafLabel },
    ];
}

const ROUTES = {
    dashboard: {
        file: "dashboard",
        nav: "dashboard",
        crumb: () => [{ text: "Tổng quan" }],
        next: { route: "end-client/dn-det-may-01", label: "Trạm 2 · Vào một khách hàng" },
    },
    clients: {
        file: "clients",
        nav: "clients",
        crumb: () => [{ text: "Khách hàng" }],
    },
    "end-client": {
        file: "end-client",
        nav: "clients",
        crumb: (id) => {
            const c = CUSTOMERS[id];
            if (c) {
                if (typeof window !== "undefined") sessionStorage.setItem("currentCustomer", id);
                return [{ text: "Khách hàng", href: "#/clients" }, { customer: c.name }];
            }
            return [{ text: "Khách hàng" }];
        },
        next: { route: "item-master", label: "Trạm 3 · Dữ liệu nền" },
    },
    "item-master": {
        file: "item-master",
        nav: "clients",
        crumb: () => crumbForCurrentCustomer("Dữ liệu nền · Mã hàng"),
        next: { route: "bom", label: "BOM →" },
    },
    bom: {
        file: "bom",
        nav: "clients",
        crumb: () => crumbForCurrentCustomer("Dữ liệu nền · BOM"),
        next: { route: "inventory", label: "Tồn 3 góc nhìn →" },
    },
    inventory: {
        file: "inventory",
        nav: "clients",
        crumb: () => crumbForCurrentCustomer("Dữ liệu nền · Tồn 3 góc nhìn"),
        next: { route: "co-dossier/eu-2026-04", label: "Trạm 5 · Hồ sơ C/O" },
    },
    "document-control": {
        file: "document-control",
        nav: "clients",
        crumb: () => crumbForCurrentCustomer("Tài liệu"),
    },
    "dossier-list": {
        file: "dossier-list",
        nav: "dossiers",
        crumb: () => [{ text: "Hồ sơ · tất cả" }],
    },
    "co-dossier": {
        file: "co-dossier",
        nav: "dossiers",
        crumb: (id) => [
            { text: "Hồ sơ", href: "#/dossier-list" },
            { text: "C/O · " + (id || "—") },
        ],
        next: { route: "audit-defense/co-2023-q3-047", label: "Trạm 6 · Hồ sơ cũ KTSTQ" },
    },
    "bcqt-cycle": {
        file: "bcqt-cycle",
        nav: "dossiers",
        crumb: () => [
            { text: "Hồ sơ", href: "#/dossier-list" },
            { text: "BCQT năm 2025 · Thiên Hà Dệt May" },
        ],
        next: { route: "ktstq-response/case-2026-001", label: "Trạm 8 · Phản hồi KTSTQ (tuỳ chọn)" },
    },
    "audit-defense": {
        file: "audit-defense",
        nav: "dossiers",
        crumb: (id) => [
            { text: "Hồ sơ", href: "#/dossier-list" },
            { text: "Hồ sơ cũ · " + (id || "—") },
        ],
        next: { route: "bcqt-cycle/dn-det-may-01-2025", label: "Trạm 7 · Chu trình BCQT" },
    },
    "ktstq-response": {
        file: "ktstq-response",
        nav: "dossiers",
        crumb: () => [
            { text: "Hồ sơ", href: "#/dossier-list" },
            { text: "Phản hồi KTSTQ" },
        ],
    },
    "audit-trail": {
        file: "audit-trail",
        nav: "log",
        crumb: () => [{ text: "Nhật ký" }],
    },
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
    const entry = ROUTES[route] || ROUTES.dashboard;
    const target = document.getElementById(VIEW_EL_ID);
    target.innerHTML = '<div class="view-loading">Đang tải…</div>';

    try {
        const res = await fetch(`screens/${entry.file}.html`, { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const html = await res.text();
        target.innerHTML = html;
        /* innerHTML does not execute <script> tags — re-create them so per-screen
         * inline scripts (sub-tab toggles, view switchers) run. */
        target.querySelectorAll("script").forEach((oldScript) => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes).forEach((attr) =>
                newScript.setAttribute(attr.name, attr.value)
            );
            newScript.textContent = oldScript.textContent;
            oldScript.replaceWith(newScript);
        });
    } catch (err) {
        target.innerHTML = `<div class="zone"><h2>Không tải được màn</h2><p class="muted">${err.message}. File <code>screens/${entry.file}.html</code> chưa tồn tại.</p></div>`;
    }

    if (entry.next) {
        const footer = document.createElement("div");
        footer.className = "next-station";
        footer.innerHTML = `<span class="muted">Theo kịch bản:</span><a class="next-station-link" href="#/${entry.next.route}">${entry.next.label} <span class="arrow">→</span></a>`;
        target.appendChild(footer);
    }

    updateNav(entry.nav);
    updateCrumb(entry.crumb ? entry.crumb(param) : []);
    extractQuestions();
    window.__route = { route, param };
    window.scrollTo({ top: 0, behavior: "instant" });
}

function updateNav(activeKey) {
    document.querySelectorAll(".topnav-link").forEach((link) => {
        if (link.dataset.nav === activeKey) link.classList.add("topnav-link-active");
        else link.classList.remove("topnav-link-active");
    });
}

function updateCrumb(segments) {
    const el = document.getElementById(CRUMB_EL_ID);
    if (!el) return;
    if (!segments.length) { el.innerHTML = ""; return; }

    const parts = [];
    segments.forEach((seg, idx) => {
        const last = idx === segments.length - 1;
        if (seg.customer) {
            const html = last
                ? `<span class="crumb-customer">${seg.customer}</span>`
                : `<a class="crumb-customer" href="${seg.href || "#"}">${seg.customer}</a>`;
            parts.push(html);
        } else {
            const txt = seg.text || "";
            if (last) parts.push(`<span class="crumb-current">${txt}</span>`);
            else if (seg.href) parts.push(`<a href="${seg.href}">${txt}</a>`);
            else parts.push(`<span>${txt}</span>`);
        }
        if (!last) parts.push('<span class="crumb-sep">›</span>');
    });
    el.innerHTML = parts.join(" ");
}

function extractQuestions() {
    const aside = document.querySelector("#" + VIEW_EL_ID + " .questions-panel");
    const overlayBody = document.getElementById(Q_OVERLAY_BODY_ID);
    if (!overlayBody) return;
    if (!aside) {
        overlayBody.innerHTML = '<p class="muted" style="font-size: 0.88rem;">Chưa có câu hỏi mở cho màn này.</p>';
        return;
    }
    overlayBody.innerHTML = aside.innerHTML;
}

function toggleQOverlay(force) {
    const body = document.body;
    const willOpen = typeof force === "boolean" ? force : !body.classList.contains("q-mode");
    body.classList.toggle("q-mode", willOpen);
    const overlay = document.getElementById("q-overlay");
    if (overlay) overlay.setAttribute("aria-hidden", willOpen ? "false" : "true");
}

document.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "q" || e.key === "Q") { e.preventDefault(); toggleQOverlay(); }
    if (e.key === "Escape" && document.body.classList.contains("q-mode")) toggleQOverlay(false);
});

document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest && target.closest("#q-toggle")) { toggleQOverlay(); return; }
    if (target.id === "q-overlay") toggleQOverlay(false);
});

window.addEventListener("hashchange", loadView);
window.addEventListener("DOMContentLoaded", loadView);
