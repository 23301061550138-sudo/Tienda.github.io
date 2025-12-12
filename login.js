function showLogin() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("registerSection").style.display = "none";
}

function showRegister() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("registerSection").style.display = "block";
}

function login() {
    const username = document.getElementById("usernameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", username);
        window.close();
    } else {
        document.getElementById("loginMessage").textContent = "Usuario o contraseña incorrectos";
    }
}

function register() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!username || !password) {
        document.getElementById("registerMessage").textContent = "Completa todos los campos";
        return;
    }

    if (users.some(u => u.username === username)) {
        document.getElementById("registerMessage").textContent = "Ese usuario ya existe";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    window.close();
}
