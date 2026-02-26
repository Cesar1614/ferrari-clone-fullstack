import { useState, useEffect } from 'react';
import api from '../services/api';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const preguntas = [
  '¿Qué carros deportivos hay disponibles?',
  '¿Qué prendas hay disponibles en la boutique?',
  '¿Cuáles son los precios de los carros deportivos?',
  '¿Cuál es el horario de atención?',
  '¿Dónde puedo contactar al soporte?',
  '¿Cómo puedo realizar una compra?',
  '¿Puedo ver el historial de mis compras?',
  '¿Cómo funcionan los pagos con Stripe?'
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [carros, setCarros] = useState([]);
  const [ropa, setRopa] = useState([]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [resCarros, resRopa] = await Promise.all([
        api.get('/cars'),
        api.get('/clothes')
      ]);
      setCarros(resCarros.data);
      setRopa(resRopa.data);
    };
    fetchData();
  }, []);

  const responder = async (pregunta) => {
    let respuesta = '🤖 Lo siento, no tengo información para eso.';

    if (pregunta.includes('carros deportivos')) {
      const deportivos = carros.filter(c => c.es_deportivo);
      respuesta = deportivos.length
        ? `🚗 Carros deportivos disponibles:\n- ${deportivos.map(c => c.nombre).join('\n- ')}`
        : 'No hay carros deportivos disponibles actualmente.';
    }

    if (pregunta.includes('precios de los carros')) {
      const deportivos = carros.filter(c => c.es_deportivo);
      respuesta = deportivos.length
        ? `💰 Precios de los carros deportivos:\n${deportivos.map(c => `${c.nombre}: $${c.precio}`).join('\n')}`
        : 'No hay precios disponibles.';
    }

    if (pregunta.includes('prendas') || pregunta.includes('boutique')) {
      respuesta = ropa.length
        ? `👕 Prendas disponibles:\n${ropa.map(r => `- ${r.nombre}`).join('\n')}`
        : 'No hay prendas disponibles actualmente.';
    }

    if (pregunta.includes('horario')) {
      respuesta = 'Nuestro horario de atención es de lunes a viernes, de 9:00 a.m. a 6:00 p.m.';
    }

    if (pregunta.includes('soporte')) {
      respuesta = 'Puedes contactarnos al correo soporte@ferrari.com o al WhatsApp +507 6000-0000.';
    }

    if (pregunta.includes('realizar una compra')) {
      respuesta = 'Agrega productos al carrito y haz clic en "Proceder al pago". El sistema usa Stripe para procesar tus pagos.';
    }

    if (pregunta.includes('historial de mis compras')) {
      respuesta = 'Puedes acceder al historial de compras desde el menú superior en la sección "Historial".';
    }

    if (pregunta.includes('Stripe')) {
      respuesta = 'Stripe es una plataforma de pagos segura. Aceptamos pagos con tarjeta de crédito y débito mediante esta herramienta.';
    }

    const newMessages = [
      { from: 'user', text: pregunta },
      { from: 'bot', text: respuesta }
    ];
    setMessages(prev => [...prev, ...newMessages]);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-4">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: '#000' },
          particles: {
            number: { value: 60 },
            color: { value: '#ff0000' },
            links: { enable: true, color: '#ffffff' },
            move: { enable: true, speed: 1 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100 } },
          },
        }}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 w-full max-w-md bg-black/70 border border-red-600 rounded-2xl shadow-2xl p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">💬 Chat de Asistencia Ferrari</h2>
        <div className="h-64 overflow-y-auto bg-gray-900 border border-white/10 rounded p-3 mb-4 space-y-2 text-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`text-${msg.from === 'user' ? 'right text-sky-400' : 'left text-white'}`}>
              <p><strong>{msg.from === 'user' ? 'Tú' : 'FerrariBot'}:</strong> {msg.text}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {preguntas.map((pregunta, index) => (
            <button
              key={index}
              onClick={() => responder(pregunta)}
              className="w-full text-left bg-red-800/60 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              {pregunta}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


