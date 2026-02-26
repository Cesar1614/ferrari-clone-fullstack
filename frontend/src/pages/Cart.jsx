import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';
import { useEffect } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();

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
          move: { enable: true, speed: 1.2, random: true },
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
  }, []);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const items = cartItems.map(item => ({
        name: item.nombre,
        amount: Math.round(item.precio * 100),
        quantity: item.cantidad,
      }));
      const response = await api.post('/create-checkout-session', { items });
      if (response.data.url) window.location.href = response.data.url;
      else alert('No se pudo redirigir a Stripe.');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Error al iniciar el proceso de pago.');
    }
  };

  return (
    <div className="relative min-h-screen text-white px-4 pt-10">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>
      <div className="max-w-4xl mx-auto bg-black bg-opacity-40 p-6 rounded-xl border border-sky-500 shadow-lg">
        <h1 className="text-3xl font-bold text-sky-400 mb-6 text-center">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-blue-100">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-slate-900 p-3 rounded border border-blue-500">
                  <div>
                    <p className="font-semibold text-cyan-300">{item.nombre}</p>
                    <p className="text-sm text-blue-200">{item.tipo || (item.es_deportivo ? 'Deportivo' : 'Carro')}</p>
                    <p className="text-blue-100">{formatPrice(item.precio)} x {item.cantidad}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.tipo || 'car')}
                    className="text-red-400 hover:text-red-600 font-semibold"
                  >
                    Eliminar
                  </button>
              </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-sky-300">Total: {formatPrice(getTotal())}</p>
              <button
                onClick={clearCart}
                className="mt-2 bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded mr-2"
              >
                Vaciar
              </button>
              <button
                onClick={handleCheckout}
                className="bg-cyan-500 text-black font-semibold px-6 py-2 rounded hover:bg-cyan-400 mt-2"
              >
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;





