import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import BuscarProducto from './components/BuscarProducto';
import Footer from './components/Footer';
import ModalBienvenida from './components/ModalBienvenida';
import ModalProductoAgregado from './components/ModalProductoAgregado';
import ModalCompra from './components/ModalCompra';
import ModalCompraExitosa from './components/ModalCompraExitosa';
import FormumarioContacto from './components/FormularioContacto';

function App() {
  // Estado del catálogo completo de productos (se llena con el fetch)
  const [productos, setProductos] = useState([]);

  // Estado del carrito de compras: array de objetos {producto, cantidad}
  const [carrito, setCarrito] = useState([]);

  // Estado de error: guarda el mensaje si falla la carga del catálogo
  const [error, setError] = useState(null);

  // Estado modalProducto al agregar Producto al carrito
  const [modalProducto, setModalProducto] = useState(null);

  // Categoría elegida en el filtro ("todos" muestra el catálogo completo)
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Controla si se muestra el modal con el detalle de la compra
  const [mostrarCompra, setMostrarCompra] = useState(false);

  // Controla si se muestra el modal de compra realizada con éxito
  const [mostrarExito, setMostrarExito] = useState(false);

  // Carga el catálogo desde el JSON una sola vez, al montar el componente.
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response.status);
        }
        return response.json();
      })
      .then(data => setProductos(data))
      .catch(error => {
        console.error('Error al cargar productos:', error);
        setError('No se pudieron cargar los productos. Intenta más tarde.');
      });
  }, []);

  // Agrega un producto al carrito. Si el producto ya existe, suma la cantidad
  // en vez de crear una línea duplicada.
  function agregarAlCarrito(producto, cantidad) {
    const existe = carrito.find(item => item.producto.nombre === producto.nombre);

    if (existe) {
      const carritoActualizado = carrito.map(item =>
        item.producto.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { producto, cantidad }]);
    }

    setModalProducto(producto);
  }

  // Elimina del carrito el producto cuyo nombre coincide con nombreProducto.
  function eliminarDelCarrito(nombreProducto) {
    const carritoActualizado = carrito.filter(item => item.producto.nombre !== nombreProducto)
    setCarrito(carritoActualizado);
  }

  // Vacía el carrito por completo.
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Confirma la compra: cierra el detalle, vacía el carrito y muestra el modal de éxito.
  function confirmarCompra() {
    setMostrarCompra(false);
    setCarrito([]);
    setMostrarExito(true);
  }

  // Cantidad total de unidades en el carrito que se muestra en el Header.
  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Total a pagar: suma (precio × cantidad) de cada línea; lo usan el carrito y el modal de compra
  const totalCarrito = carrito.reduce((acumulado, item) => {
    const precio = item.producto.precioOferta || item.producto.precioNormal;
    return acumulado + (precio * item.cantidad);
  }, 0);

  // Productos que se muestran según la categoría elegida; "todos" no filtra nada
  const productosFiltrados = categoriaActiva === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <div>
      <ModalBienvenida />
      <header>
        <Header cantidadCarrito={cantidadCarrito} />
      </header>
      <main>
        <Hero />
        <ListaProductos
          productos={productosFiltrados}
          error={error}
          onAgregar={agregarAlCarrito}
          carrito={carrito}
          categoriaActiva={categoriaActiva}
          onCambiarCategoria={setCategoriaActiva}
        />
        <ModalProductoAgregado producto={modalProducto} onCerrar={() => setModalProducto(null)} />
        <BuscarProducto productos={productos} onAgregar={agregarAlCarrito} carrito={carrito} />
        <Carrito
          items={carrito}
          total={totalCarrito}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
          onFinalizar={() => setMostrarCompra(true)}
        />
        <FormumarioContacto />
      </main>

      {/* Modal de compra: solo se dibuja cuando mostrarCompra es true */}
      {mostrarCompra && (
        <ModalCompra
          items={carrito}
          total={totalCarrito}
          onConfirmar={confirmarCompra}
          onCerrar={() => setMostrarCompra(false)}
        />
      )}

      {/* Modal de compra exitosa: aparece después de confirmar la compra */}
      {mostrarExito && <ModalCompraExitosa onCerrar={() => setMostrarExito(false)} />}

      <Footer />
    </div>
  );
}

export default App;