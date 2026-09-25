// BotonLink.jsx para navegación
function BotonLink({ texto, href }) {
    return (
        <a href={href} className="btn btn-primary">
            {texto}
        </a>
    );
}

export default BotonLink;