const USERS_KEY = "pho_nuong_users";
const SESSION_KEY = "pho_nuong_session";
const LANG_KEY = "pho_nuong_lang";

const AUTH_LANG = {
    vi: {
        current: "VN",
        title: "Tạo tài khoản",
        hotline: "Đường dây nóng:",
        nickname: "* Biệt danh",
        firstName: "* Tên và chữ lót",
        lastName: "* Họ",
        email: "* Địa chỉ email",
        password: "* Mật khẩu",
        confirmPassword: "* Xác nhận mật khẩu",
        genderDefault: "* Giới tính",
        male: "Nam",
        female: "Nữ",
        other: "Khác",
        submit: "Đăng ký",
        notePrefix: "Để đăng ký tài khoản, tôi đồng ý với",
        policy: "Chính sách và quy định chung",
        bottomPrefix: "Đã có tài khoản rồi?",
        login: "Đăng nhập",

        errNickname: "Vui lòng nhập biệt danh.",
        errFirstName: "Vui lòng nhập tên và chữ lót.",
        errLastName: "Vui lòng nhập họ.",
        errEmail: "Vui lòng nhập email.",
        errEmailInvalid: "Email không hợp lệ.",
        errPassword: "Vui lòng nhập mật khẩu.",
        errPasswordLength: "Mật khẩu tối thiểu 6 ký tự.",
        errConfirm: "Vui lòng xác nhận mật khẩu.",
        errConfirmMismatch: "Mật khẩu xác nhận không khớp.",
        errGender: "Vui lòng chọn giới tính.",
        errDob: "Vui lòng chọn ngày sinh.",
        errAge: "Tuổi chưa hợp lệ.",
        errEmailExists: "Email đã tồn tại. Vui lòng đăng nhập.",
        registerSuccess: "Đăng ký thành công! Bây giờ bạn có thể đăng nhập.",

        loginEmailRequired: "Vui lòng nhập email.",
        loginPasswordRequired: "Vui lòng nhập mật khẩu.",
        loginWrong: "Sai email hoặc mật khẩu.",
        loginSuccess: "Đăng nhập thành công!"
    },

    en: {
        current: "EN",
        title: "Create account",
        hotline: "Hotline:",
        nickname: "* Nickname",
        firstName: "* First and middle name",
        lastName: "* Last name",
        email: "* Email address",
        password: "* Password",
        confirmPassword: "* Confirm password",
        genderDefault: "* Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        submit: "Register",
        notePrefix: "By creating an account, I agree to the",
        policy: "General policies and terms",
        bottomPrefix: "Already have an account?",
        login: "Login",

        errNickname: "Please enter your nickname.",
        errFirstName: "Please enter your first and middle name.",
        errLastName: "Please enter your last name.",
        errEmail: "Please enter your email.",
        errEmailInvalid: "Invalid email address.",
        errPassword: "Please enter your password.",
        errPasswordLength: "Password must be at least 6 characters.",
        errConfirm: "Please confirm your password.",
        errConfirmMismatch: "Password confirmation does not match.",
        errGender: "Please select your gender.",
        errDob: "Please select your date of birth.",
        errAge: "Invalid age.",
        errEmailExists: "This email already exists. Please login.",
        registerSuccess: "Registration successful! You can now login.",

        loginEmailRequired: "Please enter your email.",
        loginPasswordRequired: "Please enter your password.",
        loginWrong: "Wrong email or password.",
        loginSuccess: "Login successful!"
    }
};

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyAuthLang();
}

function t() {
    return AUTH_LANG[getLang()] || AUTH_LANG.vi;
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
                color: #ffffffff;
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
            if (!AUTH_LANG[lang]) return;

            setLang(lang);
            closeMenu();
        });
    });

    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeMenu();
    });
}

function applyAuthLang() {
    const langData = t();

    const current = document.getElementById("langCurrent");
    if (current) current.textContent = langData.current;

    const title = document.querySelector(".auth-title");
    if (title) title.textContent = langData.title;

    const headerRightText = document.querySelector(".header__right > div:not(#langSwitch)");
    if (headerRightText) {
        headerRightText.innerHTML = `${langData.hotline} <a href="tel:19006043">1234567890</a>`;
    }

    const nickname = document.getElementById("nickname");
    if (nickname) nickname.placeholder = langData.nickname;

    const firstName = document.getElementById("firstName");
    if (firstName) firstName.placeholder = langData.firstName;

    const lastName = document.getElementById("lastName");
    if (lastName) lastName.placeholder = langData.lastName;

    const email = document.getElementById("email");
    if (email) email.placeholder = langData.email;

    const password = document.getElementById("password");
    if (password) password.placeholder = langData.password;

    const confirmPassword = document.getElementById("confirmPassword");
    if (confirmPassword) confirmPassword.placeholder = langData.confirmPassword;

    const gender = document.getElementById("gender");
    if (gender) {
        if (gender.options[0]) gender.options[0].textContent = langData.genderDefault;
        if (gender.options[1]) gender.options[1].textContent = langData.male;
        if (gender.options[2]) gender.options[2].textContent = langData.female;
        if (gender.options[3]) gender.options[3].textContent = langData.other;
    }

    const submit = document.querySelector(".auth-submit");
    if (submit) submit.textContent = langData.submit;

    const note = document.querySelector(".auth-note");
    if (note) {
        note.innerHTML = `${langData.notePrefix} <a href="#" target="_blank" rel="noopener">${langData.policy}</a>`;
    }

    const bottom = document.querySelector(".auth-bottom");
    if (bottom) {
        bottom.innerHTML = `${langData.bottomPrefix} <a href="../html/deliverydangnhap.html">${langData.login}</a>`;
    }
}

// =======================
// STORAGE HELPERS
// =======================
function loadUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
        return null;
    }
}

function clearErrors(form) {
    form.querySelectorAll(".error").forEach(function(el) {
        el.textContent = "";
    });

    form.querySelectorAll("input, select").forEach(function(el) {
        el.classList.remove("is-invalid");
    });
}

function setFieldError(form, fieldName, message) {
    const err = form.querySelector(`.error[data-for="${fieldName}"]`);
    const input = form.querySelector(`[name="${fieldName}"]`) || form.querySelector(`#${fieldName}`);

    if (err) err.textContent = message;
    if (input) input.classList.add("is-invalid");
}

function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function calcAge(dobStr) {
    const dob = new Date(dobStr);

    if (Number.isNaN(dob.getTime())) return 0;

    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;

    return age;
}

// =======================
// REGISTER
// =======================
function initRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        clearErrors(form);

        const langData = t();
        const fd = new FormData(form);

        const nickname = String(fd.get("nickname") || "").trim();
        const firstName = String(fd.get("firstName") || "").trim();
        const lastName = String(fd.get("lastName") || "").trim();
        const email = String(fd.get("email") || "").trim().toLowerCase();
        const password = String(fd.get("password") || "");
        const confirmPassword = String(fd.get("confirmPassword") || "");
        const gender = String(fd.get("gender") || "");
        const dob = String(fd.get("dob") || "");

        let ok = true;

        if (!nickname) {
            setFieldError(form, "nickname", langData.errNickname);
            ok = false;
        }

        if (!firstName) {
            setFieldError(form, "firstName", langData.errFirstName);
            ok = false;
        }

        if (!lastName) {
            setFieldError(form, "lastName", langData.errLastName);
            ok = false;
        }

        if (!email) {
            setFieldError(form, "email", langData.errEmail);
            ok = false;
        } else if (!isEmail(email)) {
            setFieldError(form, "email", langData.errEmailInvalid);
            ok = false;
        }

        if (!password) {
            setFieldError(form, "password", langData.errPassword);
            ok = false;
        } else if (password.length < 6) {
            setFieldError(form, "password", langData.errPasswordLength);
            ok = false;
        }

        if (!confirmPassword) {
            setFieldError(form, "confirmPassword", langData.errConfirm);
            ok = false;
        } else if (confirmPassword !== password) {
            setFieldError(form, "confirmPassword", langData.errConfirmMismatch);
            ok = false;
        }

        if (!gender) {
            setFieldError(form, "gender", langData.errGender);
            ok = false;
        }

        if (!dob) {
            setFieldError(form, "dob", langData.errDob);
            ok = false;
        } else {
            const age = calcAge(dob);
            if (age < 13) {
                setFieldError(form, "dob", langData.errAge);
                ok = false;
            }
        }

        if (!ok) return;

        const users = loadUsers();

        if (users.some(function(u) { return u.email === email; })) {
            setFieldError(form, "email", langData.errEmailExists);
            return;
        }

        const user = {
            id: "u_" + Date.now(),
            nickname,
            firstName,
            lastName,
            email,
            password,
            gender,
            dob,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        saveUsers(users);

        alert(langData.registerSuccess);
        window.location.href = "./deliverydangnhap.html";
    });
}

// =======================
// LOGIN
// =======================
function initLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        clearErrors(form);

        const langData = t();
        const fd = new FormData(form);

        const email = String(fd.get("email") || "").trim().toLowerCase();
        const password = String(fd.get("password") || "");

        let ok = true;

        if (!email) {
            setFieldError(form, "email", langData.loginEmailRequired);
            ok = false;
        } else if (!isEmail(email)) {
            setFieldError(form, "email", langData.errEmailInvalid);
            ok = false;
        }

        if (!password) {
            setFieldError(form, "password", langData.loginPasswordRequired);
            ok = false;
        }

        if (!ok) return;

        const users = loadUsers();

        const user = users.find(function(u) {
            return u.email === email && u.password === password;
        });

        if (!user) {
            setFieldError(form, "password", langData.loginWrong);
            return;
        }

        setSession({
            userId: user.id,
            name: `${user.lastName} ${user.firstName}`.trim(),
            email: user.email,
            nickname: user.nickname,
            gender: user.gender,
            birthdate: user.dob
        });

        alert(langData.loginSuccess);
        window.location.href = "./deliveryoder.html";
    });
}

// =======================
// BOOT
// =======================
document.addEventListener("DOMContentLoaded", function() {
    setupLanguageSwitcher();
    applyAuthLang();
    initRegister();
    initLogin();
});