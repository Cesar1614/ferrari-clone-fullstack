import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cartItems, getTotal } = useCart();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processPayment = async () => {
      const stripe = await stripePromise;

      try {
        const res = await api.post('/stripe/create-checkout-session', {
          items: cartItems.map(item => ({
            name: item.nombre,
            amount: item.precio * 100, // Stripe usa centavos
            quantity: item.cantidad,
          })),
        });

        const result = await stripe.redirectToCheckout({ sessionId: res.data.id });

        if (result.error) {
          setError(result.error.message);
        }
      } catch (err) {
        console.error('Error al iniciar Stripe:', err);
        setError('No se pudo iniciar el proceso de pago.');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, []);

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  return (
    <div className="text-center mt-20">
      {loading ? (
        <p className="text-lg text-gray-700">Redireccionando a Stripe...</p>
      ) : (
        <p className="text-lg text-gray-700">Preparando el pago...</p>
      )}
    </div>
  );
};

export default Checkout;
