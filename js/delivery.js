/* =========================================
   DELIVERY PAGE SCRIPT
========================================= */

const LANG_KEY = "pho_nuong_lang";

const DELIVERY_LANG = {
    vi: {
        current: "VN",
        searchPlaceholder: "Bạn muốn ăn gì hôm nay...",
        accountHello: "Chào mừng bạn đến với,",
        register: "Đăng ký",
        login: "Đăng nhập",
        profile: "Thông tin cá nhân",
        address: "Địa chỉ của tôi",
        orderHistory: "Lịch sử đặt hàng",

        voucher: "Phố Nướng eGift-voucher",
        deliveryPolicy: "Chính sách giao hàng",
        refundPolicy: "Chính sách trả và hoàn tiền",
        hotline: "Hotline:",

        welcome: "We welcome you to<br>Phố Nướng",
        shopName: "Phố Nướng Châu Đốc",
        shopAddr: "231 Trương Nữ Vương, Phường Châu Đốc, Tỉnh An Giang",
        openMap: "Mở bản đồ",

        menu: "Menu",
        popular: "Phổ biến",
        mustTry: "Đáng thử",
        feedback: "Trải nghiệm của bạn với website này ra sao?",

        footerCompany: "Quán nướng & lẩu phục vụ tại chỗ • mang về • giao hàng",
        branchAddress: "Địa chỉ chi nhánh",
        contactBooking: "Liên hệ & đặt bàn",
        commitment: "Cam kết của Phố Nướng",
        deliverySupport: "Hỗ trợ giao hàng",
        terms: "Điều khoản & chính sách",
        customerService: "Dịch vụ khách hàng",
        subscribeTitle: "Nhận ưu đãi & cập nhật mới từ Phố Nướng",
        emailPlaceholder: "Nhập email của bạn",
        subscribe: "Đăng ký",
        follow: "Theo dõi Phố Nướng",

        footerText1: "231 Trương Nữ Vương, Phường Châu Đốc,<br> Tỉnh An Giang",
        footerText2: "Hotline/Zalo: <a href='tel:1234567890'>1234567890</a><br> Đặt bàn trước: Qua điện thoại hoặc Facebook<br> Giờ mở cửa: 09:00 – 22:00 (hằng ngày)",
        footerText3: "• Nguyên liệu tươi mỗi ngày, chế biến tại chỗ.<br> • Đảm bảo vệ sinh an toàn thực phẩm.<br> • Giá rõ ràng, tư vấn món theo nhu cầu nhóm/tiệc.",
        footerText4: "Nhận đơn mang về & giao hàng trong khu vực Châu Đốc (tuỳ khoảng cách).<br> Vui lòng liên hệ <a href='tel:1234567890'>1234567890</a> để được báo phí và thời gian giao.",

        terms1: "Điều khoản & điều kiện sử dụng",
        terms2: "Chính sách thanh toán",
        terms3: "Chính sách bảo mật thông tin",
        service1: "Chính sách đặt bàn",
        service2: "Chính sách hủy / đổi lịch đặt bàn",
        service3: "Chính sách mang về & giao hàng"
    },

    en: {
        current: "EN",
        searchPlaceholder: "What would you like to eat today...",
        accountHello: "Welcome to,",
        register: "Register",
        login: "Login",
        profile: "Personal information",
        address: "My address",
        orderHistory: "Order history",

        voucher: "Pho Nuong eGift Voucher",
        deliveryPolicy: "Delivery Policy",
        refundPolicy: "Return & Refund Policy",
        hotline: "Hotline:",

        welcome: "We welcome you to<br>Pho Nuong",
        shopName: "Pho Nuong Chau Doc",
        shopAddr: "231 Truong Nu Vuong, Chau Doc Ward, An Giang Province",
        openMap: "Open map",

        menu: "Menu",
        popular: "Popular",
        mustTry: "Must try",
        feedback: "How was your experience with this website?",

        footerCompany: "Grill & hotpot restaurant • dine-in • takeaway • delivery",
        branchAddress: "Branch address",
        contactBooking: "Contact & reservation",
        commitment: "Pho Nuong commitment",
        deliverySupport: "Delivery support",
        terms: "Terms & policies",
        customerService: "Customer service",
        subscribeTitle: "Get offers and updates from Pho Nuong",
        emailPlaceholder: "Enter your email",
        subscribe: "Subscribe",
        follow: "Follow Pho Nuong",

        footerText1: "231 Truong Nu Vuong, Chau Doc Ward,<br> An Giang Province",
        footerText2: "Hotline/Zalo: <a href='tel:1234567890'>1234567890</a><br> Reservation: By phone or Facebook<br> Opening hours: 09:00 – 22:00 daily",
        footerText3: "• Fresh ingredients every day, prepared on site.<br> • Food safety and hygiene guaranteed.<br> • Clear pricing, menu advice for groups and parties.",
        footerText4: "Takeaway and delivery are available in Chau Doc area, depending on distance.<br> Please contact <a href='tel:1234567890'>1234567890</a> for delivery fee and estimated time.",

        terms1: "Terms & conditions",
        terms2: "Payment policy",
        terms3: "Privacy policy",
        service1: "Reservation policy",
        service2: "Cancellation / rescheduling policy",
        service3: "Takeaway & delivery policy"
    }
};

/* =========================================
   SLIDER AUTO
========================================= */
function setupSlider() {
    const slider = document.querySelector(".slider__main");
    if (!slider) return;

    const slides = slider.children;
    if (!slides.length) return;

    let index = 0;

    setInterval(function() {
        index = (index + 1) % slides.length;
        slider.style.transform = "translateX(-" + index * 100 + "%)";
    }, 4000);
}

/* =========================================
   ACCOUNT DROPDOWN
========================================= */
function setupAccountDropdown() {
    const btn = document.querySelector(".account__btn");
    const dropdown = document.querySelector(".account__dropdown");

    if (!btn || !dropdown) return;

    function openMenu() {
        dropdown.hidden = false;
        btn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        dropdown.hidden = true;
        btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function(e) {
        e.stopPropagation();
        dropdown.hidden ? openMenu() : closeMenu();
    });

    document.addEventListener("click", function() {
        if (!dropdown.hidden) closeMenu();
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && !dropdown.hidden) closeMenu();
    });

    dropdown.addEventListener("click", function(e) {
        e.stopPropagation();
    });
}

/* =========================================
   SEARCH → LOGIN FLOW
========================================= */
function setupSearch() {
    const input = document.querySelector(".search__input");
    if (!input) return;

    input.addEventListener("keydown", function(event) {
        if (event.key !== "Enter") return;

        event.preventDefault();

        const keyword = input.value.trim();
        localStorage.setItem("pendingSearch", keyword);

        window.location.href = "./deliverydangnhap.html";
    });
}

/* =========================================
   VIDEO HOVER PLAY
========================================= */
function setupVideoHover() {
    document.querySelectorAll(".product-media").forEach(function(media) {
        const video = media.querySelector(".product-media__video");
        if (!video) return;

        media.addEventListener("mouseenter", async function() {
            media.classList.add("is-playing");

            try {
                video.currentTime = 0;
                await video.play();
            } catch (e) {}
        });

        media.addEventListener("mouseleave", function() {
            media.classList.remove("is-playing");
            video.pause();
            video.currentTime = 0;
        });
    });
}

/* =========================================
   LANGUAGE SWITCHER
========================================= */
function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyDeliveryLang();
}

function createLanguageSwitcher() {
    const actions = document.querySelector(".header__actions");
    if (!actions) return;

    const old = document.getElementById("langSwitch");
    if (old) old.remove();

    const box = document.createElement("div");
    box.id = "langSwitch";
    box.style.position = "relative";
    box.style.display = "inline-flex";
    box.style.alignItems = "center";
    box.style.marginRight = "10px";
    box.style.zIndex = "9999";

    box.innerHTML = `
        <button id="langBtn" type="button" aria-expanded="false"
            style="
                border: 0;
                background: transparent;
                color: inherit;
                font-weight: 900;
                cursor: pointer;
                padding: 8px 10px;
                font-size: 16px;
                font-family: inherit;
            ">
            <span id="langCurrent">VN</span>
            <span>▾</span>
        </button>

        <div id="langMenu"
            style="
                display: none;
                position: absolute;
                right: 0;
                top: 100%;
                background: #fff;
                z-index: 99999;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 8px 20px rgba(0,0,0,.22);
                min-width: 86px;
            ">
            <button type="button" class="lang-item" data-lang="vi"
                style="display:block;width:100%;padding:10px 14px;border:0;background:#fff;cursor:pointer;font-weight:800;color:#003b55;">
                VN
            </button>
            <button type="button" class="lang-item" data-lang="en"
                style="display:block;width:100%;padding:10px 14px;border:0;background:#fff;cursor:pointer;font-weight:800;color:#003b55;">
                EN
            </button>
        </div>
    `;

    actions.insertBefore(box, actions.firstChild);
}

function setupLanguageSwitcher() {
    createLanguageSwitcher();

    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");

    if (!btn || !menu) return;

    function closeMenu() {
        menu.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    }

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    menu.querySelectorAll(".lang-item").forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            const lang = item.getAttribute("data-lang");
            if (!DELIVERY_LANG[lang]) return;

            setLang(lang);
            closeMenu();
        });
    });

    document.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeMenu();
    });

    applyDeliveryLang();
}

function applyDeliveryLang() {
    const lang = getLang();
    const t = DELIVERY_LANG[lang] || DELIVERY_LANG.vi;

    const current = document.getElementById("langCurrent");
    if (current) current.textContent = t.current;

    const searchInput = document.querySelector(".search__input");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    const accountHello = document.querySelector(".account__hello");
    if (accountHello) accountHello.textContent = t.accountHello;

    const accountPrimary = document.querySelector(".account__primary");
    if (accountPrimary) accountPrimary.textContent = t.register;

    const accountGhost = document.querySelector(".account__ghost");
    if (accountGhost) accountGhost.textContent = t.login;

    const accountItems = document.querySelectorAll(".account__item span:last-child");
    if (accountItems[0]) accountItems[0].textContent = t.profile;
    if (accountItems[1]) accountItems[1].textContent = t.address;
    if (accountItems[2]) accountItems[2].textContent = t.orderHistory;

    const topbarLinks = document.querySelectorAll(".topbar__nav a");
    if (topbarLinks[0]) topbarLinks[0].textContent = t.voucher;
    if (topbarLinks[1]) topbarLinks[1].textContent = t.deliveryPolicy;
    if (topbarLinks[2]) topbarLinks[2].textContent = t.refundPolicy;

    const hotline = document.querySelector(".topbar__hotline");
    if (hotline) hotline.innerHTML = t.hotline + " <strong>19006043</strong>";

    const welcome = document.querySelector(".welcome__title");
    if (welcome) welcome.innerHTML = t.welcome;

    const shopName = document.querySelector(".shop-loc__name");
    if (shopName) shopName.textContent = t.shopName;

    const shopAddr = document.querySelector(".shop-loc__addr");
    if (shopAddr) shopAddr.textContent = t.shopAddr;

    const openMap = document.querySelector(".shop-loc__btn");
    if (openMap) openMap.textContent = t.openMap;

    const menuTitle = document.querySelector(".menu__title");
    if (menuTitle) menuTitle.textContent = t.menu;

    const popularTitle = document.querySelector(".popular__title");
    if (popularTitle) popularTitle.textContent = t.popular;

    document.querySelectorAll(".product-card__badge").forEach(function(badge) {
        badge.textContent = t.mustTry;
    });

    const feedbackTitle = document.querySelector(".feedback__title");
    if (feedbackTitle) feedbackTitle.textContent = t.feedback;

    applyFooterLang(t);
}

function applyFooterLang(t) {
    const footerCompany = document.querySelector(".footer__company");
    if (footerCompany) footerCompany.textContent = t.footerCompany;

    const headings = document.querySelectorAll(".footer__heading");

    if (headings[0]) headings[0].textContent = t.branchAddress;
    if (headings[1]) headings[1].textContent = t.contactBooking;
    if (headings[2]) headings[2].textContent = t.commitment;
    if (headings[3]) headings[3].textContent = t.deliverySupport;
    if (headings[4]) headings[4].textContent = t.terms;
    if (headings[5]) headings[5].textContent = t.customerService;
    if (headings[6]) headings[6].textContent = t.subscribeTitle;
    if (headings[7]) headings[7].textContent = t.follow;

    const footerTexts = document.querySelectorAll(".footer__text");
    if (footerTexts[0]) footerTexts[0].innerHTML = t.footerText1;
    if (footerTexts[1]) footerTexts[1].innerHTML = t.footerText2;
    if (footerTexts[2]) footerTexts[2].innerHTML = t.footerText3;
    if (footerTexts[3]) footerTexts[3].innerHTML = t.footerText4;

    const footerLinks = document.querySelectorAll(".footer__links a");
    if (footerLinks[0]) footerLinks[0].textContent = t.terms1;
    if (footerLinks[1]) footerLinks[1].textContent = t.terms2;
    if (footerLinks[2]) footerLinks[2].textContent = t.terms3;
    if (footerLinks[3]) footerLinks[3].textContent = t.service1;
    if (footerLinks[4]) footerLinks[4].textContent = t.service2;
    if (footerLinks[5]) footerLinks[5].textContent = t.service3;

    const emailInput = document.querySelector(".footer__input");
    if (emailInput) emailInput.placeholder = t.emailPlaceholder;

    const subscribeBtn = document.querySelector(".footer__btn");
    if (subscribeBtn) subscribeBtn.textContent = t.subscribe;
}

/* =========================================
   INIT
========================================= */
document.addEventListener("DOMContentLoaded", function() {
    setupSlider();
    setupAccountDropdown();
    setupSearch();
    setupVideoHover();
    setupLanguageSwitcher();
});
/* =========================
   INIT ALL
========================= */
document.addEventListener("DOMContentLoaded", function() {
    setupSearchRedirect();
    setupLanguage();
    applyLanguage(localStorage.getItem("lang") || "vi");
});

/* =========================
   SEARCH → ENTER → LOGIN
========================= */
function setupSearchRedirect() {
    const input = document.querySelector(".search__input");
    if (!input) return;

    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            window.location.href = "deliverydangnhap.html";
        }
    });
}

/* =========================
   LANGUAGE SWITCH
========================= */
function setupLanguage() {
    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");
    const current = document.getElementById("langCurrent");

    if (!btn || !menu || !current) return;

    /* ===== FIX STYLE BẰNG JS (không cần CSS) ===== */
    btn.style.background = "transparent";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.fontWeight = "600";
    btn.style.cursor = "pointer";

    menu.style.background = "#0b3b4a";
    menu.style.borderRadius = "8px";
    menu.style.padding = "6px";

    menu.querySelectorAll(".lang-item").forEach(item => {
        item.style.color = "#fff";
        item.style.background = "transparent";
        item.style.border = "none";
        item.style.padding = "6px 10px";
        item.style.cursor = "pointer";
    });

    /* ===== Toggle ===== */
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
    });

    /* ===== Chọn ngôn ngữ ===== */
    menu.querySelectorAll(".lang-item").forEach(item => {
        item.addEventListener("click", () => {
            const lang = item.dataset.lang;
            localStorage.setItem("lang", lang);
            current.textContent = lang === "vi" ? "VN" : "EN";
            applyLanguage(lang);
            menu.classList.remove("show");
        });
    });

    document.addEventListener("click", () => {
        menu.classList.remove("show");
    });
}

/* =========================
   APPLY LANGUAGE
========================= */
function applyLanguage(lang) {

    /* ===== SEARCH ===== */
    const search = document.querySelector(".search__input");
    if (search) {
        search.placeholder = lang === "vi" ?
            "Tìm món ăn, đồ uống..." :
            "What would you like to eat today...";
    }

    /* ===== MENU CATEGORY ===== */
    const menuItems = document.querySelectorAll(".menu span");
    const viMenu = [
        "Sasimi", "Nướng phô mai", "Hải sản nướng", "Khai vị",
        "Hải sản lẩu", "Món chính", "Tráng miệng",
        "Kho tiêu xanh", "Đồ uống", "Thêm món"
    ];
    const enMenu = [
        "Sashimi", "Cheese Grill", "Grilled Seafood", "Appetizers",
        "Seafood Hotpot", "Main Dishes", "Desserts",
        "Pepper Stew", "Drinks", "Add-ons"
    ];

    menuItems.forEach((el, i) => {
        el.textContent = lang === "vi" ? viMenu[i] : enMenu[i];
    });

    /* ===== POPULAR TITLE ===== */
    const popular = document.querySelector(".popular h2");
    if (popular) {
        popular.textContent = lang === "vi" ? "Phổ biến" : "Popular";
    }

    /* ===== PRODUCT NAME ===== */
    const names = document.querySelectorAll(".product-card__name");
    const viNames = [
        "Bạch Tuột Sốt Thái",
        "Tôm Tươi Rong Biển",
        "Combo Sashimi",
        "Tôm Nướng Sốt Bơ",
        "Hải Sản Lẩu"
    ];
    const enNames = [
        "Thai Octopus",
        "Seaweed Shrimp",
        "Sashimi Combo",
        "Butter Grilled Shrimp",
        "Seafood Hotpot"
    ];

    names.forEach((el, i) => {
        if (el) el.textContent = lang === "vi" ? viNames[i] : enNames[i];
    });

    /* ===== OPTION ===== */
    const opts = document.querySelectorAll(".product-card__option");
    const viOpt = ["4 con", "1kg", "", "", "5 loại hải sản"];
    const enOpt = ["4 pcs", "1kg", "", "", "5 types seafood"];

    opts.forEach((el, i) => {
        el.textContent = lang === "vi" ? viOpt[i] : enOpt[i];
    });

    /* ===== MUST TRY ===== */
    const badges = document.querySelectorAll(".product-card__badge");
    badges.forEach(el => {
        el.textContent = lang === "vi" ? "Món nên thử" : "Must try";
    });

    /* ===== SAVE CURRENT ===== */
    const current = document.getElementById("langCurrent");
    if (current) {
        current.textContent = lang === "vi" ? "VN" : "EN";
    }
}