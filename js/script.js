// Cargar productos desde el archivo JSON usando Fetch API
fetch("data/productos.json")
    .then(response => response.json())
    .then(productos => {
        mostrarProductos(productos);
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

// Genera dinámicamente las cards de producto en el DOM
function mostrarProductos(productos) {
    const contenedor = document.getElementById("catalogo-lista");

    if (!contenedor) {
        return;
    }

    productos.forEach(producto => {
        const columna = document.createElement("div");
        columna.className = "col-md-6 col-lg-4";

        let precioHTML = "";
        if (producto.precioOferta) {
            precioHTML = `
            <p class="card-text">Precio normal: $${producto.precioNormal}</p>
            <p class="card-text">Precio Oferta: $${producto.precioOferta}</p>
        `;
        } else {
            precioHTML = `<p class="card-text">Precio: $${producto.precioNormal}</p>`;
        }

        columna.innerHTML = `
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title">${producto.nombre}</h5>
                ${precioHTML}
                <button class="btn btn-primary agregar-carrito" 
                    data-nombre="${producto.nombre}" 
                    data-precio="${producto.precioOferta || producto.precioNormal}">
                Agregar a Carrito
            </button>
            </div>
        </div>
    `;

        contenedor.appendChild(columna);
    });


    // Array que almacena los productos agregados al carrito
    let carrito = [];

    // Selecciona TODOS los botones de "Agregar a Carrito" (existentes al cargar la página)
    const botonesCarrito = document.querySelectorAll(".agregar-carrito");

    botonesCarrito.forEach(boton => {
        boton.addEventListener("click", function () {
            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);

            agregarAlCarrito(nombre, precio);
        });
    });


    // Agrega un producto al carrito y actualiza el contador
    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre: nombre, precio: precio });

        actualizarContador();
        mostrarNotificacion(nombre);

        console.log(carrito);
    }

    // Actualiza el número que se muestra en el ícono del carrito
    function actualizarContador() {
        const contador = document.getElementById("carrito-contador");
        contador.textContent = carrito.length;
    }

    function mostrarNotificacion(nombre) {
        alert(nombre + " agregado al carrito ✅");
    }

    // Seleccionar los elementos del HTML
    const iconoCarrito = document.getElementById("carrito-icono");
    const panelCarrito = document.getElementById("carrito-panel");

    // Escuchar el evento click sobre el ícono
    iconoCarrito.addEventListener("click", function (evento) {
        evento.preventDefault();  //Evita que salte al link del anchor
        panelCarrito.classList.toggle("d-none");  //Alterna d-none con panel carrito
        mostrarProductosEnCarrito();
    });

    // Genera dinámicamente la lista de productos del carrito y calcula el total
    function mostrarProductosEnCarrito() {
        const lista = document.getElementById("carrito-lista");
        const totalSpan = document.getElementById("carrito-total");

        lista.innerHTML = ""; // limpia la lista antes de volver a generarla

        let total = 0;

        carrito.forEach(producto => {
            const item = document.createElement("li");
            item.textContent = producto.nombre + " - $" + producto.precio;
            lista.appendChild(item);

            total = total + producto.precio;
        });

        totalSpan.textContent = total;
    }


    // Aplica un efecto de sombra al pasar el mouse sobre cualquier card
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseover", function () {
            card.style.boxShadow = "0 8px 20px rgba(108, 43, 217, 0.3)";
        });

        card.addEventListener("mouseout", function () {
            card.style.boxShadow = "";
        });
    });

    // Maneja el envío del formulario de newsletter
    const formNewsletter = document.getElementById("form-newsletter");

    if (formNewsletter) {
        formNewsletter.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const email = document.getElementById("newsletter-email").value;

            alert("¡Gracias por suscribirte, " + email + "!");

            formNewsletter.reset();
        });
    }


}