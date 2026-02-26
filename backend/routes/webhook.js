const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Order = require('../models/Order');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware para leer el cuerpo sin procesar
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Procesar el evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const order = await Order.findOne({ where: { stripeSessionId: session.id } });
      if (order) {
        order.estado_pago = 'aprobado';
        await order.save();
        console.log('✅ Orden actualizada como aprobada');
      }
    } catch (err) {
      console.error('Error actualizando orden:', err.message);
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
