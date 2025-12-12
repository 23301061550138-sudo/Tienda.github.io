# Tienda
Este es un proyecto de una pagina de una tienda. Tiene un archivo principal que seria el index.html, un sistema de inicio de sesión y un archivo JSON con datos de los productos. La pagina está con HTML, CSS y JavaScript.

## Índice
1. [Descripción general](#descripción-general)  
2. [Características](#características)  
3. [Capturas de pantalla](#capturas-de-pantalla)  
4. [Estructura del proyecto](#estructura-del-proyecto)  
5. [Tecnologías utilizadas](#tecnologías-utilizadas)  
6. [Instalación](#instalación)  
7. [Uso](#uso)  
8. [Ejemplos de código](#ejemplos-de-código)  
9. [Mejoras futuras](#mejoras-futuras)

## Descripción general
El proyecto consiste en una aplicación web estática que muestra productos escolares y permite simular un sistema básico de autenticación. Incluye componentes para manejo de datos, estilos personalizados e interacción mediante JavaScript.

## Características
- Página principal (`index.html`) que muestra los productos.  
- Sistema sencillo de inicio de sesión (`login.html` + `login.js`).  
- Lectura de información desde un archivo JSON (`data.json`).  
- Diseño limpio y adaptable.  
- Código organizado en módulos separados (HTML, CSS y JS).  

## Capturas de pantalla

**Login:**  
<img width="567" height="466" alt="image" src="https://github.com/user-attachments/assets/78dec981-66fb-47e4-8962-a2b0a953f015" />


**Página principal:**  
<img width="1366" height="629" alt="image" src="https://github.com/user-attachments/assets/83b1ff98-d6a4-4efd-9d50-c4b619dc80a2" />


## Estructura del proyecto
- `index.html` – Página principal que muestra los productos.  
- `login.html` – Página de inicio de sesión.  
- `login.js` – Lógica de validación de usuarios.  
- `script.js` – Lógica principal de la tienda y manejo de productos.  
- `styles.css` – Estilos de la página.  
- `data.json` – Archivo con los datos de los productos.  

## Tecnologías utilizadas
- HTML5  
- CSS3  
- JavaScript  
- JSON  

## Instalación

1. Clona este repositorio:
git clone https://github.com/23301061550138-sudo/Tienda.git

2. Entra al proyecto
cd Tienda

3. Abre los archivos .html en tu navegador

## Uso
1. Abre `index.html` para ver la página principal con los productos.  
2. Abre `login.html` para utilizar el sistema básico de acceso.  
3. Asegúrate de que `data.json` esté en el mismo nivel que los demás archivos para que la lectura funcione correctamente.  

## Ejemplos de código

### index.html
```yml
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Tienda Escolar</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="script.js" defer></script>
</head>

<body>

<header>
    <div class="logo">
        <img src="https://images.vexels.com/media/users/3/223412/isolated/preview/bd3704cf52ba23499660b8bae7221daf-diseno-plano-de-icono-de-tienda.png" alt="Logo Tienda" />
    </div>

    <div class="header-right">

        <!-- Carrito -->
        <button class="cart-btn" onclick="toggleCart()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span id="cartCount">0</span>
        </button>

        <!-- Favoritos -->
        <button class="favorites-btn" onclick="showFavorites()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M20.8 4.6c-1.5-1.4-4-1.4-5.5 0L12 7.9l-3.3-3.3c-1.5-1.4-4-1.4-5.5 0s-1.5 3.6 0 5l8.8 8.9 8.8-8.9c1.5-1.4 1.5-3.6 0-5z"/>
            </svg>
            <span id="favCount">0</span>
        </button>

        <!-- Login -->
        <button class="login-btn" onclick="openLogin()">Iniciar Sesión</button>

    </div>
</header>


<!-- ==================== BUSCADOR + CATEGORÍAS ==================== -->
<div class="search-categories-container">

    <!--BUSCADOR-->
    <div class="search-box">

        <!-- Input -->
        <input type="text" id="searchInput" placeholder="Buscar producto..." />

        <!-- Historial -->
        <div id="searchHistory" class="history-box"></div>

        <!-- Lupa -->
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

    </div>

    <!-- Categorías -->
    <select id="categorySelect" onchange="filterBySelect()">
        <option value="" disabled selected hidden>Categorías</option>
        <option value="all">Todo</option>
        <option value="electronica">Electrónica</option>
        <option value="ropa">Ropa</option>
        <option value="libros">Libros</option>
        <option value="hogar">Hogar</option>
        <option value="computadoras">Computadoras</option>
        <option value="gaming">Gaming</option>
    </select>

</div>
```

### login.html
```yml
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="styles.css">
    <script src="login.js" defer></script>
</head>
<body>

<div class="login-container" id="loginSection">
    <h2>Iniciar Sesión</h2>
    <input type="text" id="usernameInput" placeholder="Usuario">
    <input type="password" id="passwordInput" placeholder="Contraseña">
    <button onclick="login()">Iniciar sesión</button>
    <p id="loginMessage" style="color:red;"></p>

    <p>¿No tienes cuenta?
        <span onclick="showRegister()" style="cursor:pointer; color:blue">Regístrate</span>
    </p>
</div>

<div class="login-container" id="registerSection" style="display:none;">
    <h2>Registrarse</h2>
    <input type="text" id="regUsername" placeholder="Usuario">
    <input type="password" id="regPassword" placeholder="Contraseña">
    <button onclick="register()">Crear cuenta</button>
    <p id="registerMessage" style="color:red;"></p>

    <p>¿Ya tienes cuenta?
        <span onclick="showLogin()" style="cursor:pointer; color:blue">Iniciar Sesion</span>
    </p>
</div>

</body>
</html>

```

### data.json
```yml
[
  {
    "id": 1,
    "title": "Audífonos inalámbricos WH-CH520",
    "price": 75.00,
    "category": "electronica",
    "image": "https://mxsonyb2c.vtexassets.com/arquivos/ids/317068-800-800?v=638747999295330000&width=800&height=800&aspect=true",
    "description": "Disfruta de hasta 50 horas de batería con los audífonos inalámbricos WH-CH520.",
    "features": [
      -"Hasta 50 horas de batería",
      -"Diseño cómodo y ligero",
      -"Sonido claro y ajustable",
      -"Compatible con Sony Headphones Connect"
    ]
  },
```

### Mejoras futuras
   
- Mejorar el sistema de inicio de sesion para que si funcione.  
- Agregar manejo de usuarios con almacenamiento seguro.  
- Mejorar el diseño y estructura de la pagina
