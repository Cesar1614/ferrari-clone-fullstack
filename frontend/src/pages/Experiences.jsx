import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Experiences = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Ferrari domina la clasificación en Mónaco",
      descripcion: "Charles Leclerc logra la pole position con una vuelta impresionante...",
    },
    {
      id: 2,
      titulo: "Carlos Sainz sube al podio en Silverstone",
      descripcion: "Un final estratégico le da a Sainz su mejor resultado de la temporada...",
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsp-experiences', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 30 },
          color: { value: "#a78bfa" },
          shape: { type: "circle" },
          move: { enable: true, speed: 1.5 },
          links: {
            enable: true,
            distance: 130,
            color: "#a78bfa",
            opacity: 0.3,
            width: 1,
          }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" }
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

  return (
    <div className="relative min-h-screen px-4 py-12 text-white overflow-hidden">
      <div id="tsp-experiences" className="absolute inset-0 -z-10"></div>
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-purple-400"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
      >
        Noticias 
      </motion.h1>
      <div className="space-y-6 max-w-3xl mx-auto">
        {noticias.map(nota => (
          <motion.div
            key={nota.id}
            whileHover={{ scale: 1.02 }}
            className="bg-black bg-opacity-30 p-6 rounded-lg border border-purple-400"
          >
            <h2 className="text-xl font-bold text-white">{nota.titulo}</h2>
            <p className="text-gray-300">{nota.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;

