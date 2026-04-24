console.log("reservation js loaded ✅");

const LANG_KEY = "pho_nuong_lang";

const RES_LANG = {
    vi: {
        current: "VN",
        title: "Đặt Bàn",
        subtitle: "Mời bạn đặt hàng ngay để trải nghiệm ẩm thực tuyệt vời tại Phố Nướng, Châu Đốc An Giang!",
        phoneLabel: "Số điện thoại",
        phonePlaceholder: "VD: 0918189202",
        guestsLabel: "Người lớn",
        guestsDefault: "Chọn số người",
        person: "Người",
        dateLabel: "Ngày",
        timeLabel: "Thời gian",
        submit: "Đặt bàn",
        locationLabel: "Địa điểm phục vụ:",
        infoTitle: "Tìm Bàn Cho Bạn",
        or: "HOẶC",
        login: "Đăng nhập",

        infoP1: "Để được phục vụ tốt nhất, bạn nên đặt bàn trước (đặc biệt vào giờ cao điểm). Với các yêu cầu đặc biệt như:",
        groupLarge: "Đoàn đông từ 15 khách trở lên",
        bookEarly: "Đặt bàn trước nhiều ngày",
        privateSpace: "Yêu cầu không gian riêng / vị trí ưu tiên",
        brand: "Hải Sản Phố Nướng – Châu Đốc",
        address: "📍 Địa chỉ: 231 Trương Nữ Vương, Phường Châu Đốc, Tỉnh An Giang",
        openTime: "⏰ Giờ mở cửa: 09:00 – 22:00 (hằng ngày)",
        hotline: "📞 Hotline:",
        note: "Nếu bạn cần giữ bàn gấp, vui lòng gọi trực tiếp trong giờ mở cửa để chúng tôi hỗ trợ nhanh nhất.",

        errPhoneEmpty: "⚠️ Vui lòng nhập số điện thoại.",
        errPhoneInvalid: "⚠️ Số điện thoại chưa đúng. VD: 0918169878.",
        errGuests: "⚠️ Vui lòng chọn số người.",
        errDate: "⚠️ Vui lòng chọn ngày.",
        errTime: "⚠️ Vui lòng chọn thời gian.",
        errOpenTime: "⚠️ Quán nhận đặt bàn từ 09:00 – 22:00.",
        errInvalidDate: "⚠️ Ngày/giờ không hợp lệ. Vui lòng chọn lại.",
        errPast: "⚠️ Thời gian bạn chọn đã qua. Vui lòng chọn lại.",
        success: "✅ Đã nhận yêu cầu đặt bàn",
        waitConfirm: "Vui lòng đợi xác nhận.",
        guestWord: "người",
        copiedHotline: "✅ Đã copy số hotline"
    },

    en: {
        current: "EN",
        title: "Reservation",
        subtitle: "Book now to enjoy a wonderful dining experience at Pho Nuong, Chau Doc An Giang!",
        phoneLabel: "Phone number",
        phonePlaceholder: "Ex: 0918189202",
        guestsLabel: "Adults",
        guestsDefault: "Select guests",
        person: "Guest",
        dateLabel: "Date",
        timeLabel: "Time",
        submit: "Reserve",
        locationLabel: "Service location:",
        infoTitle: "Find Your Table",
        or: "OR",
        login: "Login",

        infoP1: "For the best service, we recommend booking in advance, especially during peak hours. For special requests such as:",
        groupLarge: "Large groups of 15 guests or more",
        bookEarly: "Booking several days in advance",
        privateSpace: "Private space / preferred seating requests",
        brand: "Pho Nuong Seafood – Chau Doc",
        address: "📍 Address: 231 Truong Nu Vuong, Chau Doc Ward, An Giang Province",
        openTime: "⏰ Opening hours: 09:00 – 22:00 daily",
        hotline: "📞 Hotline:",
        note: "For urgent table reservations, please call us directly during opening hours for faster support.",

        errPhoneEmpty: "⚠️ Please enter your phone number.",
        errPhoneInvalid: "⚠️ Invalid phone number. Example: 0918169878.",
        errGuests: "⚠️ Please select the number of guests.",
        errDate: "⚠️ Please select a date.",
        errTime: "⚠️ Please select a time.",
        errOpenTime: "⚠️ Reservations are available from 09:00 to 22:00.",
        errInvalidDate: "⚠️ Invalid date/time. Please choose again.",
        errPast: "⚠️ The selected time has passed. Please choose again.",
        success: "✅ Reservation request received",
        waitConfirm: "Please wait for confirmation.",
        guestWord: "guest(s)",
        copiedHotline: "✅ Hotline number copied"
    }
};

/* ================= LANGUAGE ================= */

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyReservationLang();
}

function createLanguageSwitcher() {
    const headerRight = document.querySelector(".header__right");
    if (!headerRight) return;

    const old = document.getElementById("langSwitch");
    if (old) old.remove();

    const box = document.createElement("div");
    box.id = "langSwitch";
    box.style.position = "relative";
    box.style.display = "inline-flex";
    box.style.alignItems = "center";
    box.style.marginRight = "12px";
    box.style.zIndex = "9999";

    box.innerHTML = `
        <button id="langBtn" type="button" aria-expanded="false"
            style="
                border: 0;
                background: transparent;
                color: #003b55;
                font-weight: 900;
                cursor: pointer;
                padding: 8px 10px;
                font-size: 18px;
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

    headerRight.insertBefore(box, headerRight.firstChild);
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
            if (!RES_LANG[lang]) return;

            setLang(lang);
            closeMenu();
        });
    });

    document.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeMenu();
    });

    applyReservationLang();
}

function applyReservationLang() {
    const lang = getLang();
    const t = RES_LANG[lang] || RES_LANG.vi;

    const current = document.getElementById("langCurrent");
    if (current) current.textContent = t.current;

    const title = document.querySelector(".reserve-hero__title");
    if (title) title.textContent = t.title;

    const subtitle = document.querySelector(".reserve-hero__subtitle");
    if (subtitle) subtitle.textContent = t.subtitle;

    const labels = document.querySelectorAll(".reserve-form .field label");
    if (labels[0]) labels[0].textContent = t.phoneLabel;
    if (labels[1]) labels[1].textContent = t.guestsLabel;
    if (labels[2]) labels[2].textContent = t.dateLabel;
    if (labels[3]) labels[3].textContent = t.timeLabel;

    const phone = document.getElementById("phone");
    if (phone) phone.placeholder = t.phonePlaceholder;

    const guests = document.getElementById("guests");
    if (guests && guests.options.length) {
        guests.options[0].textContent = t.guestsDefault;

        for (let i = 1; i < guests.options.length; i++) {
            guests.options[i].textContent = guests.options[i].value + " " + t.person;
        }
    }

    const submitText = document.querySelector(".reserve-form__submit span");
    if (submitText) submitText.textContent = t.submit;

    const locationLabel = document.querySelector(".location__label");
    if (locationLabel) locationLabel.textContent = t.locationLabel;

    const infoTitle = document.querySelector(".reserve-info__title");
    if (infoTitle) infoTitle.textContent = t.infoTitle;

    const orText = document.querySelector(".reserve-info__or");
    if (orText) orText.textContent = t.or;

    const loginBtn = document.querySelector(".login-btn");
    if (loginBtn) {
        loginBtn.innerHTML = t.login + '<span aria-hidden="true">→</span>';
    }

    applyInfoTextLang(t);
}

function applyInfoTextLang(t) {
    const infoText = document.querySelector(".reserve-info__text");
    if (!infoText) return;

    const paragraphs = infoText.querySelectorAll("p");

    if (paragraphs[0]) paragraphs[0].textContent = t.infoP1;
    if (paragraphs[1]) paragraphs[1].innerHTML = t.groupLarge.replace("15", "<strong>15</strong>");
    if (paragraphs[2]) paragraphs[2].textContent = t.bookEarly;

    if (paragraphs[3]) {
        if (getLang() === "vi") {
            paragraphs[3].innerHTML = "Yêu cầu <strong>không gian riêng</strong> / vị trí ưu tiên";
        } else {
            paragraphs[3].innerHTML = "<strong>Private space</strong> / preferred seating requests";
        }
    }

    if (paragraphs[4]) paragraphs[4].innerHTML = "<strong>" + t.brand + "</strong>";
    if (paragraphs[5]) paragraphs[5].innerHTML = t.address;
    if (paragraphs[6]) paragraphs[6].innerHTML = t.openTime;

    if (paragraphs[7]) {
        paragraphs[7].innerHTML =
            t.hotline +
            ' <a href="tel:0918160120" class="hotline" data-phone="0918160120">0918 160 120</a>' +
            ' <span class="sep">|</span> ' +
            '<a href="https://zalo.me/0886433210" class="zalo-link" target="_blank">Zalo</a>';
    }

    if (paragraphs[8]) paragraphs[8].textContent = t.note;

    setupHotlineCopy();
}

/* ================= FORM ================= */

function setupReservationForm() {
    const form = document.getElementById("reserveForm");

    if (!form) {
        console.warn("Không tìm thấy #reserveForm");
        return;
    }

    const phone = document.getElementById("phone");
    const guests = document.getElementById("guests");
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");

    let msg = document.querySelector(".reserve-form__msg") || document.getElementById("reserveMsg");

    if (!msg) {
        msg = document.createElement("div");
        msg.id = "reserveMsg";
        form.appendChild(msg);
    }

    function show(text, ok) {
        msg.textContent = text;
        msg.style.marginTop = "10px";
        msg.style.padding = "10px 12px";
        msg.style.borderRadius = "12px";
        msg.style.fontSize = "14px";
        msg.style.display = "block";
        msg.style.background = ok ? "rgba(0,160,90,.12)" : "rgba(255,0,0,.12)";
        msg.style.border = ok ? "1px solid rgba(0,160,90,.25)" : "1px solid rgba(255,0,0,.2)";
        msg.style.color = ok ? "#065f46" : "#b91c1c";
    }

    function normalizePhone(value) {
        return (value || "").replace(/[^\d]/g, "");
    }

    function isValidVNPhone(value) {
        return /^(03|05|07|08|09)\d{8}$/.test(value);
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const lang = getLang();
        const t = RES_LANG[lang] || RES_LANG.vi;

        const p = phone ? normalizePhone(phone.value) : "";
        const g = guests ? guests.value.trim() : "";
        const d = dateEl ? dateEl.value : "";
        const tm = timeEl ? timeEl.value : "";

        if (!p) return show(t.errPhoneEmpty, false);
        if (!isValidVNPhone(p)) return show(t.errPhoneInvalid, false);
        if (!g) return show(t.errGuests, false);
        if (!d) return show(t.errDate, false);
        if (!tm) return show(t.errTime, false);

        if (tm < "09:00" || tm > "22:00") {
            return show(t.errOpenTime, false);
        }

        const selected = new Date(d + "T" + tm + ":00");

        if (isNaN(selected.getTime())) {
            return show(t.errInvalidDate, false);
        }

        if (selected.getTime() < Date.now()) {
            return show(t.errPast, false);
        }

        show(
            t.success + ": " + g + " " + t.guestWord + " • " + p + " • " + d + " " + tm + ". " + t.waitConfirm,
            true
        );
    });
}

/* ================= HOTLINE COPY ================= */

function setupHotlineCopy() {
    const hotline = document.querySelector(".hotline");
    if (!hotline) return;

    if (hotline.dataset.bound === "true") return;
    hotline.dataset.bound = "true";

    let msg = document.getElementById("hotlineMsg");

    if (!msg) {
        msg = document.createElement("span");
        msg.id = "hotlineMsg";
        msg.style.display = "none";
        msg.style.marginLeft = "8px";
        hotline.insertAdjacentElement("afterend", msg);
    }

    function show(text) {
        msg.textContent = text;
        msg.style.display = "inline-block";
        msg.style.padding = "6px 10px";
        msg.style.borderRadius = "10px";
        msg.style.fontSize = "13px";
        msg.style.background = "rgba(0,160,90,.12)";
        msg.style.border = "1px solid rgba(0,160,90,.25)";
        msg.style.color = "#065f46";

        setTimeout(function() {
            msg.style.display = "none";
        }, 1500);
    }

    hotline.addEventListener("click", function(event) {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) return;

        event.preventDefault();

        const phone = hotline.dataset.phone || hotline.textContent.trim();
        const lang = getLang();
        const t = RES_LANG[lang] || RES_LANG.vi;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(phone).then(function() {
                show(t.copiedHotline);
            });
        } else {
            show("Hotline: " + phone);
        }
    });
}

/* ================= BOOT ================= */

document.addEventListener("DOMContentLoaded", function() {
    setupLanguageSwitcher();
    setupReservationForm();
    setupHotlineCopy();
});