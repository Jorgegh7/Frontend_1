# CriticalHit Games — Semana 8 (React + Vite)

Actividad sumativa: **Mejorando funcionalidades clave en el eCommerce con React**
Curso: Desarrollo Frontend I (PFY2201) — Duoc UC

Este proyecto continúa la tienda de videojuegos **CriticalHit Games** de la Semana 7. En esta entrega se mejoran las funcionalidades clave de la aplicación usando **`useState`**, **`useEffect`** y **renderizado condicional**, y se ordena el proyecto siguiendo buenas prácticas (Bootstrap instalado como dependencia, estructura de carpetas clara y código comentado).

## Enlaces

- Repositorio: [github.com/Jorgegh7/Frontend_1](https://github.com/Jorgegh7/Frontend_1)
- Rama de código: `react-semana8`
- Rama de despliegue: `gh-pages-semana8`
- Aplicación publicada: [jorgegh7.github.io/Frontend_1](https://jorgegh7.github.io/Frontend_1/)

## Tecnologías

- **React 18** (componentes funcionales + Hooks)
- **Vite** (desarrollo y build)
- **Bootstrap 5**, instalado con `npm install bootstrap` e importado en `main.jsx` (ya no se carga por CDN)
- **CSS propio** (`src/styles/custom.css`) para la identidad visual de la marca
- **Fetch API** para cargar el catálogo desde un JSON local

## Qué se mejoró respecto a la Semana 7

| Mejora | Descripción |
|---|---|
| Botón dinámico | El botón de cada producto cambia según el estado del carrito: "Agregar al Carrito" → "En el Carrito ✓" (verde). Al pasar el mouse, vuelve a morado con el texto "Agregar de Nuevo", indicando que se pueden sumar más unidades |
| Modal de confirmación | Al agregar un producto aparece un modal con su imagen y nombre. Su visibilidad se controla con `useState` |
| Menú hamburguesa | El navbar se colapsa en pantallas pequeñas. Se controla con `useState`, sin depender del JavaScript de Bootstrap |
| Bootstrap vía npm | Bootstrap pasó de CDN a dependencia del proyecto |
| Mensajes de carga y error | `ListaProductos` muestra "Cargando productos..." mientras llega el JSON y un mensaje de error si el fetch falla |
| Rutas para GitHub Pages | Las rutas de imágenes y del JSON usan `import.meta.env.BASE_URL` para funcionar bajo la subcarpeta de GitHub Pages |
| Miniatura en el carrito | Cada línea del carrito muestra la imagen del producto junto a su nombre, cantidad y subtotal |
| Ícono del carrito como enlace | El 🛒 del navbar, con su contador, lleva directamente a la sección del carrito |
| Imágenes de producto | Las imágenes de las cards tienen padding y esquinas redondeadas, en vez de quedar pegadas al borde |

## Estructura del proyecto

Dentro del repositorio, el proyecto vive en `Semana 8/tienda-videojuegos-react/`.

```
tienda-videojuegos-react/
├── public/
│   ├── img/                  # imágenes de productos, consolas, accesorios y recursos
│   └── data/
│       └── productos.json    # catálogo (se consume con fetch)
├── src/
│   ├── components/           # todos los componentes de React
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ListaProductos.jsx
│   │   ├── Producto.jsx
│   │   ├── BuscarProducto.jsx
│   │   ├── Carrito.jsx
│   │   ├── Footer.jsx
│   │   ├── ModalBienvenida.jsx
│   │   ├── ModalProductoAgregado.jsx
│   │   ├── BotonAccion.jsx
│   │   └── BotonLink.jsx
│   ├── styles/
│   │   └── custom.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera la carpeta dist/ para producción
```

## Notas técnicas

- **Fetch con `.then()`**: se mantuvo este estilo en lugar de `async/await`, porque los datos vienen de un archivo JSON local y no de una API externa.
- **JSON en `public/data/`**: se deja ahí, y no en `src/`, porque necesita ser accesible por URL para el `fetch`.
- **Archivos de plantilla de Vite**: `index.css` ya no se importa porque sus estilos (centrado forzado y ancho máximo de `#root`) chocaban con el diseño. `App.css` tampoco se importa.
- **Modales y menú sin JS de Bootstrap**: se controlan con `useState` para no mezclar el manejo del DOM de Bootstrap con el de React.
- **Prop `carrito` en `Producto`**: ahora es obligatoria, por lo que todos los componentes que renderizan `Producto` (`ListaProductos` y `BuscarProducto`) deben pasarla.

## Mejoras futuras

- Persistencia del carrito entre recargas (`localStorage`)
- Categorizar los productos desde el JSON para filtrar por tipo

## Autor

Jorge Gallardo — Analista Programador Computacional, Duoc UC Online.
