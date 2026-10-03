import Producto from './Producto';
import FiltroCategoria from './FiltroCategorias';

// Muestra el catálogo con su filtro de categorías; recibe los datos y funciones desde App
function ListaProductos({ productos, error, onAgregar, carrito, categoriaActiva, onCambiarCategoria }) {
    return (
        <div id="productos" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Nuestros Productos</h2>

            <FiltroCategoria categoriaActiva={categoriaActiva} onCambiar={onCambiarCategoria} />

            {error ? (
                <p className="text-center text-danger">{error}</p>
            ) : productos.length === 0 ? (
                <p className="text-center text-muted">Cargando productos...</p>
            ) : (
                <div className="row g-4">
                    {productos.map((producto) => (
                        <div className="col-lg-3 col-md-6" key={producto.nombre}>
                            <Producto producto={producto} onAgregar={onAgregar} carrito={carrito} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaProductos;