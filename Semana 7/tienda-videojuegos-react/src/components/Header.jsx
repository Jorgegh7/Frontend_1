function Header({ cantidadCarrito }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img className="logo" src={`${import.meta.env.BASE_URL}img/logo2.png`} alt="Logo CriticalHit Games" />
                    CriticalHit Games
                </a>

                <div className="navbar-nav ms-auto d-flex flex-row">
                    <a className="nav-link me-3" href="#inicio">Inicio</a>
                    <a className="nav-link me-3" href="#productos">Productos</a>
                    <a className="nav-link me-3" href="#buscar">Buscar</a>
                    <a className="nav-link me-3" href="#carrito">Carrito</a>
                    <span className="nav-link">🛒 {cantidadCarrito}</span>
                </div>
            </div>
        </nav>
    );
}

export default Header;