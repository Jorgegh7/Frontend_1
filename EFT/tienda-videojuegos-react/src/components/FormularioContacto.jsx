import { useState } from 'react';

function FormumarioContacto() {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [mostrarModal, setMostrarModal] = useState('');
    const [nombreEnviado, setNombreEnviado] = useState(false);

    const [errores, setErrores] = useState([]);

    // Verifica un formulario valido: Nombre,Correo,Mensaje
    function validar() {
        const nuevosErrores = {};

        if (nombre.trim() === "") {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }
        if (email.trim() === "") {
            nuevosErrores.email = 'El email es obligatorio';
        } else if (!email.includes('@') || (!email.includes('.'))) {
            nuevosErrores.email = 'Ingresa un mail válido. (Ej: nombre@correo.com)'
        }

        if (mensaje.trim().length < 10) {
            nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
        }

        return nuevosErrores;
    }

    //Frena que se recargue la pagina
    // Valida los campos con validar() si no hay errores abre el modal de confirmacion
    // vacia el formulario 
    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = validar();
        setErrores(nuevosErrores);

        // Si no hay errores, el formulario es válido (el modal viene en el siguiente paso)
        if (Object.keys(nuevosErrores).length === 0) {
            console.log('Formulario válido:', { nombre, email, mensaje });
        }

        if (Object.keys(nuevosErrores).length === 0) {
            setNombreEnviado(nombre);
            setMostrarModal(true);
            setEmail('');
            setMensaje('');
            setNombre('');
        }
    }

    return (
        <section id="contacto" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4"> Contacto</h2>

            <form onSubmit={manejarEnvio} className="mx-auto w-100 col-md-8 col-lg-6" >

                {/*Nombre*/}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        className={errores.nombre ? "form-control is-invalid" : "form-control"}
                        value={nombre}
                        onChange={(evento) => setNombre(evento.target.value)}
                    />
                    {/*Muestra un feedback invalido al usuario*/}
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                {/*Email*/}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={errores.email ? "form-control is-invalid" : "form-control"}
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                    />
                    {/*Muestra un feedback invalido al usuario*/}
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}

                </div>

                {/*Mensaje*/}
                <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea
                        id="mensaje"
                        rows="4"
                        className={errores.mensaje ? "form-control is-invalid" : "form-control"}
                        value={mensaje}
                        onChange={(evento) => setMensaje(evento.target.value)}
                    ></textarea>
                    {/*Muestra un feedback invalido al usuario*/}
                    {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}

                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

            {/* Modal de confirmación: solo se dibuja cuando mostrarModal es true */}
            {mostrarModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Mensaje Enviado</h5>
                                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                            </div>

                            <div className="modal-body text-center">
                                <p>Gracias por escribirnos, <strong>{nombreEnviado}</strong>. Te responderemos pronto.</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setMostrarModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section >

    );
}

export default FormumarioContacto; 