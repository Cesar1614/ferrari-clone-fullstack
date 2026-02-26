import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { toast, ToastContainer } from 'react-toastify';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data);
    };

    const fetchRelated = async () => {
      const res = await api.get('/cars');
      setRelated(res.data.filter(c => c.id !== parseInt(id)));
    };

    fetchCar();
    fetchRelated();
  }, [id]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleAddToCart = () => {
    addToCart({ ...car, tipo: 'car' });
    toast.success('🚗 Carro agregado al carrito', {
      position: 'top-right',
      autoClose: 2500,
      theme: 'dark',
    });
  };

  if (!car) return <p className="text-white text-center mt-10">Cargando...</p>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo con partículas */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            color: { value: '#00ffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: '#00ffff', opacity: 0.2 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <motion.div
          className="mb-16 grid md:grid-cols-2 gap-10 bg-black bg-opacity-40 border border-cyan-400/30 rounded-2xl p-6 shadow-xl backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={car.imagen_url}
            alt={car.nombre}
            className="w-full max-h-[500px] object-cover rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold text-cyan-400">{car.nombre}</h2>
            <p className="mt-4 text-gray-300">{car.descripcion}</p>
            <p className="mt-6 text-2xl font-bold text-cyan-300">
              ${Number(car.precio).toLocaleString()}
            </p>
            <button
              className="mt-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-black font-semibold shadow-md"
              onClick={handleAddToCart}
            >
              🚗 Agregar al carrito
            </button>
            <button
              onClick={() => navigate('/racing')}
              className="ml-4 mt-4 text-sm text-cyan-300 hover:underline"
            >
              ⬅ Volver a Modelos
            </button>
          </div>
        </motion.div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Otros modelos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((c) => (
              <motion.div
                key={c.id}
                className="bg-black bg-opacity-30 border border-cyan-500 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-600/50 transition"
                whileHover={{ scale: 1.03 }}
              >
                <img src={c.imagen_url} alt={c.nombre} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-cyan-300 font-semibold">{c.nombre}</h4>
                  <p className="text-cyan-400">${Number(c.precio).toLocaleString()}</p>
                  <button
                    className="mt-2 text-sm text-cyan-300 hover:underline"
                    onClick={() => navigate(`/car/${c.id}`)}
                  >
                    Ver detalle
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default CarDetail;


