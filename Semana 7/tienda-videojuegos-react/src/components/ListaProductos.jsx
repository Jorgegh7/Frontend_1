import Producto from './Producto';

function ListaProductos({ productos, error, onAgregar }) {
    return (
        <div id="productos" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Nuestros Productos</h2>

            {error ? (
                <p className="text-center text-danger">{error}</p>
            ) : productos.length === 0 ? (
                <p className="text-center text-muted">Cargando productos...</p>
            ) : (
                <div className="row g-4">
                    {productos.map((producto) => (
                        <div className="col-lg-3 col-md-6" key={producto.nombre}>
                            <Producto producto={producto} onAgregar={onAgregar} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaProductos;