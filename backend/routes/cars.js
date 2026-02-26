const express = require('express');
const router = express.Router();
const controller = require('../controllers/carController');

router.get('/', controller.getCars);
router.get('/:id', controller.getCarById); // <--- Esta es la nueva ruta
router.post('/', controller.createCar);
router.put('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

module.exports = router;
