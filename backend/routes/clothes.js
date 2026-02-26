const express = require('express');
const router = express.Router();
const controller = require('../controllers/clothingController');

router.get('/', controller.getClothes);
router.post('/', controller.createClothing);
router.get('/:id', controller.getClothingById);
router.put('/:id', controller.updateClothing);
router.delete('/:id', controller.deleteClothing);

module.exports = router;
