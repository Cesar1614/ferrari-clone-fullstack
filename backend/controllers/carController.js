const { Car } = require('../models');

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carros' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car) return res.status(404).json({ msg: 'Carro no encontrado' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carro' });
  }
};

exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carro' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    await Car.update(req.body, { where: { id } });
    res.json({ msg: 'Carro actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carro' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await Car.destroy({ where: { id } });
    res.json({ msg: 'Carro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carro' });
  }
};
