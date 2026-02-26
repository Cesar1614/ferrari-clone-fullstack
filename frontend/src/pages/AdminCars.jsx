import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [carForm, setCarForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    es_deportivo: false,
  });
  const [editCarId, setEditCarId] = useState(null);

  const [clothes, setClothes] = useState([]);
  const [clothesForm, setClothesForm] = useState({
    nombre: '',
    tipo: '',
    precio: '',
    imagen_url: '',
  });
  const [editClothesId, setEditClothesId] = useState(null);

  useEffect(() => {
    fetchCars();
    fetchClothes();
  }, []);

  const fetchCars = async () => {
    const res = await api.get('/cars');
    setCars(res.data);
  };

  const fetchClothes = async () => {
    const res = await api.get('/clothes');
    setClothes(res.data);
  };

  const handleCarChange = e => {
    const { name, value, type, checked } = e.target;
    setCarForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleClothesChange = e => {
    const { name, value } = e.target;
    setClothesForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitCar = async e => {
    e.preventDefault();
    const payload = {
      ...carForm,
      precio: parseFloat(carForm.precio.replace(/,/g, '')).toFixed(2),
    };

    if (editCarId) {
      await api.put(`/cars/${editCarId}`, payload);
    } else {
      await api.post('/cars', payload);
    }

    setCarForm({ nombre: '', descripcion: '', precio: '', imagen_url: '', es_deportivo: false });
    setEditCarId(null);
    fetchCars();
  };

  const submitClothes = async e => {
    e.preventDefault();
    const payload = {
      ...clothesForm,
      precio: parseFloat(clothesForm.precio.replace(/,/g, '')).toFixed(2),
    };

    if (editClothesId) {
      await api.put(`/clothes/${editClothesId}`, payload);
    } else {
      await api.post('/clothes', payload);
    }

    setClothesForm({ nombre: '', tipo: '', precio: '', imagen_url: '' });
    setEditClothesId(null);
    fetchClothes();
  };

  const editCar = car => {
    setCarForm({ ...car, precio: car.precio.toString() });
    setEditCarId(car.id);
  };

  const deleteCar = async id => {
    await api.delete(`/cars/${id}`);
    fetchCars();
  };

  const editClothing = item => {
    setClothesForm({ ...item, precio: item.precio.toString() });
    setEditClothesId(item.id);
  };

  const deleteClothing = async id => {
    await api.delete(`/clothes/${id}`);
    fetchClothes();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto grid gap-14">
        {/* Carros */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-red-600/50">
          <h2 className="text-2xl font-bold text-red-500 mb-6">
            {editCarId ? '✏️ Editar Carro' : '🚗 Agregar Carro'}
          </h2>
          <form onSubmit={submitCar} className="grid gap-4 mb-8">
            <input type="text" name="nombre" placeholder="Nombre" value={carForm.nombre} onChange={handleCarChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <textarea name="descripcion" placeholder="Descripción" value={carForm.descripcion} onChange={handleCarChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <input type="text" name="precio" placeholder="Precio (ej. 25150.75 o 25,150.75)" value={carForm.precio} onChange={handleCarChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <input type="text" name="imagen_url" placeholder="URL de la imagen" value={carForm.imagen_url} onChange={handleCarChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <label className="flex items-center space-x-3">
              <input type="checkbox" name="es_deportivo" checked={carForm.es_deportivo} onChange={handleCarChange} />
              <span>¿Es deportivo?</span>
            </label>
            <button type="submit" className="bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-lg">
              {editCarId ? 'Actualizar' : 'Agregar'}
            </button>
          </form>

          <h3 className="text-xl font-semibold text-yellow-400 mb-3">Lista de Carros</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {cars.map(car => (
              <div key={car.id} className="bg-gray-800 rounded-xl p-4 border border-white/10">
                <img src={car.imagen_url} alt={car.nombre} className="w-full h-40 object-cover rounded mb-3" />
                <h4 className="text-lg font-bold">{car.nombre}</h4>
                <p className="text-sm text-gray-300 mb-1">{car.descripcion}</p>
                <p><strong>Precio:</strong> ${Number(car.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Deportivo:</strong> {car.es_deportivo ? 'Sí' : 'No'}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => editCar(car)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => deleteCar(car.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prendas */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-yellow-400/50">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            {editClothesId ? '✏️ Editar Prenda' : '🧢 Agregar Prenda'}
          </h2>
          <form onSubmit={submitClothes} className="grid gap-4 mb-8">
            <input type="text" name="nombre" placeholder="Nombre" value={clothesForm.nombre} onChange={handleClothesChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <input type="text" name="tipo" placeholder="Tipo (ej. gorra, suéter)" value={clothesForm.tipo} onChange={handleClothesChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <input type="text" name="precio" placeholder="Precio (ej. 899.50 o 1,299.99)" value={clothesForm.precio} onChange={handleClothesChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <input type="text" name="imagen_url" placeholder="URL de la imagen" value={clothesForm.imagen_url} onChange={handleClothesChange} className="bg-gray-800 p-3 rounded-md border border-white/10" required />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition text-black py-2 rounded-lg">
              {editClothesId ? 'Actualizar' : 'Agregar'}
            </button>
          </form>

          <h3 className="text-xl font-semibold text-red-400 mb-3">Lista de Prendas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {clothes.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-xl p-4 border border-white/10">
                <img src={item.imagen_url} alt={item.nombre} className="w-full h-40 object-cover rounded mb-3" />
                <h4 className="text-lg font-bold">{item.nombre}</h4>
                <p><strong>Tipo:</strong> {item.tipo}</p>
                <p><strong>Precio:</strong> ${Number(item.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => editClothing(item)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => deleteClothing(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCars;





