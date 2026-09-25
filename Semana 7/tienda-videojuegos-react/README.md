# CriticalHit Games — Semana 7 (React + Vite)

Actividad: **Construyendo componentes funcionales en React para un eCommerce interactivo**
Curso: Desarrollo Frontend I (PFY2201) — Duoc UC

Este proyecto continúa el desarrollo de la tienda de videojuegos **CriticalHit Games**, migrando el catálogo de productos y el carrito de compras a **React**, usando **Vite** como herramienta de build. A diferencia de las entregas anteriores (HTML, CSS, Bootstrap y JavaScript vanilla), esta semana la interfaz se construye a partir de **componentes reutilizables**, con manejo de estado mediante **Hooks** (`useState`, `useEffect`) y **renderizado condicional**.

## Repositorio y rama

- Repositorio: [github.com/Jorgegh7/Frontend_1](https://github.com/Jorgegh7/Frontend_1)
- Rama de esta entrega: `react-semana7`
- Rama de despliegue: `gh-pages-semana7` (GitHub Pages)

## Tecnologías utilizadas

- **React 18** (componentes funcionales + Hooks)
- **Vite** (entorno de desarrollo y build)
- **Bootstrap 5** (vía CDN, para estructura y clases utilitarias)
- **CSS propio** (`src/styles/custom.css`, identidad visual de la marca: navbar, hero y footer)
- **Fetch API** (carga del catálogo desde `productos.json`)

## Estructura del proyecto

```
tienda-videojuegos-react/
├── public/
│   ├── img/              # imágenes de productos, consolas, accesorios y recursos
│   └── data/
│       └── productos.json
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ListaProductos.jsx
│   │   ├── Producto.jsx
│   │   ├── BuscarProducto.jsx
│   │   ├── Carrito.jsx
│   │   ├── Footer.jsx
│   │   ├── ModalBienvenida.jsx
│   │   ├── BotonAccion.jsx
│   │   └── BotonLink.jsx
│   ├── styles/
│   │   └── custom.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## Componentes y responsabilidades

| Componente | Responsabilidad |
|---|---|
| `App` | Componente raíz. Contiene el estado del catálogo y del carrito, la carga vía Fetch, y todas las funciones que modifican el carrito (agregar, eliminar, vaciar) |
| `Header` | Barra de navegación con links de anclaje a cada sección y el contador de productos en el carrito |
| `Hero` | Sección de bienvenida con botón de acceso directo al catálogo |
| `ModalBienvenida` | Modal informativo (Cyberday), visible al cargar la página, controlado con `useState` |
| `ListaProductos` | Recorre el catálogo completo y renderiza una card `Producto` por cada uno |
| `BuscarProducto` | Buscador en tiempo real sobre el catálogo (filtra por nombre), reutiliza el componente `Producto` para mostrar resultados |
| `Producto` | Card individual: nombre, descripción, precio (con o sin oferta), selector de cantidad y botón para agregar al carrito |
| `Carrito` | Muestra los productos agregados, permite eliminar ítems o vaciar el carrito, calcula subtotales y total |
| `Footer` | Información de contacto, enlaces internos, redes sociales y formulario de newsletter (con modal de confirmación) |
| `BotonAccion` / `BotonLink` | Componentes de botón reutilizables — el primero para acciones (`onClick`), el segundo para navegación (`href`) |

## Funcionalidades implementadas

**Listado de productos**
Cada producto muestra nombre, precio normal, precio oferta (cuando aplica), descripción e imagen, cargados dinámicamente desde `productos.json` mediante Fetch API (con verificación de `response.ok` para un manejo de errores más robusto).

**Carrito de compras**
- Agregar productos (con cantidad seleccionable); si el producto ya está en el carrito, se suman las cantidades en vez de duplicar la línea
- Eliminar un producto específico
- Vaciar el carrito completo
- Contador total de unidades, visible en el `Header`
- Cálculo de subtotal por producto y total general

**Buscador de productos**
Filtra el catálogo en tiempo real a medida que el usuario escribe (`onChange`), mostrando los resultados con el mismo componente `Producto` que usa el catálogo principal — reutilización directa de componentes.

**Eventos implementados**
`onClick` (agregar al carrito, eliminar, vaciar, cerrar modales), `onChange` (cantidad de producto, campo de búsqueda), `onSubmit` (formulario de newsletter).

**Renderizado condicional**
- Precio con oferta vs. precio normal, en cada `Producto`
- Mensaje de "carrito vacío" vs. lista de productos, en `Carrito`
- Resultados de búsqueda vs. mensaje de "sin coincidencias", en `BuscarProducto`
- Visibilidad de los modales (bienvenida y confirmación de newsletter), controlada con `useState`

## Cómo ejecutar el proyecto localmente

```bash
npm install
npm run dev
```

El proyecto queda disponible en `http://localhost:5173`.

## Notas técnicas

- Los estilos combinan clases de **Bootstrap** con clases propias definidas en `src/styles/custom.css` (identidad visual de la marca: navbar, hero, footer, color de botones). Algunos ajustes puntuales de tamaño en las cards de producto se resolvieron con estilos en línea (`style={{}}`) dentro del propio componente.
- Los modales (bienvenida y confirmación de newsletter) se implementaron controlando su visibilidad con `useState`, en lugar de depender del JavaScript de Bootstrap, para evitar conflictos con el manejo del DOM propio de React.
- El archivo `index.css` generado por defecto por Vite fue vaciado/desvinculado, ya que sus estilos (centrado forzado, ancho máximo de `#root`) entraban en conflicto con el diseño del proyecto.
- Por alcance de esta entrega, la navegación entre secciones se resuelve con anclas (`#inicio`, `#productos`, `#buscar`, `#carrito`) dentro de una única página, sin enrutamiento entre vistas.

