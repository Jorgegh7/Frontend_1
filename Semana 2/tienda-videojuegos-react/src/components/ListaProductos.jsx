import Producto from './Producto';

function ListaProductos({ productos, onAgregar }) {
    return (
        <div id="productos" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Nuestros Productos</h2>

            <div className="row g-4">
                {productos.map((producto) => (
                    <div className="col-md-6 col-lg-4" key={producto.nombre}>
                        <Producto producto={producto} onAgregar={onAgregar} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListaProductos;