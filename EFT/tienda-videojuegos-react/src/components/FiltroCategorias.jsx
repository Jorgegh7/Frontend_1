import BotonAccion from "./BotonAccion";

const CATEGORIAS = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'videojuegos', etiqueta: 'Videojuegos' },
    { valor: 'consolas', etiqueta: 'Consolas' },
    { valor: 'accesorios', etiqueta: 'Accesorios' },
];

function FiltroCategoria({ categoriaActiva, onCambiar }) {

    return (
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {CATEGORIAS.map((categoria) => (
                <BotonAccion
                    key={categoria.valor}
                    texto={categoria.etiqueta}
                    onClick={() => onCambiar(categoria.valor)}
                    className={categoriaActiva === categoria.valor ? "btn btn-primary" : "btn btn-outline-primary"}
                />
            ))}

        </div>
    );

}

export default FiltroCategoria;  