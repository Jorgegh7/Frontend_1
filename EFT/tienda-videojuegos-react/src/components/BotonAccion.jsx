// BotonAccion.jsx - para acciones (agregar, eliminar, etc.)
function BotonAccion({ texto, onClick, className = "btn btn-primary", onMouseEnter, onMouseLeave }) {
    return (
        <button
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {texto}
        </button>
    );
}

export default BotonAccion;