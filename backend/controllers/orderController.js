const { Order } = require('../models');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    console.error('❌ Error al crear orden:', error);
    res.status(500).json({ error: 'Error al crear orden' });
  }
};

// 🔁 NUEVO: Actualizar estado de pago
exports.actualizarEstadoPago = async (req, res) => {
  try {
    const { session_id } = req.body;

    const order = await Order.findOne({ where: { stripeSessionId: session_id } });

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    order.estado_pago = 'aprobado';
    await order.save();

    res.json({ message: 'Estado de pago actualizado a aprobado ✅' });
  } catch (error) {
    console.error('❌ Error al actualizar estado de pago:', error);
    res.status(500).json({ error: 'Error al actualizar estado de pago' });
  }
};
