const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.crearSesionPago = async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
});


    // Guardar orden en base de datos
    await Order.create({
      productos: items,
      total: items.reduce((acc, item) => acc + (item.amount / 100) * item.quantity, 0),
      stripeSessionId: session.id,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error);
    res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
  }
};
