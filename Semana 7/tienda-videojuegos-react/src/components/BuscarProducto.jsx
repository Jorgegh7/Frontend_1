import { useState } from 'react';
import Producto from './Producto';
import BotonAccion from './BotonAccion';

function BuscarProducto({ productos, onAgregar }) {
    const [termino, setTermino] = useState('');

    const resultados = termino === ''
        ? []
        : productos.filter(p => p.nombre.toLowerCase().includes(termino.toLowerCase()));

    function limpiarBusqueda() {
        setTermino('');
    }

    return (
        <div id="buscar" className="container my-5 p-5 rounded shadow bg-light">
            <h2 className="fw-bold text-center mb-4">Buscar Productos</h2>

            <div className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={termino}
                    onChange={(evento) => setTermino(evento.target.value)}
                    className="form-control w-50 me-2"
                />
                <BotonAccion texto="Limpiar" onClick={limpiarBusqueda} className="btn btn-outline-secondary" />
            </div>

            {termino !== '' && (
                <div className="row g-4">
                    {resultados.length === 0 ? (
                        <p className="text-center w-100 text-muted">
                            No se encontraron productos que coincidan con "{termino}".
                        </p>
                    ) : (
                        resultados.map((producto) => (
                            <div className="col-md-6 col-lg-4" key={producto.nombre}>
                                <Producto producto={producto} onAgregar={onAgregar} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default BuscarProducto;