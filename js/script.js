/* =====================================================
   INDEX PAGE SCRIPT
   - Country active state
   - Loading overlay
   - Language switch VN / EN
===================================================== */

const LANG_KEY = "pho_nuong_lang";

const translations = {
    vi: {
        reserve: "Đặt Bàn",
        delivery: "Giao Hàng",
        career: "Tuyển Dụng",
        country: "VIETNAM",
        badgeTitle: "HẢI SẢN PHỐ NƯỚNG!!!",
        badgeSub: "Tươi mát – Nồng cháy",
        badgeText: "Hải sản được chọn lọc kỹ lưỡng, chế biến trực tiếp tại quán, giữ trọn vị tươi ngon và hương vị biển cả."
    },
    en: {
        reserve: "Reservation",
        delivery: "Delivery",
        career: "Career",
        country: "VIETNAM",
        badgeTitle: "PHO NUONG SEAFOOD!!!",
        badgeSub: "Fresh – Fiery",
        badgeText: "Seafood is carefully selected and freshly prepared at the restaurant, preserving its fresh taste and ocean flavor."
    }
};

/* ================= COUNTRY ACTIVE ================= */

function setupCountryActive() {
    const items = document.querySelectorAll(".countries__item");

    items.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();

            items.forEach(function(x) {
                x.classList.remove("is-active");
            });

            item.classList.add("is-active");
        });
    });
}

/* ================= LOADING OVERLAY ================= */

function setupLoadingOverlay() {
    const loadingOverlay = document.getElementById("loadingOverlay");

    if (!loadingOverlay) return;

    let isHidden = false;

    function hideLoading() {
        if (isHidden) return;

        isHidden = true;
        loadingOverlay.classList.add("is-hidden");

        setTimeout(function() {
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }, 400);
    }

    setTimeout(hideLoading, 1200);
    setTimeout(hideLoading, 5000);
}

/* ================= LANGUAGE ================= */

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function saveLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
}

function applyLanguage() {
    const lang = getLang();
    const t = translations[lang] || translations.vi;

    const current = document.getElementById("langCurrent");
    if (current) {
        current.textContent = lang === "vi" ? "VN" : "EN";
    }

    const navLinks = document.querySelectorAll(".nav a");

    if (navLinks[0]) {
        navLinks[0].innerHTML =
            '<i class="fa-regular fa-calendar"></i>' + t.reserve;
    }

    if (navLinks[1]) {
        navLinks[1].innerHTML =
            '<i class="fa-solid fa-cart-shopping"></i> ' + t.delivery;
    }

    if (navLinks[2]) {
        navLinks[2].innerHTML =
            '<i class="fa-sharp fa-solid fa-mobile"></i> ' + t.career;
    }

    const country = document.querySelector(".brand__country");
    if (country) country.textContent = t.country;

    const badgeTitle = document.querySelector(".badge__title");
    if (badgeTitle) badgeTitle.textContent = t.badgeTitle;

    const badgeSub = document.querySelector(".badge__sub");
    if (badgeSub) badgeSub.textContent = t.badgeSub;

    const badgeText = document.querySelector(".badge__text");
    if (badgeText) badgeText.textContent = t.badgeText;
}

function setupLanguageSwitcher() {
    const wrap = document.getElementById("langSwitch");
    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");

    if (!wrap || !btn || !menu) return;

    function openMenu() {
        wrap.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
    }

    function closeMenu() {
        wrap.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
    }

    btn.addEventListener("click", function(event) {
        event.stopPropagation();

        if (wrap.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const langItems = menu.querySelectorAll(".lang-item");

    langItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.stopPropagation();

            const lang = item.getAttribute("data-lang");

            if (!translations[lang]) return;

            saveLang(lang);
            applyLanguage();
            closeMenu();
        });
    });

    document.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    applyLanguage();
}

/* ================= BOOT ================= */

document.addEventListener("DOMContentLoaded", function() {
    setupCountryActive();
    setupLoadingOverlay();
    setupLanguageSwitcher();
});