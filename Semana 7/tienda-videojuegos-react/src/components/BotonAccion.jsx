// BotonAccion.jsx - para acciones (agregar, eliminar, etc.)
function BotonAccion({ texto, onClick, className = "btn btn-primary" }) {
    return (
        <button className={className} onClick={onClick}>
            {texto}
        </button>
    );
}

export default BotonAccion; 