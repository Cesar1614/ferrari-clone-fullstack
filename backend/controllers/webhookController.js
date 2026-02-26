const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.manejarWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let evento;

  try {
    evento = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Error validando firma:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (evento.type === 'checkout.session.completed') {
    const session = evento.data.object;

    try {
      const orden = await Order.findOne({ where: { stripeSessionId: session.id } });
      if (orden) {
        orden.estado_pago = 'pagado';
        orden.email = session.customer_details?.email || null;
        await orden.save();
        console.log('✅ Orden actualizada a pagado');
      } else {
        console.warn('⚠️ Orden no encontrada para la sesión:', session.id);
      }
    } catch (err) {
      console.error('❌ Error actualizando orden:', err);
    }
  }

  res.status(200).send('Evento recibido');
};
