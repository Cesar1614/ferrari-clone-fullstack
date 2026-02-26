const express = require('express');
const router = express.Router();
const { handleQuestion } = require('../controllers/chatbotController');

router.post('/preguntar', handleQuestion);

module.exports = router;
