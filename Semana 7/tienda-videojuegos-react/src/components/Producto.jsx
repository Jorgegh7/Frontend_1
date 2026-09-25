import { useState } from 'react';
import BotonAccion from './BotonAccion';

function Producto({ producto, onAgregar }) {
    const [cantidad, setCantidad] = useState(1);

    function manejarAgregar() {
        onAgregar(producto, cantidad);
    }

    return (
        <div className="card h-100">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="card-img-top"
                style={{ height: '330px', objectFit: 'cover' }}
            />
            <div className="card-body text-center p-3">
                <h6 className="card-title mb-1" style={{ fontSize: '14px' }}>{producto.nombre}</h6>
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
                <BotonAccion texto="Agregar al Carrito" onClick={manejarAgregar} className="btn btn-primary btn-sm" />
            </div>
        </div>
    );
}

export default Producto;