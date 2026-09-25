import BotonAccion from './BotonAccion';

function Carrito({ items, onEliminar, onVaciar }) {
    const total = items.reduce((acumulado, item) => {
        const precio = item.producto.precioOferta || item.producto.precioNormal;
        return acumulado + (precio * item.cantidad);
    }, 0);

    return (
        <div id="carrito" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Tu Carrito</h2>

            {items.length === 0 ? (
                <p className="text-center text-muted">Tu carrito está vacío.</p>
            ) : (
                <ul className="list-unstyled">
                    {items.map((item, index) => {
                        const precio = item.producto.precioOferta || item.producto.precioNormal;
                        const subtotal = precio * item.cantidad;
                        return (
                            <li key={index} className="d-flex justify-content-between align-items-center border-bottom py-3">
                                <div>
                                    <strong>{item.producto.nombre}</strong><br />
                                    <small>Precio unitario: ${precio} — Cantidad: {item.cantidad} — Subtotal: ${subtotal}</small>
                                </div>
                                <BotonAccion
                                    texto="Eliminar"
                                    onClick={() => onEliminar(item.producto.nombre)}
                                    className="btn btn-danger btn-sm"
                                />
                            </li>
                        );
                    })}
                </ul>
            )}

            <p className="text-end fs-4 mt-4"><strong>Total: ${total}</strong></p>

            {items.length > 0 && (
                <div className="text-center">
                    <BotonAccion texto="Vaciar Carrito" onClick={onVaciar} className="btn btn-outline-danger" />
                </div>
            )}
        </div>
    );
}

export default Carrito;