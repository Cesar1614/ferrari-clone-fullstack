import { useEffect, useState } from 'react';
import api from '../services/api';

const HistorialCompras = () => {
  const [orders, setOrders] = useState([]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('es-PA', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsparticles', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 60 },
          color: { value: "#38bdf8" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { enable: true, speed: 1.5, random: true },
          links: {
            enable: true,
            distance: 130,
            color: "#38bdf8",
            opacity: 0.3,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
          },
        },
        detectRetina: true,
      });
    };
    document.body.appendChild(script);

    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="relative min-h-screen px-4 pt-10 text-white">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>
      <div className="max-w-4xl mx-auto bg-black bg-opacity-40 p-6 rounded-xl border border-cyan-500">
        <h2 className="text-3xl font-bold mb-6 text-cyan-300 text-center">Historial de Compras</h2>

        {orders.length === 0 ? (
          <p className="text-center text-blue-200">No hay compras registradas.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="bg-slate-900 border border-blue-500 p-4 rounded shadow-md text-blue-100">
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> {formatPrice(order.total)}</p>
                <p><strong>Estado de pago:</strong> {order.estado_pago}</p>
                <div className="mt-2">
                  <strong>Productos:</strong>
                  <ul className="ml-4 list-disc">
                    {order.productos.map((prod, idx) => (
                      <li key={idx}>
                        {prod.name} - {prod.quantity} x {formatPrice(prod.amount / 100)}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistorialCompras;



