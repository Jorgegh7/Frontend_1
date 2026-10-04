# CriticalHit Games — Evaluación Final Transversal (EFT)

Sitio web de una tienda online de videojuegos, desarrollado para la **Evaluación Final Transversal** de Desarrollo Frontend I (PFY2201) — Duoc UC.

La tienda muestra los productos en tarjetas, permite filtrarlos por categoría y buscarlos por nombre, gestionar un carrito de compras, finalizar la compra (simulada) y contactar al administrador mediante un formulario con validación.

## Enlaces

- Repositorio: [github.com/Jorgegh7/Frontend_1](https://github.com/Jorgegh7/Frontend_1)
- Rama de código: `react-eft`
- Rama de despliegue: `gh-pages-eft`
- Sitio publicado (GitHub Pages): [jorgegh7.github.io/Frontend_1](https://jorgegh7.github.io/Frontend_1/)

## Tecnologías

- **HTML5** con etiquetas semánticas (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** (`src/styles/custom.css`) para la identidad visual de la marca
- **JavaScript (ES6+)**: Fetch API, métodos de arreglos (`map`, `filter`, `reduce`, `find`, `some`) y validación de formularios
- **Bootstrap 5**, instalado con `npm` y importado en `main.jsx`
- **React 18** (componentes funcionales, props y Hooks `useState` y `useEffect`)
- **Vite** como herramienta de desarrollo y build

## Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| Catálogo en tarjetas | Cada producto muestra imagen, nombre, descripción y precio (con precio normal tachado si tiene oferta). Los datos se cargan con `fetch` desde `public/data/productos.json` |
| Filtro por categoría | Botones Todos, Videojuegos, Consolas y Accesorios que filtran el catálogo según el campo `categoria` de cada producto |
| Buscador | Busca productos por nombre mientras se escribe, con botón para limpiar y mensaje si no hay resultados |
| Carrito de compras | Agregar productos (con cantidad), eliminar uno, vaciar el carrito, contador de unidades en el navbar y total. Si el producto ya está en el carrito, el botón cambia a "En el Carrito ✓" |
| Finalizar compra | Botón que abre un modal con el detalle de la compra (productos, cantidades y total). Al confirmar, el carrito se vacía y aparece un modal de compra exitosa. El pago es simulado, no se procesa ni se guarda ningún dato |
| Formulario de contacto | Campos nombre, email y mensaje. Valida que el nombre y el email no estén vacíos, que el email tenga formato válido y que el mensaje tenga al menos 10 caracteres. Muestra un mensaje de error por campo y, si todo es correcto, un modal de confirmación y deja el formulario vacío |
| Diseño responsivo | Maquetación con el sistema de grillas de Bootstrap y menú hamburguesa en pantallas pequeñas |

## Instalación y uso

### Requisitos

- [Node.js](https://nodejs.org/) (versión LTS reciente) y npm

### Pasos

1. Descargar o clonar el repositorio y abrir una terminal dentro de la carpeta del proyecto (`tienda-videojuegos-react`).
2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

### Otros comandos

```bash
npm run build     # genera la versión de producción en la carpeta dist/
npm run preview   # sirve la carpeta dist/ localmente para revisarla
```

### Cómo usar el sitio

1. **Navegar**: el menú superior lleva a cada sección (Inicio, Productos, Buscar, Carrito y Contacto).
2. **Filtrar**: en "Nuestros Productos", elegir una categoría para ver solo esos productos.
3. **Buscar**: escribir en el buscador para encontrar un producto por nombre.
4. **Comprar**: elegir la cantidad y presionar "Agregar al Carrito". El producto aparece en la sección Carrito, donde se puede eliminar o vaciar todo.
5. **Finalizar**: presionar "Finalizar compra", revisar el detalle en el modal y confirmar.
6. **Contactar**: completar el formulario de la sección Contacto y presionar "Enviar".

## Estructura del proyecto

```
tienda-videojuegos-react/
├── public/
│   ├── img/                      # imágenes de productos, consolas, accesorios y recursos
│   └── data/
│       └── productos.json        # catálogo de productos (con categoría)
├── src/
│   ├── components/
│   │   ├── Header.jsx            # barra de navegación con menú hamburguesa y contador del carrito
│   │   ├── Hero.jsx              # sección de bienvenida
│   │   ├── ListaProductos.jsx    # catálogo en tarjetas
│   │   ├── FiltroCategorias.jsx  # botones de filtro por categoría
│   │   ├── Producto.jsx          # tarjeta individual de producto
│   │   ├── BuscarProducto.jsx    # buscador por nombre
│   │   ├── Carrito.jsx           # lista de compras, total y botones
│   │   ├── FormularioContacto.jsx# formulario de contacto con validación
│   │   ├── Footer.jsx            # pie de página y newsletter
│   │   ├── ModalBienvenida.jsx
│   │   ├── ModalProductoAgregado.jsx
│   │   ├── ModalCompra.jsx       # detalle de la compra
│   │   ├── ModalCompraExitosa.jsx
│   │   ├── BotonAccion.jsx       # botón reutilizable con onClick
│   │   └── BotonLink.jsx         # enlace con aspecto de botón
│   ├── styles/
│   │   └── custom.css
│   ├── App.jsx                   # estado principal y funciones del carrito
│   └── main.jsx                  # punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

## Cómo funciona

- **Estado centralizado en `App`**: el catálogo, el carrito, la categoría activa y los modales viven en `App`, que reparte los datos y las funciones a los demás componentes mediante props.
- **Carga dinámica con `useEffect`**: al iniciar, un `useEffect` hace `fetch` al JSON y guarda los productos en el estado. Si falla, muestra un mensaje de error; mientras carga, muestra "Cargando productos...".
- **Reutilización de componentes**: `Producto` se usa tanto en el catálogo como en los resultados de búsqueda, y `BotonAccion` en el carrito, el filtro y los buscadores.
- **Renderizado condicional**: precio con o sin oferta, botón "Agregar" o "En el Carrito ✓", carrito vacío o con productos, resultados del buscador, mensajes de error del formulario y visibilidad de los modales.
- **Modales sin JavaScript de Bootstrap**: se controlan con `useState`, para no mezclar el manejo del DOM de Bootstrap con el de React.

## Notas técnicas

- **`import.meta.env.BASE_URL`**: prefijo de Vite que permite que las imágenes y el JSON de `public/` se encuentren al publicar en GitHub Pages bajo una subcarpeta.
- **JSON en `public/data/`**: se deja ahí, y no en `src/`, porque necesita ser accesible por URL para el `fetch`.
- **Datos de los videojuegos**: se mantienen en un archivo JSON (nombre, categoría, precio, descripción e imagen) y se cargan dinámicamente, en lugar de estar escritos dentro del código.

## Mejoras futuras

- Persistencia del carrito entre recargas (`localStorage`)
- Un panel para agregar y eliminar productos del catálogo
- Pasarela de pago real en lugar de la compra simulada
- Enrutamiento entre vistas con React Router

## Autor

Jorge Gallardo — Analista Programador Computacional, Duoc UC Online.
