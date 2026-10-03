function ModalProductoAgregado({ producto, onCerrar }) {
    if (!producto) {
        return null;
    }

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Producto agregado al carrito</h5>
                        <button type="button" className="btn-close" onClick={onCerrar}></button>
                    </div>
                    <div className="modal-body text-center">
                        <img
                            src={`${import.meta.env.BASE_URL}${producto.imagen}`}
                            alt={producto.nombre}
                            className="img-fluid mb-3"
                            style={{ maxHeight: '180px' }}
                        />
                        <h6>{producto.nombre}</h6>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={onCerrar}>Seguir comprando</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalProductoAgregado;