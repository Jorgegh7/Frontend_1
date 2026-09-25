import BotonLink from './BotonLink';

function Hero() {
    return (
        <div id="inicio" className="container my-5 p-5 rounded shadow hero-custom">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h1 className="fw-bold display-4">Tu próxima aventura comienza AQUÍ!</h1>
                    <p>Descubre videojuegos, consolas y ofertas para disfrutar tus juegos favoritos.</p>
                    <BotonLink texto="Ver videojuegos" href="#productos" />
                </div>
                <div className="col-lg-6">
                    <img src="/img/recursos/game-boy.png" alt="Game-Boy image" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default Hero;