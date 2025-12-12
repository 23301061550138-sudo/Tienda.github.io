// ==================== VARIABLES ====================
let products = []; 
let currentProduct = null; 

// Guardar usuario 
let currentUser = localStorage.getItem("currentUser") || null;

// Abrir login en nueva pestaña
function openLogin() {
    window.open("login.html", "_blank");
}

// ==================== CARGAR JSON ====================
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts();
        updateCartCount();
        updateFavCount();
    });

// ==================== RENDER PRODUCTOS ====================
function renderProducts(filter = "") {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products
        .filter(p =>
            filter === "all" ||
            filter === "" ||
            p.category === filter ||
            normalizeText(p.title).includes(normalizeText(filter))

        )
        .forEach(p => {
            list.innerHTML += `
        <div class="product-card">
            <img src="${p.image}" alt="${p.title}" onclick="openProduct(${p.id})">
            <h3 onclick="openProduct(${p.id})">${p.title}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <button class="add-btn" onclick="addToCart(${p.id})">Agregar</button>
        </div>
       `;
    });
}

// ==================== DETALLE PRODUCTO ====================
function openProduct(id) {
    currentProduct = products.find(p => p.id === id);

    let featuresHTML = currentProduct.features
        ? currentProduct.features.map(f => `<li>${f}</li>`).join("")
        : "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorited = favorites.includes(currentProduct.id);

    document.getElementById("productDetail").innerHTML = `
        <div class="product-detail-container">
            <div class="image-container">
                <img src="${currentProduct.image}" alt="${currentProduct.title}">
            </div>
            <div class="info-container">
                <h2>${currentProduct.title}</h2>
                <p>${currentProduct.description.replace(/\n/g, "<br>")}</p>
                <h3>$${currentProduct.price.toFixed(2)}</h3>
                <button class="add-btn" onclick="addToCart(${currentProduct.id})">Agregar al carrito</button>
                
                <div class="product-description">
                    <h4>Lo que tienes que saber de este producto</h4>
                    <ul>${featuresHTML}</ul>
                    <button class="favorite-btn ${isFavorited ? "active" : ""}" id="favoriteBtn">
                        ⭐ <span>${isFavorited ? "Favorito agregado" : "Agregar a favoritos"}</span>
                    </button>
                    
                </div>
            </div>
        </div>
    `;

    const favBtn = document.getElementById("favoriteBtn");
    favBtn.addEventListener("click", () => {
        toggleFavorite(currentProduct.id);
        const isFav = favBtn.classList.toggle("active");
        favBtn.querySelector("span").textContent = isFav
            ? "Favorito agregado"
            : "Agregar a favoritos";
    });

    showSection("productSection");
}

// ==================== FAVORITOS ====================
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavCount();
}

function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const list = document.getElementById("favoritesList");
    list.innerHTML = "";

    if (favorites.length === 0) {
        list.innerHTML = "<p style='color:#333;'>No hay productos favoritos</p>";
    } else {
        favorites.forEach(id => {
            const p = products.find(prod => prod.id === id);
            if (p) {
                list.innerHTML += `
                    <div class="product-card">
                        <img src="${p.image}" alt="${p.title}" onclick="openProduct(${p.id})">
                        <h3 onclick="openProduct(${p.id})">${p.title}</h3>
                        <p>$${p.price.toFixed(2)}</p>
                        <button class="add-btn" onclick="addToCart(${p.id})">Agregar</button>
                        <button class="remove-fav-btn" onclick="toggleFavorite(${p.id}); showFavorites();">❌ Quitar</button>
                    </div>
                `;
            }
        });
    }

    showSection("favoritesSection");
    updateFavCount();
}

function updateFavCount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("favCount").textContent = favorites.length;
}

// ==================== CARRITO ====================
// Obtener la cantidad de un producto en el carrito
function getCartQty(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
}

// Cambiar la cantidad de un producto en el carrito
function changeQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => i.id === id);

    if (!item && delta > 0) {
        cart.push({ id, qty: 1 });
    } else if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartSidebar();
}

// Agregar un producto al carrito
function addToCart(id) {
    changeQty(id, 1);
}

// Actualizar el contador del carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").textContent = cart.reduce((a, b) => a + b.qty, 0);
}

// Mostrar u ocultar el carrito
function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");
    sidebar.classList.toggle("active");
    renderCartSidebar();
}

// Renderizar el contenido del carrito
function renderCartSidebar() {
    const area = document.getElementById("cartPage");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        area.innerHTML = "<p style='color:#333;'>Carrito vacío</p>";
        document.getElementById("totalPrice").textContent = "Total: $0.00";
        return;
    }

    let totalGeneral = 0;
    area.innerHTML = "";


    cart.forEach(item => {
        const p = products.find(pr => pr.id === item.id);
        if (!p) return; // Si no se encuentra el producto, se omite

        const totalProducto = item.qty * p.price;
        totalGeneral += totalProducto;

        area.innerHTML += `
            <div class="cart-item">
                <h3>${p.title}</h3>
                <p>Precio unitario: $${p.price.toFixed(2)}</p>
                <p>Cantidad: 
                    <button class="decrease" onclick="changeQty(${p.id}, -1)">-</button>
                    ${item.qty}
                    <button class="increase" onclick="changeQty(${p.id}, 1)">+</button>
                </p>
                <p>Total: $${totalProducto.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${p.id})">Eliminar</button>
            </div>
        `;
    });

    document.getElementById("totalPrice").textContent = `Total: $${totalGeneral.toFixed(2)}`;
}

// Eliminar un producto del carrito
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartSidebar();
}

// Vaciar el carrito
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    renderCartSidebar();
}

// Función de compra 
function checkout() {
    alert("Gracias por tu compra");
    clearCart();
}

// Ejemplo de obtener productos
function getProducts() {
    return [
        { id: 1, title: "Producto 1", price: 10 },
        { id: 2, title: "Producto 2", price: 20 },
        { id: 3, title: "Producto 3", price: 30 }
    ];
}


// ==================== NAVEGACIÓN ====================
function showSection(id) {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("productSection").style.display = "none";
    document.getElementById("favoritesSection").style.display = "none";
    document.getElementById(id).style.display = "block";
}

function normalizeText(text) {
    return text
        .normalize("NFD")         
        .replace(/[\u0300-\u036f]/g, "")  
        .toLowerCase();          
}

function goHome() {
    showSection("homeSection");
}

function filterBySelect() {
    const select = document.getElementById("categorySelect");
    const category = select.value;
    renderProducts(category);
}

// ==================== BUSCADOR ====================
document.getElementById("searchInput").addEventListener("input", e => {
    renderProducts(normalizeText(e.target.value));
});


// ==================== COMPRA ====================
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("Gracias por tu compra");
    clearCart();
    toggleCart();
}

// ==================== HISTORIAL BUSQUEDA ====================
function saveSearch(query) {
    if (!query) return;

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // eliminar duplicados
    history = history.filter(item => item !== query);

    // agregar al inicio
    history.unshift(query);

    // máximo 8
    if (history.length > 8) history.pop();

    localStorage.setItem("searchHistory", JSON.stringify(history));
}

function showHistory() {
    const box = document.getElementById("searchHistory");

    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (history.length === 0) {
        box.style.display = "none";
        return;
    }

    box.innerHTML = history
        .map(item => `<div class="history-item">${item}</div>`)
        .join("");

    box.style.display = "block";

    // clic en historial
    document.querySelectorAll(".history-item").forEach(el => {
        el.addEventListener("click", () => {
            const value = el.textContent;

            document.getElementById("searchInput").value = value;

            renderProducts(normalizeText(value));
            hideHistory();
        });
    });
}

function hideHistory() {
    document.getElementById("searchHistory").style.display = "none";
}

document.getElementById("searchInput").addEventListener("input", e => {
    const value = normalizeText(e.target.value);

    renderProducts(value);
    showHistory();
});

document.getElementById("searchInput").addEventListener("blur", e => {
    const value = e.target.value.trim();
    saveSearch(value);

    setTimeout(hideHistory, 200);
});

const historyBox = document.getElementById("searchHistory");

historyBox.addEventListener("mouseleave", () => {
    hideHistory();
});
