import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../services/api';
import { motion } from 'framer-motion';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsp-success', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 50 },
          color: { value: "#22c55e" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { enable: true, speed: 1.5, random: true },
          links: { enable: true, distance: 120, color: "#22c55e", opacity: 0.3 }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        detectRetina: true
      });
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const session_id = new URLSearchParams(location.search).get("session_id");
    if (!session_id) return;

    const fetchOrder = async () => {
      try {
        await api.post('/orders/update-payment-status', { session_id });
        const res = await api.get('/orders');
        const order = res.data.find(o => o.stripeSessionId === session_id);
        if (order) setOrderData(order);
      } catch (err) {
        console.error("❌ Error al procesar orden:", err);
      }
    };

    fetchOrder();
  }, [location]);

  const generarFactura = async () => {
    if (!orderData || !orderData.productos) return;

    const doc = new jsPDF();

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRHZKqcLtXAIecy1CaFDcrDpO6QnBnrr6Ag&s';
    const logoImg = await loadImage(logoUrl);
    doc.addImage(logoImg, 'PNG', 15, 10, 30, 30);

    doc.setFontSize(18);
    doc.setTextColor(80, 80, 80);
    doc.text('Grupo Sílaba - Factura Oficial', 55, 20);

    doc.setFontSize(11);
    doc.text('Dirección: Av. 11 N°07', 55, 28);
    doc.text('Ciudad: Panamá', 55, 33);
    doc.text('Teléfono: +507 6000-0000', 55, 38);

    doc.setFontSize(12);
    doc.setFillColor(200, 200, 200);
    doc.rect(15, 50, 180, 10, 'F');
    doc.setTextColor(0);
    doc.text('Factura para:', 20, 57);
    doc.setFontSize(11);
    doc.text('CÉSAR RODRÍGUEZ', 20, 64);
    doc.text('AV. CENTRAL, CHIRIQUÍ', 20, 69);
    doc.text('Tel: +507 6123-4567', 20, 74);

    const fecha = new Date().toLocaleDateString();
    doc.text(`Fecha: ${fecha}`, 150, 64);
    doc.text(`Factura #: ${orderData.id}`, 150, 69);

    const items = Array.isArray(orderData.productos)
      ? orderData.productos
      : JSON.parse(orderData.productos);

    const body = items.map(item => {
      const cantidad = item.quantity || 1;
      const nombre = item.name || 'Producto';
      const precio = item.amount ? item.amount / 100 : 0;
      const total = cantidad * precio;
      return [
        cantidad.toString(),
        nombre,
        `$${precio.toFixed(2)}`,
        `$${total.toFixed(2)}`
      ];
    });

    autoTable(doc, {
      startY: 85,
      head: [['Cantidad', 'Descripción', 'Precio unitario', 'Total']],
      body,
      theme: 'grid',
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 0,
        fontStyle: 'bold'
      },
      styles: { halign: 'center' },
    });

    const subtotal = body.reduce((sum, row) => parseFloat(row[3].replace('$', '')) + sum, 0);
    const iva = subtotal * 0.07;
    const total = subtotal + iva;

    const y = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 150, y);
    doc.text(`IVA (7%): $${iva.toFixed(2)}`, 150, y + 6);
    doc.setFontSize(13);
    doc.setTextColor(0, 100, 0);
    doc.text(`TOTAL: $${total.toFixed(2)}`, 150, y + 14);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Gracias por tu compra. Si tienes dudas, contacta a ventas@gruposilaba.com', 20, y + 30);

    doc.save('Factura_Grupo_Silaba.pdf');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div id="tsp-success" className="absolute inset-0 -z-10"></div>

      <motion.div
        className="bg-black bg-opacity-50 border border-green-400 p-10 rounded-xl text-center shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-green-400 mb-4">✅ ¡Pago exitoso!</h1>
        <p className="text-lg mb-6 text-green-200">Gracias por tu compra. ✨</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded transition"
          >
            Volver al inicio
          </button>
          <button
            onClick={generarFactura}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded transition"
          >
            Descargar factura
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;


