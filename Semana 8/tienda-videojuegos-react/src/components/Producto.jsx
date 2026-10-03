import { useState } from 'react';
import BotonAccion from './BotonAccion';

function Producto({ producto, onAgregar, carrito }) {
    const [cantidad, setCantidad] = useState(1);
    const [hover, setHover] = useState(false);

    // Verifica si este producto ya tiene al menos una línea en el carrito
    const enElCarrito = carrito.some(item => item.producto.nombre === producto.nombre);

    function manejarAgregar() {
        onAgregar(producto, cantidad);
    }

    return (
        <div className="card h-100">
            {/* El padding del contenedor separa la imagen de los bordes de la card */}
            <div className="p-3 pb-0">
                <img
                    src={`${import.meta.env.BASE_URL}${producto.imagen}`}
                    alt={producto.nombre}
                    className="rounded"
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
            </div>
            <div className="card-body text-center p-3">
                <h6 className="card-title fw-bold mb-1" style={{ fontSize: '14px' }}>{producto.nombre}</h6>
                <p className="card-text text-muted mb-2" style={{ fontSize: '12px' }}>{producto.descripcion}</p>

                {producto.precioOferta ? (
                    <div className="mb-2">
                        <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '13px' }}>
                            ${producto.precioNormal}
                        </span>
                        <span className="fw-bold" style={{ fontSize: '15px' }}>${producto.precioOferta}</span>
                    </div>
                ) : (
                    <p className="fw-bold mb-2" style={{ fontSize: '15px' }}>${producto.precioNormal}</p>
                )}

                <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(evento) => setCantidad(Number(evento.target.value))}
                    className="form-control form-control-sm mb-2 w-50 mx-auto"
                />
                <BotonAccion
                    texto={enElCarrito ? (hover ? "Agregar de Nuevo" : "En el Carrito ✓") : "Agregar al Carrito"}
                    onClick={manejarAgregar}
                    className={enElCarrito ? (hover ? "btn btn-primary btn-sm" : "btn btn-success btn-sm") : "btn btn-primary btn-sm"}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
            </div>
        </div>
    );
}

export default Producto;