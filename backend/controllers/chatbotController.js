// ✅ backend/controllers/chatbotController.js
const { Car, Clothes, Order } = require('../models');

exports.handleQuestion = async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ answer: 'Pregunta no recibida.' });

  const lower = question.toLowerCase();

  try {
    // 🚗 Preguntas sobre carros
    if (lower.includes('carros') || lower.includes('carro') || lower.includes('autos')) {
      const cars = await Car.findAll();
      if (cars.length === 0) return res.json({ answer: 'No hay carros disponibles en este momento.' });
      return res.json({ answer: `Tenemos disponibles: ${cars.map(c => c.nombre + ' ($' + c.precio + ')').join(', ')}` });
    }

    // 👕 Preguntas sobre ropa
    if (lower.includes('ropa') || lower.includes('camisa') || lower.includes('prenda') || lower.includes('coleccion')) {
      const clothes = await Clothes.findAll();
      if (clothes.length === 0) return res.json({ answer: 'No hay prendas disponibles en la boutique.' });
      return res.json({ answer: `Tenemos disponibles: ${clothes.map(p => p.nombre + ' ($' + p.precio + ')').join(', ')}` });
    }

    // 💵 Preguntas sobre precios
    if (lower.includes('precio')) {
      return res.json({ answer: 'Puedes ver los precios directamente en las secciones de Racing y Boutique.' });
    }

    // 📦 Historial de compras
    if (lower.includes('compras') || lower.includes('ordenes') || lower.includes('historial')) {
      const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
      if (orders.length === 0) return res.json({ answer: 'No tienes compras registradas aún.' });
      return res.json({ answer: `Tienes ${orders.length} orden(es). Última orden: $${orders[0].total} - estado: ${orders[0].estado_pago}` });
    }

    // 🧠 Pregunta genérica
    return res.json({ answer: 'No estoy seguro de cómo ayudarte con eso. Puedes preguntarme por carros, ropa, compras o precios.' });
  } catch (error) {
    console.error('❌ Error en chatbot:', error);
    return res.status(500).json({ answer: 'Ocurrió un error al procesar la pregunta.' });
  }
};

