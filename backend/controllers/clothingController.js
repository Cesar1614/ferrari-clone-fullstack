const { Clothing } = require('../models');

exports.getClothes = async (req, res) => {
  const clothes = await Clothing.findAll();
  res.json(clothes);
};

exports.createClothing = async (req, res) => {
  const clothing = await Clothing.create(req.body);
  res.json(clothing);
};

exports.updateClothing = async (req, res) => {
  const { id } = req.params;
  await Clothing.update(req.body, { where: { id } });
  res.json({ msg: 'Prenda actualizada' });
};

exports.deleteClothing = async (req, res) => {
  const { id } = req.params;
  await Clothing.destroy({ where: { id } });
  res.json({ msg: 'Prenda eliminada' });
};

exports.getClothingById = async (req, res) => {
  const { id } = req.params;
  try {
    const clothing = await Clothing.findByPk(id);
    if (!clothing) {
      return res.status(404).json({ error: 'Prenda no encontrada' });
    }
    res.json(clothing);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la prenda' });
  }
};

