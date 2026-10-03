// Modal que muestra el detalle de la compra: cada producto con su subtotal y el total.
// Recibe el carrito, el total y dos funciones: confirmar la compra o cerrar el modal.
function ModalCompra({ items, total, onConfirmar, onCerrar }) {
    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalle de tu compra</h5>
                        <button type="button" className="btn-close" onClick={onCerrar}></button>
                    </div>

                    <div className="modal-body">
                        <ul className="list-unstyled mb-0">
                            {items.map((item) => {
                                // Usa el precio de oferta si existe, y si no, el normal
                                const precio = item.producto.precioOferta || item.producto.precioNormal;
                                return (
                                    <li key={item.producto.nombre} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={`${import.meta.env.BASE_URL}${item.producto.imagen}`}
                                                alt={item.producto.nombre}
                                                className="rounded me-3"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                            <span>{item.producto.nombre} <small className="text-muted">× {item.cantidad}</small></span>
                                        </div>
                                        <strong>${precio * item.cantidad}</strong>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="text-end fs-5 mt-3 mb-0">Total: <strong>${total}</strong></p>
                    </div>

                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-outline-secondary" onClick={onCerrar}>Volver</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirmar}>Confirmar compra</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCompra;