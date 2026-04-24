// =============================
// LOGIN LOGIC + LANGUAGE SWITCH
// PHỐ NƯỚNG
// =============================

const USERS_KEY = "pho_nuong_users";
const SESSION_KEY = "pho_nuong_session";
const LANG_KEY = "pho_nuong_lang";

const LOGIN_LANG = {
    vi: {
        current: "VN",
        title: "Đăng nhập",
        emailPlaceholder: "* Địa chỉ email",
        passwordPlaceholder: "* Mật khẩu",
        submit: "Đăng nhập",
        bottom: 'Chưa có tài khoản? <a href="../html/deliverydangky.html">Đăng ký</a>',
        hotline: "Đường dây nóng:",
        emailRequired: "Vui lòng nhập email",
        passwordRequired: "Vui lòng nhập mật khẩu",
        wrong: "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.",
        success: "Đăng nhập thành công!"
    },
    en: {
        current: "EN",
        title: "Login",
        emailPlaceholder: "* Email address",
        passwordPlaceholder: "* Password",
        submit: "Login",
        bottom: 'Don’t have an account? <a href="../html/deliverydangky.html">Register</a>',
        hotline: "Hotline:",
        emailRequired: "Please enter your email",
        passwordRequired: "Please enter your password",
        wrong: "Email or password is incorrect. Please check again.",
        success: "Login successful!"
    }
};

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLoginLang();
}

function getText() {
    return LOGIN_LANG[getLang()] || LOGIN_LANG.vi;
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// =============================
// LANGUAGE BUTTON
// =============================

function setupLoginLanguageButton() {
    const headerRight = document.querySelector(".header__right");
    if (!headerRight) return;

    const old = document.getElementById("langSwitch");
    if (old) old.remove();

    const box = document.createElement("div");
    box.id = "langSwitch";
    box.style.position = "relative";
    box.style.marginRight = "12px";
    box.style.zIndex = "9999";

    box.innerHTML = `
        <button id="langBtn" type="button"
            style="
                border:0;
                background:transparent;
                color:#ffffff;
                font-weight:900;
                cursor:pointer;
                padding:8px 10px;
                font-size:16px;
            ">
            <span id="langCurrent">VN</span> ▾
        </button>

        <div id="langMenu"
            style="
                display:none;
                position:absolute;
                right:0;
                top:100%;
                background:#ffffff;
                z-index:99999;
                border-radius:10px;
                overflow:hidden;
                box-shadow:0 8px 20px rgba(0,0,0,.22);
                min-width:90px;
            ">
            <button type="button" class="lang-item" data-lang="vi"
                style="
                    display:block;
                    width:100%;
                    padding:10px 14px;
                    border:0;
                    background:#ffffff;
                    color:#003b55;
                    cursor:pointer;
                    font-weight:900;
                    text-align:center;
                ">VN</button>

            <button type="button" class="lang-item" data-lang="en"
                style="
                    display:block;
                    width:100%;
                    padding:10px 14px;
                    border:0;
                    background:#ffffff;
                    color:#003b55;
                    cursor:pointer;
                    font-weight:900;
                    text-align:center;
                ">EN</button>
        </div>
    `;

    headerRight.insertBefore(box, headerRight.firstChild);

    const btn = document.getElementById("langBtn");
    const menu = document.getElementById("langMenu");
    const current = document.getElementById("langCurrent");

    function closeMenu() {
        menu.style.display = "none";
    }

    btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    menu.querySelectorAll(".lang-item").forEach(function(item) {
        item.addEventListener("mouseenter", function() {
            item.style.background = "#f1f5f9";
            item.style.color = "#003b55";
        });

        item.addEventListener("mouseleave", function() {
            item.style.background = "#ffffff";
            item.style.color = "#003b55";
        });

        item.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const lang = item.getAttribute("data-lang");
            if (!LOGIN_LANG[lang]) return;

            setLang(lang);

            if (current) current.textContent = LOGIN_LANG[lang].current;

            closeMenu();
        });
    });

    document.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeMenu();
    });
}

// =============================
// APPLY LANGUAGE
// =============================

function applyLoginLang() {
    const data = getText();

    const current = document.getElementById("langCurrent");
    if (current) current.textContent = data.current;

    const title = document.querySelector(".auth-title");
    if (title) title.textContent = data.title;

    const emailInput = document.getElementById("email");
    if (emailInput) emailInput.placeholder = data.emailPlaceholder;

    const passwordInput = document.getElementById("password");
    if (passwordInput) passwordInput.placeholder = data.passwordPlaceholder;

    const submitBtn = document.querySelector(".auth-submit");
    if (submitBtn) submitBtn.textContent = data.submit;

    const bottom = document.querySelector(".auth-bottom");
    if (bottom) bottom.innerHTML = data.bottom;

    const hotlineBox = document.querySelector(".header__right > div:not(#langSwitch)");
    if (hotlineBox) {
        hotlineBox.innerHTML = `${data.hotline} <a href="tel:19006043">19006043</a>`;
    }
}

// =============================
// LOGIN
// =============================

function initLogin() {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const loginError = document.getElementById("loginError");

    if (!form || !emailInput || !passwordInput) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const data = getText();

        if (emailError) emailError.textContent = "";
        if (passwordError) passwordError.textContent = "";
        if (loginError) loginError.textContent = "";

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        let valid = true;

        if (!email) {
            if (emailError) emailError.textContent = data.emailRequired;
            valid = false;
        }

        if (!password) {
            if (passwordError) passwordError.textContent = data.passwordRequired;
            valid = false;
        }

        if (!valid) return;

        const users = getUsers();

        const user = users.find(function(u) {
            return u.email === email && u.password === password;
        });

        if (!user) {
            if (loginError) loginError.textContent = data.wrong;
            return;
        }

        setSession({
            userId: user.id,
            email: user.email,
            nickname: user.nickname,
            name: `${user.lastName || ""} ${user.firstName || ""}`.trim() || user.nickname,
            gender: user.gender,
            birthdate: user.dob
        });

        alert(data.success);

        window.location.href = "../html/deliveryoder.html";
    });
}

// =============================
// BOOT
// =============================

document.addEventListener("DOMContentLoaded", function() {
    setupLoginLanguageButton();
    applyLoginLang();
    initLogin();
});