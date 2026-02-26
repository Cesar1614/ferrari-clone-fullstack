import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Racing from './pages/Racing';
import SportsCars from './pages/SportsCars';
import Collections from './pages/Collections';
import Experiences from './pages/Experiences';
import AboutUs from './pages/AboutUs';
import Chatbot from './pages/Chatbot';
import AdminCars from './pages/AdminCars';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import HistorialCompras from './pages/HistorialCompras';
import CarDetail from './pages/CarDetail';
import ClothesDetail from './pages/ClothesDetail';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/racing" element={<Racing />} />
        <Route path="/sports-cars" element={<SportsCars />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} /> 
        <Route path="/historial" element={<HistorialCompras />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/clothing/:id" element={<ClothesDetail />} />


   
      </Routes>
    </Router>
  );
}

export default App;