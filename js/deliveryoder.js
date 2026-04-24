const SESSION_KEY = "pho_nuong_session";
const LANG_KEY = "pho_nuong_lang";

let currentCategory = "all";
let currentKeyword = "";

/* ================= LANGUAGE ================= */

const LANG_DATA = {
    vi: {
        code: "VN",
        searchPlaceholder: "Tìm món ăn, đồ uống...",
        menuTitle: "Menu",

        accountHello: "Chào mừng bạn đến với,",
        register: "Đăng ký",
        login: "Đăng nhập",
        profile: "Thông tin cá nhân",
        address: "Địa chỉ của tôi",
        orders: "Lịch sử đặt hàng",
        logout: "Đăng xuất",

        cartTitle: "Giỏ hàng của tôi",
        cartEmpty: "Giỏ hàng của bạn đang trống",
        total: "Tổng",
        checkout: "Thanh toán",
        remove: "Xóa",

        loginToAdd: "Bạn cần đăng nhập để thêm món vào giỏ hàng.",
        loginToCheckout: "Lỗi: Bạn cần đăng nhập trước khi thanh toán.",
        emptyCheckout: "Lỗi: Giỏ hàng của bạn đang trống.",
        checkoutSuccess: "Bạn đã thanh toán thành công.",
        loggedOut: "Đã đăng xuất.",

        profileTitle: "THÔNG TIN CÁ NHÂN",
        nickname: "Biệt danh",
        fullName: "Họ và tên",
        email: "Email",
        gender: "Giới tính",
        birthdate: "Ngày sinh",
        phone: "Số điện thoại",
        addressText: "Địa chỉ",
        notUpdated: "Chưa cập nhật",
        updateQuestion: "Bạn có muốn cập nhật thông tin không?",
        updateSuccess: "Cập nhật thông tin cá nhân thành công.",
        addressTitle: "ĐỊA CHỈ CỦA TÔI",
        addressPrompt: "Nhập địa chỉ giao hàng:",
        addressSuccess: "Cập nhật địa chỉ thành công.",
        loginToProfile: "Bạn cần đăng nhập để xem thông tin cá nhân.",
        loginToAddress: "Bạn cần đăng nhập để xem địa chỉ.",

        loginToOrders: "Bạn cần đăng nhập để xem lịch sử đặt hàng.",
        noOrders: "Bạn chưa có đơn hàng nào.",
        orderHistoryTitle: "LỊCH SỬ ĐẶT HÀNG",
        order: "Đơn",
        time: "Thời gian",
        status: "Trạng thái",
        paid: "Đã thanh toán",

        cats: [
            "Tất cả", "Sashimi", "Nướng phô mai", "Hải sản nướng", "Khai vị",
            "Hải sản lẩu", "Món chính", "Tráng miệng", "Kho tiêu xanh", "Đồ uống", "Thêm món"
        ],

        products: {
            sa1: "Sashimi Râu Bạch Tuột",
            pm1: "Tôm mủ ni nướng phô mai",
            hsn1: "Hải Sản Nướng",
            kv1: "Chả giò",
            lau1: "Lẩu hải sản thập cẩm",
            m1: "Cá Chép Ôm Dưa",
            tm1: "Hồng Giòn",
            kt1: "Cá Hồi Sốt Tiêu Xanh",
            du1: "Trà Đào Cam Xả",
            t1: "Sò Điệp Nướng"
        }
    },

    en: {
        code: "EN",
        searchPlaceholder: "Search food and drinks...",
        menuTitle: "Menu",

        accountHello: "Welcome to,",
        register: "Register",
        login: "Login",
        profile: "Personal information",
        address: "My address",
        orders: "Order history",
        logout: "Logout",

        cartTitle: "My Cart",
        cartEmpty: "Your cart is empty",
        total: "Total",
        checkout: "Checkout",
        remove: "Remove",

        loginToAdd: "You need to log in to add items to your cart.",
        loginToCheckout: "Error: Please log in before checkout.",
        emptyCheckout: "Error: Your cart is empty.",
        checkoutSuccess: "Payment successful.",
        loggedOut: "Logged out successfully.",

        profileTitle: "PERSONAL INFORMATION",
        nickname: "Nickname",
        fullName: "Full name",
        email: "Email",
        gender: "Gender",
        birthdate: "Birthdate",
        phone: "Phone number",
        addressText: "Address",
        notUpdated: "Not updated",
        updateQuestion: "Do you want to update your information?",
        updateSuccess: "Personal information updated successfully.",
        addressTitle: "MY ADDRESS",
        addressPrompt: "Enter your delivery address:",
        addressSuccess: "Address updated successfully.",
        loginToProfile: "Please log in to view your personal information.",
        loginToAddress: "Please log in to view your address.",

        loginToOrders: "Please log in to view your order history.",
        noOrders: "You have no orders yet.",
        orderHistoryTitle: "ORDER HISTORY",
        order: "Order",
        time: "Time",
        status: "Status",
        paid: "Paid",

        cats: [
            "All", "Sashimi", "Cheese grilled", "Grilled seafood", "Appetizers",
            "Seafood hotpot", "Main dishes", "Desserts", "Green pepper stew", "Drinks", "Add-ons"
        ],

        products: {
            sa1: "Octopus Tentacle Sashimi",
            pm1: "Cheese-grilled Slipper Lobster",
            hsn1: "Grilled Seafood",
            kv1: "Spring Rolls",
            lau1: "Mixed Seafood Hotpot",
            m1: "Braised Carp with Pickled Mustard",
            tm1: "Crispy Persimmon",
            kt1: "Salmon with Green Pepper Sauce",
            du1: "Peach Orange Lemongrass Tea",
            t1: "Grilled Scallop"
        }
    }
};

function getLang() {
    return localStorage.getItem(LANG_KEY) || "vi";
}

function getText() {
    return LANG_DATA[getLang()] || LANG_DATA.vi;
}

function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLanguage();
    renderCart();
}

function translateProductName(id, fallback) {
    const t = getText();
    return t.products[id] || fallback || "";
}

/* ================= SESSION ================= */

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
        return null;
    }
}

function setSession(obj) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(obj));
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

function getUserKey(session) {
    if (!session) return null;
    return session.email || session.userId || session.nickname || null;
}

/* ================= CART STORAGE ================= */

function cartKey(userKey) {
    return "pho_nuong_cart_" + userKey;
}

function loadCart(userKey) {
    if (!userKey) return [];

    try {
        return JSON.parse(localStorage.getItem(cartKey(userKey))) || [];
    } catch {
        return [];
    }
}

function saveCart(userKey, cart) {
    if (!userKey) return;
    localStorage.setItem(cartKey(userKey), JSON.stringify(cart));
}

/* ================= ORDER HISTORY STORAGE ================= */

function orderHistoryKey(userKey) {
    return "pho_nuong_orders_" + userKey;
}

function getPossibleUserKeys(session) {
    if (!session) return [];

    const keys = [
        session.email,
        session.userId,
        session.nickname
    ].filter(Boolean);

    return Array.from(new Set(keys));
}

function loadOrderHistory(userKey) {
    const session = getSession();
    const keys = getPossibleUserKeys(session);

    if (userKey && !keys.includes(userKey)) {
        keys.unshift(userKey);
    }

    let allOrders = [];

    keys.forEach(function(key) {
        try {
            const orders = JSON.parse(localStorage.getItem(orderHistoryKey(key))) || [];
            allOrders = allOrders.concat(orders);
        } catch {}
    });

    const uniqueOrders = [];
    const seenIds = {};

    allOrders.forEach(function(order) {
        if (!order || !order.id) return;

        if (!seenIds[order.id]) {
            seenIds[order.id] = true;
            uniqueOrders.push(order);
        }
    });

    uniqueOrders.sort(function(a, b) {
        return String(b.id).localeCompare(String(a.id));
    });

    return uniqueOrders;
}

function saveOrderHistory(userKey, orders) {
    if (!userKey) return;

    localStorage.setItem(orderHistoryKey(userKey), JSON.stringify(orders));

    const session = getSession();
    const keys = getPossibleUserKeys(session);

    keys.forEach(function(key) {
        if (key !== userKey) {
            localStorage.removeItem(orderHistoryKey(key));
        }
    });
}

/* ================= UTIL ================= */

function money(n) {
    return (Number(n) || 0).toLocaleString("vi-VN") + " vnd";
}

function formatMoneyShort(n) {
    return (Number(n) || 0).toLocaleString("vi-VN");
}

function normalizeText(str) {
    return (str || "")
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();
}

function getFullName(session) {
    const t = getText();
    if (!session) return t.notUpdated;
    return session.name || session.nickname || t.notUpdated;
}

function updateAccountName() {
    const accountName = document.getElementById("accountName");
    const session = getSession();

    if (!accountName) return;

    accountName.textContent = session ?
        session.nickname || session.name || session.email || "bạn" :
        "Phố Nướng";
}

/* ================= LANGUAGE BUTTON ================= */

function setupLanguageSwitcher() {
    const btn = document.querySelector(".lang-btn");
    const headerInner = document.querySelector(".header__inner");

    if (!btn) return;

    btn.style.display = "inline-flex";
    btn.style.alignItems = "center";
    btn.style.gap = "8px";
    btn.style.marginLeft = "18px";
    btn.style.marginRight = "14px";
    btn.style.padding = "6px 10px";
    btn.style.minWidth = "70px";
    btn.style.justifyContent = "center";

    let label = btn.querySelector(".lang-text");

    if (!label) {
        label = document.createElement("span");
        label.className = "lang-text";
        label.style.fontWeight = "800";
        label.style.color = "#fff";
        label.style.fontSize = "14px";
        btn.appendChild(label);
    }

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        const current = getLang();
        const next = current === "vi" ? "en" : "vi";
        setLang(next);
    });

    if (headerInner) {
        headerInner.style.columnGap = "14px";
    }
}

/* ================= APPLY LANGUAGE ================= */

function applyLanguage() {
    const lang = getLang();
    const t = getText();

    document.documentElement.lang = lang;

    const label = document.querySelector(".lang-text");
    if (label) label.textContent = t.code;

    const searchInput = document.querySelector(".search__input");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    const menuTitle = document.querySelector(".menu__title");
    if (menuTitle) menuTitle.textContent = t.menuTitle;

    const catLabels = document.querySelectorAll("#catMenu .menu__card span");
    catLabels.forEach(function(el, index) {
        if (t.cats[index]) el.textContent = t.cats[index];
    });

    const accountHello = document.querySelector(".account__hello");
    if (accountHello) accountHello.textContent = t.accountHello;

    const registerLink = document.querySelector(".account__link--primary");
    if (registerLink) registerLink.textContent = t.register;

    const loginLink = document.querySelector(".account__link--ghost");
    if (loginLink) loginLink.textContent = t.login;

    const accountItems = document.querySelectorAll(".account__item span:last-child");
    if (accountItems[0]) accountItems[0].textContent = t.profile;
    if (accountItems[1]) accountItems[1].textContent = t.address;
    if (accountItems[2]) accountItems[2].textContent = t.orders;

    const logoutBtn = document.getElementById("btnLogout");
    if (logoutBtn) logoutBtn.textContent = t.logout;

    const productCards = document.querySelectorAll(".menu-card");
    productCards.forEach(function(card) {
        const id = card.getAttribute("data-id");
        const nameEl = card.querySelector(".menu-card__name");

        if (id && nameEl && t.products[id]) {
            nameEl.textContent = t.products[id];
            card.setAttribute("data-name", t.products[id]);
        }
    });

    const cartTitle = document.querySelector(".cart__title");
    if (cartTitle) cartTitle.textContent = t.cartTitle;

    const cartEmpty = document.querySelector(".cart__empty-text");
    if (cartEmpty) cartEmpty.textContent = t.cartEmpty;

    const totalLabel = document.querySelector(".cart__row span");
    if (totalLabel) totalLabel.textContent = t.total;

    const checkoutBtn = document.querySelector(".cart__checkout");
    if (checkoutBtn) checkoutBtn.textContent = t.checkout;
}

/* ================= CART BADGE ================= */

function updateCartBadge() {
    const cartIcon = document.querySelector('button[aria-label="Cart"]');
    if (!cartIcon) return;

    const session = getSession();
    const userKey = getUserKey(session);
    const cart = loadCart(userKey);

    let totalQty = 0;

    cart.forEach(function(item) {
        totalQty += Number(item.qty) || 1;
    });

    let badge = cartIcon.querySelector(".cart-badge-js");

    if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-badge-js";
        cartIcon.appendChild(badge);

        cartIcon.style.position = "relative";

        badge.style.position = "absolute";
        badge.style.top = "0px";
        badge.style.right = "0px";
        badge.style.background = "#c0392b";
        badge.style.color = "#fff";
        badge.style.borderRadius = "999px";
        badge.style.fontSize = "12px";
        badge.style.fontWeight = "700";
        badge.style.minWidth = "18px";
        badge.style.height = "18px";
        badge.style.display = "flex";
        badge.style.alignItems = "center";
        badge.style.justifyContent = "center";
        badge.style.padding = "0 5px";
        badge.style.zIndex = "10";
    }

    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? "flex" : "none";
}

/* ================= RENDER CART ================= */

function renderCart() {
    const session = getSession();
    const userKey = getUserKey(session);
    const t = getText();

    const itemsBox = document.getElementById("cartItems");
    const emptyBox = document.getElementById("cartEmpty");
    const totalEl = document.getElementById("cartTotal");

    if (!itemsBox || !emptyBox || !totalEl) {
        updateCartBadge();
        return;
    }

    if (!userKey) {
        itemsBox.innerHTML = "";
        emptyBox.style.display = "grid";
        totalEl.textContent = money(0);
        updateCartBadge();
        return;
    }

    const cart = loadCart(userKey);

    if (cart.length === 0) {
        itemsBox.innerHTML = "";
        emptyBox.style.display = "grid";
        totalEl.textContent = money(0);
        updateCartBadge();
        return;
    }

    emptyBox.style.display = "none";

    let total = 0;
    let html = "";

    cart.forEach(function(item) {
        const price = Number(item.price) || 0;
        const qty = Number(item.qty) || 1;
        const name = translateProductName(item.id, item.name);

        total += price * qty;

        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item__img">
                    <img src="${item.img || "../img/placeholder.jpg"}" alt=""
                         onerror="this.src='../img/placeholder.jpg'">
                </div>

                <div class="cart-item__info">
                    <div class="cart-item__name">${name}</div>
                    <div class="cart-item__price">${money(price)}</div>

                    <div class="cart-item__controls">
                        <button class="qty-btn" type="button" data-cart-action="dec">−</button>
                        <span class="qty-num">${qty}</span>
                        <button class="qty-btn" type="button" data-cart-action="inc">+</button>
                        <button class="remove-btn" type="button" data-cart-action="remove">${t.remove}</button>
                    </div>
                </div>
            </div>
        `;
    });

    itemsBox.innerHTML = html;
    totalEl.textContent = money(total);
    updateCartBadge();
}

/* ================= CART ACTIONS ================= */

function addToCartFromCard(cardEl) {
    const session = getSession();
    const userKey = getUserKey(session);
    const t = getText();

    if (!userKey) {
        alert(t.loginToAdd);
        window.location.href = "./deliverydangnhap.html";
        return;
    }

    const product = {
        id: cardEl.getAttribute("data-id"),
        name: cardEl.getAttribute("data-name"),
        price: Number(cardEl.getAttribute("data-price")) || 0,
        img: cardEl.getAttribute("data-img") || "../img/placeholder.jpg",
        qty: 1
    };

    if (!product.id) return;

    const cart = loadCart(userKey);

    const found = cart.find(function(item) {
        return item.id === product.id;
    });

    if (found) {
        found.qty = Number(found.qty || 1) + 1;
    } else {
        cart.push(product);
    }

    saveCart(userKey, cart);
    renderCart();
}

function updateCartItem(itemId, action) {
    const session = getSession();
    const userKey = getUserKey(session);

    if (!userKey) return;

    let cart = loadCart(userKey);

    const item = cart.find(function(cartItem) {
        return cartItem.id === itemId;
    });

    if (!item) return;

    if (action === "inc") {
        item.qty = Number(item.qty || 1) + 1;
    }

    if (action === "dec") {
        item.qty = Math.max(1, Number(item.qty || 1) - 1);
    }

    if (action === "remove") {
        cart = cart.filter(function(cartItem) {
            return cartItem.id !== itemId;
        });
    }

    saveCart(userKey, cart);
    renderCart();
}

/* ================= ACCOUNT ================= */

function setupAccountDropdown() {
    const btn = document.querySelector(".account__btn");
    const dropdown = document.querySelector(".account__dropdown");
    const btnLogout = document.getElementById("btnLogout");

    if (!btn || !dropdown) return;

    function openDropdown() {
        dropdown.hidden = false;
        btn.setAttribute("aria-expanded", "true");
    }

    function closeDropdown() {
        dropdown.hidden = true;
        btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        dropdown.hidden ? openDropdown() : closeDropdown();
    });

    dropdown.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    document.addEventListener("click", closeDropdown);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeDropdown();
    });

    updateAccountName();

    if (btnLogout) {
        const session = getSession();
        btnLogout.hidden = !getUserKey(session);

        btnLogout.addEventListener("click", function(event) {
            const t = getText();

            event.preventDefault();
            clearSession();
            alert(t.loggedOut);
            window.location.reload();
        });
    }
}

/* ================= PROFILE + ADDRESS ================= */

function setupProfileButtons() {
    const btnProfile = document.getElementById("btnProfile");
    const btnAddress = document.getElementById("btnAddress");

    if (btnProfile) {
        btnProfile.addEventListener("click", function(event) {
            event.preventDefault();

            const t = getText();
            let session = getSession();

            if (!session) {
                alert(t.loginToProfile);
                window.location.href = "./deliverydangnhap.html";
                return;
            }

            const info =
                t.profileTitle + "\n\n" +
                t.nickname + ": " + (session.nickname || t.notUpdated) + "\n" +
                t.fullName + ": " + getFullName(session) + "\n" +
                t.email + ": " + (session.email || t.notUpdated) + "\n" +
                t.gender + ": " + (session.gender || t.notUpdated) + "\n" +
                t.birthdate + ": " + (session.birthdate || t.notUpdated) + "\n" +
                t.phone + ": " + (session.phone || t.notUpdated) + "\n" +
                t.addressText + ": " + (session.address || t.notUpdated);

            const wantUpdate = confirm(info + "\n\n" + t.updateQuestion);
            if (!wantUpdate) return;

            const newNickname = prompt(t.nickname + ":", session.nickname || "");
            const newName = prompt(t.fullName + ":", session.name || "");
            const newGender = prompt(t.gender + ":", session.gender || "");
            const newBirthdate = prompt(t.birthdate + ":", session.birthdate || "");
            const newPhone = prompt(t.phone + ":", session.phone || "");
            const newAddress = prompt(t.addressText + ":", session.address || "");

            if (newNickname !== null) session.nickname = newNickname.trim() || session.nickname || "";
            if (newName !== null) session.name = newName.trim() || session.name || "";
            if (newGender !== null) session.gender = newGender.trim() || session.gender || "";
            if (newBirthdate !== null) session.birthdate = newBirthdate.trim() || session.birthdate || "";
            if (newPhone !== null) session.phone = newPhone.trim() || session.phone || "";
            if (newAddress !== null) session.address = newAddress.trim() || session.address || "";

            setSession(session);
            updateAccountName();

            alert(t.updateSuccess);
        });
    }

    if (btnAddress) {
        btnAddress.addEventListener("click", function(event) {
            event.preventDefault();

            const t = getText();
            let session = getSession();

            if (!session) {
                alert(t.loginToAddress);
                window.location.href = "./deliverydangnhap.html";
                return;
            }

            const newAddress = prompt(
                t.addressTitle + "\n\n" + t.addressPrompt,
                session.address || ""
            );

            if (newAddress !== null) {
                session.address = newAddress.trim() || session.address || "";
                setSession(session);
                alert(t.addressSuccess);
            }
        });
    }
}

/* ================= SEARCH + CATEGORY ================= */

function setupMenuFilter() {
    const catMenu = document.getElementById("catMenu");
    const grid = document.getElementById("menuGrid");
    const searchInput = document.querySelector(".search__input");

    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".menu-card"));

    cards.forEach(function(card) {
        const priceEl = card.querySelector(".menu-card__price");
        const price = Number(card.getAttribute("data-price")) || 0;

        if (priceEl) {
            priceEl.innerHTML = formatMoneyShort(price) + " <span>vnd</span>";
        }
    });

    function applyFilter() {
        const keyword = normalizeText(currentKeyword);

        cards.forEach(function(card) {
            const name = normalizeText(card.getAttribute("data-name"));
            const category = card.getAttribute("data-cat") || "";
            const categoryText = normalizeText(category);
            const price = normalizeText(card.getAttribute("data-price"));

            const matchCategory =
                currentCategory === "all" || category === currentCategory;

            const matchSearch =
                keyword === "" ||
                name.indexOf(keyword) !== -1 ||
                categoryText.indexOf(keyword) !== -1 ||
                price.indexOf(keyword) !== -1;

            card.style.display = matchCategory && matchSearch ? "" : "none";
        });
    }

    if (catMenu) {
        catMenu.addEventListener("click", function(event) {
            const btn = event.target.closest("[data-filter]");
            if (!btn) return;

            const buttons = catMenu.querySelectorAll("[data-filter]");

            buttons.forEach(function(button) {
                button.classList.remove("is-active");
            });

            btn.classList.add("is-active");

            currentCategory = btn.getAttribute("data-filter") || "all";
            applyFilter();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", function() {
            currentKeyword = searchInput.value;
            applyFilter();
        });

        searchInput.addEventListener("search", function() {
            currentKeyword = searchInput.value;
            applyFilter();
        });
    }

    applyFilter();
}

/* ================= CATEGORY SCROLLBAR ================= */

function setupCategoryScrollbar() {
    const catMenu = document.getElementById("catMenu");
    const track = document.querySelector(".cats-scrollbar__track");
    const thumb = document.querySelector(".cats-scrollbar__thumb");

    if (!catMenu || !track || !thumb) return;

    let isDragging = false;

    function updateThumb() {
        const scrollableWidth = catMenu.scrollWidth - catMenu.clientWidth;
        const maxLeft = track.clientWidth - thumb.clientWidth;

        if (scrollableWidth <= 0 || maxLeft <= 0) {
            thumb.style.left = "0px";
            return;
        }

        const ratio = catMenu.scrollLeft / scrollableWidth;
        thumb.style.left = ratio * maxLeft + "px";
    }

    thumb.addEventListener("mousedown", function() {
        isDragging = true;
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    document.addEventListener("mousemove", function(event) {
        if (!isDragging) return;

        const rect = track.getBoundingClientRect();
        const max = track.clientWidth - thumb.clientWidth;

        let x = event.clientX - rect.left - thumb.clientWidth / 2;
        x = Math.max(0, Math.min(x, max));

        thumb.style.left = x + "px";

        const ratio = max === 0 ? 0 : x / max;
        catMenu.scrollLeft = ratio * (catMenu.scrollWidth - catMenu.clientWidth);
    });

    catMenu.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    updateThumb();
}

/* ================= CHECKOUT ================= */

function setupCheckoutButton() {
    const checkoutBtn = document.querySelector(".cart__checkout");
    const cartSummary = document.querySelector(".cart__summary");

    if (!checkoutBtn || !cartSummary) return;

    let messageEl = document.querySelector(".checkout-message-js");

    if (!messageEl) {
        messageEl = document.createElement("div");
        messageEl.className = "checkout-message-js";
        cartSummary.appendChild(messageEl);

        messageEl.style.marginTop = "12px";
        messageEl.style.textAlign = "center";
        messageEl.style.fontWeight = "700";
        messageEl.style.fontSize = "16px";
    }

    checkoutBtn.addEventListener("click", function() {
        const t = getText();
        const session = getSession();
        const userKey = getUserKey(session);

        if (!userKey) {
            messageEl.textContent = t.loginToCheckout;
            messageEl.style.color = "red";
            return;
        }

        const cart = loadCart(userKey);

        if (cart.length === 0) {
            messageEl.textContent = t.emptyCheckout;
            messageEl.style.color = "red";
            return;
        }

        let total = 0;

        cart.forEach(function(item) {
            total += (Number(item.price) || 0) * (Number(item.qty) || 1);
        });

        const newOrder = {
            id: "PN" + Date.now(),
            createdAt: new Date().toLocaleString("vi-VN"),
            items: JSON.parse(JSON.stringify(cart)),
            total: total,
            status: t.paid
        };

        const orders = loadOrderHistory(userKey);
        orders.unshift(newOrder);
        saveOrderHistory(userKey, orders);

        saveCart(userKey, []);

        renderCart();
        updateCartBadge();

        messageEl.textContent = t.checkoutSuccess;
        messageEl.style.color = "green";
    });
}

/* ================= ORDER HISTORY ================= */

function setupOrderHistoryButton() {
    const btnOrders = document.getElementById("btnOrders");

    if (!btnOrders) return;

    btnOrders.addEventListener("click", function(event) {
        event.preventDefault();

        const t = getText();
        const session = getSession();
        const userKey = getUserKey(session);

        if (!userKey) {
            alert(t.loginToOrders);
            window.location.href = "./deliverydangnhap.html";
            return;
        }

        const orders = loadOrderHistory(userKey);

        if (orders.length === 0) {
            alert(t.noOrders);
            return;
        }

        let message = t.orderHistoryTitle + "\n\n";

        orders.forEach(function(order, index) {
            message += t.order + " #" + (index + 1) + " - " + order.id + "\n";
            message += t.time + ": " + order.createdAt + "\n";
            message += t.status + ": " + (order.status || t.paid) + "\n\n";

            order.items.forEach(function(item) {
                const itemName = translateProductName(item.id, item.name);
                message += "- " + itemName + " x" + item.qty + " | " + money(item.price) + "\n";
            });

            message += "\n" + t.total + ": " + money(order.total) + "\n";
            message += "-------------------------\n\n";
        });

        alert(message);
    });
}

/* ================= GLOBAL EVENTS ================= */

function bindGlobalEvents() {
    document.addEventListener("click", function(event) {
        const addBtn = event.target.closest(".menu-card__add");

        if (addBtn) {
            event.preventDefault();

            const card = addBtn.closest(".menu-card");

            if (card) {
                addToCartFromCard(card);
            }

            return;
        }

        const cartActionBtn = event.target.closest("[data-cart-action]");

        if (cartActionBtn) {
            event.preventDefault();

            const row = cartActionBtn.closest(".cart-item");

            if (row) {
                updateCartItem(
                    row.getAttribute("data-id"),
                    cartActionBtn.getAttribute("data-cart-action")
                );
            }
        }
    });

    const cartIcon = document.querySelector('button[aria-label="Cart"]');
    const cartBox = document.querySelector(".cart");

    if (cartIcon && cartBox) {
        cartIcon.addEventListener("click", function() {
            cartBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
}

/* ================= BOOT ================= */

document.addEventListener("DOMContentLoaded", function() {
    setupLanguageSwitcher();
    setupAccountDropdown();
    setupProfileButtons();
    setupMenuFilter();
    setupCategoryScrollbar();
    bindGlobalEvents();
    setupCheckoutButton();
    setupOrderHistoryButton();
    applyLanguage();
    renderCart();
    updateCartBadge();
});

/* ================= TEST LOGIN ================= */

function seedSessionDemo() {
    setSession({
        userId: "u001",
        nickname: "khanh",
        name: "Nguyễn Bảo Khánh",
        email: "khanh@gmail.com",
        phone: "0909123456",
        gender: "Nam",
        birthdate: "26/05/2005",
        address: "Chưa cập nhật"
    });

    alert("Đã tạo session demo. Reload trang để test.");
}
/* ================= FIX HEADER ACTIONS LAYOUT ================= */

function fixHeaderActionsLayout() {
    const headerActions = document.querySelector(".header__actions");
    const account = document.querySelector(".account");
    const langBtn = document.querySelector(".lang-btn");
    const logoBtn = document.querySelector(".header-logo");
    const cartBtn = document.querySelector('button[aria-label="Cart"]');

    if (!headerActions || !account || !langBtn || !logoBtn || !cartBtn) return;

    // Đưa 4 nút về chung 1 hàng, đúng thứ tự:
    // user icon → ngôn ngữ → logo → giỏ hàng
    headerActions.appendChild(account);
    headerActions.appendChild(langBtn);
    headerActions.appendChild(logoBtn);
    headerActions.appendChild(cartBtn);

    headerActions.style.setProperty("display", "flex", "important");
    headerActions.style.setProperty("align-items", "center", "important");
    headerActions.style.setProperty("justify-content", "flex-end", "important");
    headerActions.style.setProperty("gap", "30px", "important");
    headerActions.style.setProperty("min-width", "260px", "important");

    account.style.setProperty("margin", "0", "important");
    langBtn.style.setProperty("margin", "0", "important");
    logoBtn.style.setProperty("margin", "0", "important");
    cartBtn.style.setProperty("margin", "0", "important");

    langBtn.style.setProperty("display", "inline-flex", "important");
    langBtn.style.setProperty("align-items", "center", "important");
    langBtn.style.setProperty("gap", "8px", "important");
    langBtn.style.setProperty("min-width", "72px", "important");
    langBtn.style.setProperty("justify-content", "center", "important");
}

/* chạy sau cùng để thắng CSS và JS cũ */
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(fixHeaderActionsLayout, 100);
});