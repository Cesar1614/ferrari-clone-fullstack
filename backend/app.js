const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');
const pagosRoutes = require('./routes/pagos');
const webhookRoutes = require('./routes/webhook');


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/cars', require('./routes/cars'));
app.use('/api/clothes', require('./routes/clothes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api', pagosRoutes);
app.use('/stripe/webhook', express.raw({ type: 'application/json' }));
app.use('/stripe', require('./routes/webhook')); 
app.use('/webhook', webhookRoutes);
app.use(bodyParser.json());
app.use('/api/chatbot', require('./routes/chatbot'));


// Conexión a DB y servidor
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos conectada ✅');
  app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
  });
});
