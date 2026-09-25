import { useState } from 'react';

function ModalBienvenida() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
        return null;
    }

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¡Se viene el Cyberday! 🔥</h5>
                        <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
                    </div>
                    <div className="modal-body text-center">
                        <img src="/img/recursos/cyberday.png" className="img-fluid" alt="Oferta Cyberday - Hasta 60% OFF" />
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-primary" onClick={() => setVisible(false)}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalBienvenida;