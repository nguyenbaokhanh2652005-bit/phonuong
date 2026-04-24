const LANG_KEY = "pho_nuong_lang";

const CAREER_LANG = {
    vi: {
        current: "VN",
        reserve: "Đặt bàn",
        delivery: "Giao hàng",
        career: "Tuyển dụng",
        country: "VIETNAM",

        sideItems: ["Tuyển dụng", "Giao hàng", "Phục vụ", "Thu ngân", "Phụ bếp"],

        title: "ĐĂNG KÝ TUYỂN DỤNG",
        sub: "Gia nhập đội ngũ Phố Nướng Châu Đốc",
        desc: "Chúng tôi đang tìm ứng viên cho các vị trí phục vụ, bếp, thu ngân và giao hàng. Không yêu cầu kinh nghiệm – được đào tạo từ đầu.",

        fullname: "Họ và tên",
        phone: "Số điện thoại",
        positionDefault: "Vị trí ứng tuyển",
        positions: ["Phục vụ", "Thu ngân", "Phụ bếp", "Giao hàng"],
        submit: "GỬI ĐĂNG KÝ",

        errName: "⚠️ Vui lòng nhập họ và tên.",
        errPhone: "⚠️ Vui lòng nhập số điện thoại.",
        errPosition: "⚠️ Vui lòng chọn vị trí ứng tuyển.",
        errPhoneInvalid: "⚠️ Số điện thoại không hợp lệ.",
        success: "✅ Đăng ký thành công! Phố Nướng sẽ liên hệ bạn sớm."
    },

    en: {
        current: "EN",
        reserve: "Reservation",
        delivery: "Delivery",
        career: "Career",
        country: "VIETNAM",

        sideItems: ["Career", "Delivery", "Service", "Cashier", "Kitchen assistant"],

        title: "RECRUITMENT REGISTRATION",
        sub: "Join the Pho Nuong Chau Doc team",
        desc: "We are looking for candidates for service, kitchen, cashier and delivery positions. No experience required – training will be provided.",

        fullname: "Full name",
        phone: "Phone number",
        positionDefault: "Position applied for",
        positions: ["Service staff", "Cashier", "Kitchen assistant", "Delivery staff"],
        submit: "SUBMIT APPLICATION",

        errName: "⚠️ Please enter your full name.",
        errPhone: "⚠️ Please enter your phone number.",
        errPosition: "⚠️ Please select a position.",
        errPhoneInvalid: "⚠️ Invalid phone number.",
        success: "✅ Application submitted successfully! Pho Nuong will contact you soon."
    }
};

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyCareerLang();
}

function setupLangSwitch() {
    const wrap = document.getElementById("langSwitch");
    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");

    if (!wrap || !btn || !menu) return;

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = menu.style.display === "block";
        menu.style.display = isOpen ? "none" : "block";
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });

    menu.querySelectorAll(".lang-item").forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            const lang = item.getAttribute("data-lang");
            if (!CAREER_LANG[lang]) return;

            setLang(lang);
            menu.style.display = "none";
            btn.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", function() {
        menu.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            menu.style.display = "none";
            btn.setAttribute("aria-expanded", "false");
        }
    });
}

function applyCareerLang() {
    const lang = getLang();
    const t = CAREER_LANG[lang] || CAREER_LANG.vi;

    const current = document.getElementById("langCurrent");
    if (current) current.textContent = t.current;

    const country = document.querySelector(".brand__country");
    if (country) country.textContent = t.country;

    const navText = document.querySelectorAll(".nav a span");
    if (navText[0]) navText[0].textContent = t.reserve;
    if (navText[1]) navText[1].textContent = t.delivery;
    if (navText[2]) navText[2].textContent = t.career;

    const sideItems = document.querySelectorAll(".countries__item");
    sideItems.forEach(function(item, index) {
        if (t.sideItems[index]) item.textContent = t.sideItems[index];
    });

    const title = document.querySelector(".badge__title");
    if (title) title.textContent = t.title;

    const sub = document.querySelector(".badge__sub");
    if (sub) sub.textContent = t.sub;

    const desc = document.querySelector(".badge__desc");
    if (desc) desc.textContent = t.desc;

    const fullname = document.getElementById("fullname");
    if (fullname) fullname.placeholder = t.fullname;

    const phone = document.getElementById("phone");
    if (phone) phone.placeholder = t.phone;

    const position = document.getElementById("position");
    if (position) {
        if (position.options[0]) position.options[0].textContent = t.positionDefault;
        if (position.options[1]) position.options[1].textContent = t.positions[0];
        if (position.options[2]) position.options[2].textContent = t.positions[1];
        if (position.options[3]) position.options[3].textContent = t.positions[2];
        if (position.options[4]) position.options[4].textContent = t.positions[3];
    }

    const submit = document.querySelector(".recruit-form__submit");
    if (submit) submit.textContent = t.submit;
}

function setupRecruitForm() {
    const form = document.getElementById("recruitForm");
    const nameInput = document.getElementById("fullname");
    const phoneInput = document.getElementById("phone");
    const positionInput = document.getElementById("position");
    const errorBox = document.getElementById("recruitError");
    const successBox = document.getElementById("recruitMsg");

    if (!form || !nameInput || !phoneInput || !positionInput || !errorBox || !successBox) return;

    function showError(msg) {
        successBox.classList.remove("show");
        errorBox.textContent = msg;
        errorBox.classList.add("show");
    }

    function showSuccess(msg) {
        errorBox.classList.remove("show");
        successBox.textContent = msg;
        successBox.classList.add("show");
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const lang = getLang();
        const t = CAREER_LANG[lang] || CAREER_LANG.vi;

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const pos = positionInput.value;

        if (!name) return showError(t.errName);
        if (!phone) return showError(t.errPhone);
        if (!pos) return showError(t.errPosition);

        if (!/^[0-9]{9,11}$/.test(phone)) {
            return showError(t.errPhoneInvalid);
        }

        showSuccess(t.success);
        form.reset();

        setTimeout(function() {
            successBox.classList.remove("show");
        }, 4000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setupLangSwitch();
    applyCareerLang();
    setupRecruitForm();
});