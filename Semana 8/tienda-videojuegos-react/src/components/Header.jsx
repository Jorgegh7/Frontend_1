import { useState } from 'react';

function Header({ cantidadCarrito }) {
    // Controla si el menú hamburguesa está abierto (solo se ve en pantallas chicas)
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Cierra el menú al hacer click en un link, para que no quede tapando la página
    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <a className="navbar-brand" href="#inicio" onClick={cerrarMenu}>
                    <img
                        className="logo"
                        src={`${import.meta.env.BASE_URL}img/logo2.png`}
                        alt="Logo CriticalHit Games"
                    />
                    CriticalHit Games
                </a>

                {/* Botón hamburguesa: Bootstrap lo oculta solo en pantallas grandes */}
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Con "show" el menú se ve; sin "show", Bootstrap lo oculta en mobile */}
                <div className={menuAbierto ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                    <div className="navbar-nav ms-auto">
                        <a className="nav-link me-lg-3" href="#inicio" onClick={cerrarMenu}>Inicio</a>
                        <a className="nav-link me-lg-3" href="#productos" onClick={cerrarMenu}>Productos</a>
                        <a className="nav-link me-lg-3" href="#buscar" onClick={cerrarMenu}>Buscar</a>
                        <a className="nav-link me-lg-3" href="#carrito" onClick={cerrarMenu}>Carrito</a>
                        {/* El ícono con el contador ahora es un link que lleva a la sección del carrito */}
                        <a className="nav-link" href="#carrito" onClick={cerrarMenu} aria-label="Ir al carrito">
                            🛒 {cantidadCarrito}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;