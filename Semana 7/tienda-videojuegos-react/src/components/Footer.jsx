import { useState } from 'react';

function Footer() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [emailSuscrito, setEmailSuscrito] = useState('');

    function manejarSubmit(evento) {
        evento.preventDefault();
        const email = evento.target.elements.email.value;
        setEmailSuscrito(email);
        setMostrarModal(true);
        evento.target.reset();
    }

    return (
        <footer className="text-white pt-5 pb-2 footer-custom">
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3 my-3">
                        <a href="#" className="text-white contact-link">
                            <h5>Contacto</h5>
                        </a>
                        <address>
                            <p>Dirección: Avenida Central 456, Ciudad, País</p>
                            <p>Teléfono: +123 456 789</p>
                        </address>
                    </div>

                    <div className="col-md-3 my-3">
                        <h5>Enlaces</h5>
                        <ul className="list-unstyled">
                            <li><a href="#inicio" className="text-white">Inicio</a></li>
                            <li><a href="#productos" className="text-white">Productos</a></li>
                            <li><a href="#buscar" className="text-white">Buscar</a></li>
                            <li><a href="#carrito" className="text-white">Carrito</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 my-3">
                        <h5>Síguenos</h5>
                        <div className="social-links">
                            <a href="#"><img src="/img/recursos/instagram.png" alt="Instagram" /></a>
                            <a href="#"><img src="/img/recursos/whatsapp.png" alt="WhatsApp" /></a>
                        </div>
                    </div>

                    <div className="col-md-3 my-3">
                        <h5>Newsletter</h5>
                        <form onSubmit={manejarSubmit}>
                            <input
                                type="email"
                                name="email"
                                className="form-control mb-2"
                                placeholder="Tu correo electrónico"
                                required
                            />
                            <button type="submit" className="btn btn-primary">Suscribirse</button>
                        </form>
                    </div>
                </div>
            </div>

            {mostrarModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-dark">
                            <div className="modal-header">
                                <h5 className="modal-title">Gracias por suscribirte 🎉</h5>
                                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <p>Te has suscrito con el correo: <strong>{emailSuscrito}</strong></p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;