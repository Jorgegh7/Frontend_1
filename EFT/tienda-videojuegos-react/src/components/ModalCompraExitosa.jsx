// Modal que confirma que la compra se realizó con éxito (la compra es simulada).
// Solo recibe una función para cerrarse; no necesita más datos.
function ModalCompraExitosa({ onCerrar }) {
    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¡Compra realizada!</h5>
                        <button type="button" className="btn-close" onClick={onCerrar}></button>
                    </div>
                    <div className="modal-body text-center">
                        <p className="fs-1 mb-2">✅</p>
                        <p className="mb-0">Tu compra se finalizó con éxito. ¡Gracias por elegir CriticalHit Games!</p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={onCerrar}>Seguir comprando</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCompraExitosa;