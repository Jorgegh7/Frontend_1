// Siguiente mejora: Persistencia de los datos en Carrito al moverse entre paginas 

//Variable globar de productos
let productosGlobal = [];

//Variable global de carrito
let carrito = [];

// En una siguiente iteracion los productos podrian tener un atributo categoria que permita cargar 
// los productos a las distintas secciones directo desde el fetch
// Conecta los botones y el mouseover de las cards que ya existen en el HTML (sin depender del fetch)
configurarBotonesCarrito();
configurarMouseoverCards();

/* ============== FETCH PRODUCTOS - CONFIGURACION DE CARDS ==============*/

// Cargar productos desde el archivo JSON usando Fetch API
// Al ingresar a la pagina se cargan por defecto los productos con el bool recienAnadido -> true
fetch("data/productos.json")
    .then(response => response.json())
    .then(productos => {
        productosGlobal = productos;

        //Se filtran los productos por recienAnadido
        const recienAnadidos = productos.filter(p => esReciente(p.fechaIngreso));
        mostrarProductos(recienAnadidos);
    })
    .catch(error => {
        mostrarErrorEnPantalla();
        console.error("Error al cargar los productos:", error);
    });

// Muestro un error custimizado para el cliente
function mostrarErrorEnPantalla() {
    const contenedor = document.getElementById("catalogo-lista");
    if (contenedor) {
    }
    contenedor.innerHTML = `
            <p class="text-danger text-center w-100">
                No se pudieron cargar los productos. Intenta nuevamente más tarde.
            </p>
            `;
}

// Valida si el producto es reciente por fecha con tiempo menor a 30 dias 
function esReciente(fechaIngreso) {
    const fecha = new Date(fechaIngreso);
    const ahora = new Date();
    const diasTranscurridos = (ahora - fecha) / (1000 * 60 * 60 * 24);

    return diasTranscurridos <= 30;
}

// Aplica los filtros para mostrar los productos con Oferta o Recien Añadidos
function aplicarFiltro(tipo) {
    const titulo = document.getElementById("titulo-catalogo");
    let resultado;

    if (tipo === "ofertas") {
        resultado = productosGlobal.filter(p => p.precioOferta);
        titulo.textContent = "Ofertas";
    } else {
        resultado = productosGlobal.filter(p => esReciente(p.fechaIngreso));
        titulo.textContent = "Recién Añadidos";
    }

    mostrarProductos(resultado);
}

const botonesFiltro = document.querySelectorAll(".filtro-btn");

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", function () {
        botonesFiltro.forEach(b => {
            b.classList.remove("btn-primary");
            b.classList.add("btn-outline-primary");
        });

        boton.classList.remove("btn-outline-primary");
        boton.classList.add("btn-primary");

        const tipoFiltro = boton.dataset.filtro;
        aplicarFiltro(tipoFiltro);
    });
});


// Genera dinámicamente las cards de producto en el DOM
function mostrarProductos(productos, idContenedor = "catalogo-lista") {
    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) {
        return;
    }

    //Limpia el listado de productos cuando es llamado por los filtros de seleccion
    contenedor.innerHTML = "";

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
                    data-precio="${producto.precioOferta || producto.precioNormal}"
                    data-imagen="${producto.imagen}">
                Agregar a Carrito
            </button>
            </div>
        </div>
    `;

        contenedor.appendChild(columna);
    });

    configurarBotonesCarrito();
    configurarMouseoverCards();
}

/* ============== CARRITO ==============*/

// Agrega un producto al carrito y actualiza el contador
function agregarAlCarrito(nombre, precio, imagen) {

    carrito.push({ nombre: nombre, precio: precio, imagen: imagen });
    actualizarContador();
    mostrarNotificacion(nombre, precio, imagen);

    console.log(carrito);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContador();
    mostrarProductosEnCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarContador();
    mostrarProductosEnCarrito();
}

// Actualiza el número que se muestra en el ícono del carrito
function actualizarContador() {
    const contador = document.getElementById("carrito-contador");
    contador.textContent = carrito.length;
}

// Llama a un modal al momento de agregar un producto al carrito 
function mostrarNotificacion(nombre, precio, imagen) {
    document.getElementById("modalCarritoImagen").src = imagen;
    document.getElementById("modalCarritoImagen").alt = nombre;
    document.getElementById("modalCarritoNombre").textContent = nombre;
    document.getElementById("modalCarritoPrecio").textContent = "$" + precio;

    const modal = new bootstrap.Modal(document.getElementById("modalAgregarProductoCarrito"));
    modal.show();
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

// Cierra el panel Carrito si el usuario hace click fuera de él
document.addEventListener("click", function (evento) {
    const clickDentroDelPanel = panelCarrito.contains(evento.target);
    const clickEnElIcono = iconoCarrito.contains(evento.target);
    const clickEnEliminar = evento.target.classList.contains("eliminar-item");

    if (!clickDentroDelPanel && !clickEnElIcono && !clickEnEliminar && !panelCarrito.classList.contains("d-none")) {
        panelCarrito.classList.add("d-none");
    }
});

// Genera dinámicamente la lista de productos del carrito y calcula el total
function mostrarProductosEnCarrito() {
    const lista = document.getElementById("carrito-lista");
    const totalSpan = document.getElementById("carrito-total");

    // limpia la lista antes de volver a generarla
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.className = "d-flex align-items-center mb-2";
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="me-2 rounded">
            <div class="flex-grow-1">
                <small>${producto.nombre}</small><br>
                <strong>$${producto.precio}</strong>
            </div>
            <button class="btn btn-sm btn-outline-danger eliminar-item" data-index="${index}">✕</button>
        `;
        lista.appendChild(item);

        total = total + producto.precio;
    });

    totalSpan.textContent = total;

    // Conecta el click de cada botón "eliminar" recién creado
    const botonesEliminar = document.querySelectorAll(".eliminar-item");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            const index = Number(boton.dataset.index);
            eliminarDelCarrito(index);
        });
    });
}

// Selecciona TODOS los botones de "Agregar a Carrito" (existentes al cargar la página)
function configurarBotonesCarrito() {
    const botonesCarrito = document.querySelectorAll(".agregar-carrito");

    botonesCarrito.forEach(boton => {
        boton.addEventListener("click", function () {
            const nombre = boton.dataset.nombre;
            const precio = Number(boton.dataset.precio);
            const imagen = boton.dataset.imagen;

            agregarAlCarrito(nombre, precio, imagen);
        });
    });
}

// BOTON VACIAR
const botonVaciar = document.getElementById("vaciar-carrito");

if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
        vaciarCarrito();
    });
}

/* ============== MOUSEOVER ==============*/

// Aplica un efecto de sombra al pasar el mouse sobre las cards actuales
function configurarMouseoverCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseover", function () {
            card.style.boxShadow = "0 8px 20px rgba(108, 43, 217, 0.3)";
        });

        card.addEventListener("mouseout", function () {
            card.style.boxShadow = "";
        });
    });
}

/* ============== FORMULARIO NEWSLETTER ==============*/

const formNewsletter = document.getElementById("form-newsletter");

if (formNewsletter) {
    formNewsletter.addEventListener("submit", function (evento) {
        evento.preventDefault(); //Evita el comportamiento por defecto del formulario 

        const email = document.getElementById("newsletter-email").value;

        document.getElementById("modalNewsletterTexto").textContent =
            "Te has suscrito con el correo: " + email;

        const modal = new bootstrap.Modal(document.getElementById("modalNewsletter"));
        modal.show();

        formNewsletter.reset();
    });
}


/* ============== BUSCADOR DE PRODUCTOS ==============*/

const formBusqueda = document.getElementById("form-busqueda");

if (formBusqueda) {
    formBusqueda.addEventListener("submit", function (evento) {

        evento.preventDefault(); //Evita que la pagina se recargue

        //almacena el termino ingresado por el usuario
        const termino = document.getElementById("input-busqueda").value.toLowerCase().trim();

        const resultados = productosGlobal.filter(producto =>
            producto.nombre.toLowerCase().includes(termino)
        );

        //Si no hay resultado se muestra un mensaje al usuario por medio de innerHTML
        if (resultados.length === 0) {
            const contenedor = document.getElementById("resultados-busqueda");

            contenedor.innerHTML = `
            <p class="text-center w-100 text-muted">
                No se encontraron productos que coincidan con "${termino}".
            </p>
        `;

        } else {

            //Se inyectan los resultado en "resultados-busqueda"
            mostrarProductos(resultados, "resultados-busqueda");
        }
    });
}

// LIMPIAR BUSQUEDA
const botonLimpiar = document.getElementById("limpiar-busqueda");

if (botonLimpiar) {
    botonLimpiar.addEventListener("click", function () {
        document.getElementById("input-busqueda").value = ""; //Limpia el input, no afecta el placeholder del HTML
        document.getElementById("resultados-busqueda").innerHTML = ""; //Limpia resultados-buqueda
    });
}


/* ============== MODAL ==============*/

//EventListener que llama al modal de bienvenida
window.addEventListener("load", function () {
    const elementoModal = document.getElementById("modalBienvenida");
    if (elementoModal) {
        const modalBienvenida = new bootstrap.Modal(elementoModal);
        modalBienvenida.show();
    }
});


