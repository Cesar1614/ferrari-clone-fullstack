import { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Racing = () => {
  const [cars, setCars] = useState([]);
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/cars');
        setCars(res.data);
      } catch (error) {
        console.error('Error al obtener los carros:', error);
      }
    };

    fetchCars();

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsp-racing', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 40 },
          color: { value: "#06b6d4" },
          shape: { type: "circle" },
          opacity: { value: 0.4 },
          size: { value: 2.5 },
          move: { enable: true, speed: 1.5, random: true },
          links: { enable: true, distance: 120, color: "#06b6d4", opacity: 0.2 }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        detectRetina: true
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleAddToCart = (car) => {
    addToCart({ ...car, tipo: 'car' });
    setAddedItemId(car.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  return (
    <div className="relative min-h-screen px-4 py-12 text-white overflow-hidden">
      <div id="tsp-racing" className="absolute inset-0 -z-10"></div>
      <motion.h1
        className="text-4xl text-cyan-400 font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
      >
        Modelos Disponibles
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.length > 0 ? (
          cars.map((car) => (
            <motion.div
              key={car.id}
              whileHover={{ scale: 1.05 }}
              className="bg-black bg-opacity-30 border border-cyan-400 rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={car.imagen_url}
                alt={car.nombre}
                className="h-48 w-full object-cover cursor-pointer"
                onClick={() => window.location.href = `/car/${car.id}`}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-cyan-300">{car.nombre}</h3>
                <p className="text-gray-300 text-sm">{car.descripcion}</p>
                <p className="text-cyan-400 font-bold mt-2">
                  ${Number(car.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <button
                  onClick={() => handleAddToCart(car)}
                  className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-black py-2 rounded transition"
                >
                  Agregar al carrito
                </button>
                {addedItemId === car.id && (
                  <p className="mt-2 text-green-400 text-sm text-center animate-pulse">✅ Agregado correctamente</p>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No hay carros registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Racing;












