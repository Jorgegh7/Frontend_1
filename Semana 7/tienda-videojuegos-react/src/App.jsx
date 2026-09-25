import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ListaProductos from './components/ListaProductos';
import Carrito from './components/Carrito';
import BuscarProducto from './components/BuscarProducto';
import Footer from './components/Footer';
import ModalBienvenida from './components/ModalBienvenida';

function App() {
  // Estado del catálogo completo de productos (se llena con el fetch)
  const [productos, setProductos] = useState([]);

  // Estado del carrito de compras: array de objetos {producto, cantidad}
  const [carrito, setCarrito] = useState([]);

  // Carga el catálogo desde el JSON una sola vez, al montar el componente.
  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => {

        // Verificación explícita del estado HTTP antes de intentar parsear el JSON,
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response.status);
        }
        return response.json();
      })
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));
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

  // Cantidad total de unidades en el carrito que se muestra en el Header. 
  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div>
      <ModalBienvenida />
      <Header cantidadCarrito={cantidadCarrito} />
      <Hero />
      <ListaProductos productos={productos} onAgregar={agregarAlCarrito} />
      <BuscarProducto productos={productos} onAgregar={agregarAlCarrito} />
      <Carrito items={carrito} onEliminar={eliminarDelCarrito} onVaciar={vaciarCarrito} />
      <Footer />
    </div>
  );
}

export default App;