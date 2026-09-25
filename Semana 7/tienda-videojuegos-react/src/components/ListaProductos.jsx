function ListaProductos({ productos, error }) {
    return (
        <div id="productos" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Nuestros Productos</h2>

            {error ? (
                <p className="text-center text-danger">{error}</p>
            ) : productos.length === 0 ? (
                <p className="text-center text-muted">Cargando productos...</p>
            ) : (
                <div className="row g-4">
                    {/* ... */}
                </div>
            )}
        </div>
    );
}

export default ListaProductos; 