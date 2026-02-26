import { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const [clothes, setClothes] = useState([]);
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothes = async () => {
      const res = await api.get('/clothes');
      setClothes(res.data);
    };
    fetchClothes();

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsp-collections', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 40 },
          color: { value: "#facc15" },
          shape: { type: "circle" },
          size: { value: 2.5 },
          move: { enable: true, speed: 1.5, random: true },
          links: {
            enable: true,
            distance: 130,
            color: "#facc15",
            opacity: 0.3,
            width: 1,
          }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" }
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

  const handleAddToCart = (item) => {
    addToCart({ ...item, tipo: 'clothing' });
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  return (
    <div className="relative min-h-screen px-4 py-12 text-white overflow-hidden">
      <div id="tsp-collections" className="absolute inset-0 -z-10"></div>

      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Colecciones Ferrari
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clothes.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="bg-black bg-opacity-30 border border-yellow-400 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={item.imagen_url}
              alt={item.nombre}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/clothing/${item.id}`)}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-yellow-300">{item.nombre}</h3>
              <p className="text-gray-300">{item.tipo}</p>
              <p className="text-yellow-400 font-bold">
                ${Number(item.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>

              <button
                onClick={() => handleAddToCart(item)}
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-2 rounded transition"
              >
                Agregar al carrito
              </button>

              {addedItemId === item.id && (
                <p className="mt-2 text-green-400 text-sm text-center animate-pulse">
                  ✅ Agregado correctamente
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;




