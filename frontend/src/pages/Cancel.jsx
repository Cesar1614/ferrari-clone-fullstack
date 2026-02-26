import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const Cancel = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      // Llama al backend para actualizar el estado a "rechazado"
      api.post('/orders/update-payment-status', {
        session_id: sessionId,
        status: 'rechazado',
      })
      .then(() => console.log('🛑 Estado actualizado a rechazado'))
      .catch(err => console.error('❌ Error al actualizar estado:', err));
    }
  }, [sessionId]);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div id="tsp-cancel" className="absolute inset-0 -z-10"></div>

      <motion.div
        className="bg-black bg-opacity-50 border border-red-500 p-10 rounded-xl text-center shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-red-400 mb-4">❌ Pago cancelado</h1>
        <p className="text-lg mb-6 text-red-200">Tu compra ha sido cancelada.</p>

        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-black font-semibold px-6 py-2 rounded transition"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
};

export default Cancel;
