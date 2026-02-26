import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { toast, ToastContainer } from 'react-toastify';

const ClothesDetail = () => {
  const { id } = useParams();
  const [clothing, setClothing] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const res = await api.get(`/clothes/${id}`);
        setClothing(res.data);
      } catch (error) {
        console.error('Error al cargar prenda:', error);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await api.get('/clothes');
        setRelated(res.data.filter(c => c.id !== parseInt(id)));
      } catch (error) {
        console.error('Error al cargar relacionadas:', error);
      }
    };

    fetchClothing();
    fetchRelated();
  }, [id]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleAddToCart = () => {
    addToCart({ ...clothing, tipo: 'clothing' });
    toast.success('👕 Prenda agregada al carrito', {
      position: 'top-right',
      autoClose: 2500,
      theme: 'dark',
    });
  };

  if (!clothing) return <p className="text-white text-center mt-10">Cargando prenda...</p>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo con partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            color: { value: '#facc15' },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: '#facc15', opacity: 0.2 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <motion.div
          className="mb-16 grid md:grid-cols-2 gap-10 bg-black bg-opacity-40 border border-yellow-400/30 rounded-2xl p-6 shadow-xl backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={clothing.imagen_url}
            alt={clothing.nombre}
            className="w-full max-h-[500px] object-cover rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold text-yellow-400">{clothing.nombre}</h2>
            <p className="mt-4 text-gray-300">{clothing.tipo}</p>
            <p className="mt-4 text-gray-300">{clothing.descripcion}</p>
            <p className="mt-6 text-2xl font-bold text-yellow-300">
              ${Number(clothing.precio).toLocaleString()}
            </p>
            <button
              className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold shadow-md"
              onClick={handleAddToCart}
            >
              👕 Agregar al carrito
            </button>
            <button
              onClick={() => navigate('/collections')}
              className="ml-4 mt-4 text-sm text-yellow-300 hover:underline"
            >
              ⬅ Volver a Colecciones
            </button>
          </div>
        </motion.div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Otras prendas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((c) => (
              <motion.div
                key={c.id}
                className="bg-black bg-opacity-30 border border-yellow-400 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/50 transition"
                whileHover={{ scale: 1.03 }}
              >
                <img src={c.imagen_url} alt={c.nombre} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-yellow-300 font-semibold">{c.nombre}</h4>
                  <p className="text-yellow-400">
                    ${Number(c.precio).toLocaleString()}
                  </p>
                  <button
                    className="mt-2 text-sm text-yellow-300 hover:underline"
                    onClick={() => navigate(`/clothing/${c.id}`)}
                  >
                    Ver detalle
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ClothesDetail;





