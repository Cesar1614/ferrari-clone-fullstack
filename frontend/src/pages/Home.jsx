import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { GiMagicAxe } from 'react-icons/gi';
import { LuLightbulb } from 'react-icons/lu';
import { LuClock3 } from 'react-icons/lu';

const Home = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsparticles', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 60 },
          color: { value: "#38bdf8" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { enable: true, speed: 1.5, direction: "none", random: true },
          links: { enable: true, distance: 130, color: "#38bdf8", opacity: 0.4, width: 1 },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: false },
          },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        detectRetina: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>

      {/* Título animado */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl text-center mt-20"
      >
        <h1 className="text-5xl font-extrabold text-sky-400 mb-6 tracking-wide drop-shadow-lg">
          Bienvenido a Grupo Silaba
        </h1>
        <p className="text-lg text-blue-100 leading-relaxed drop-shadow-sm">
          Explora nuestros modelos, colecciones y experiencias únicas. Vive la pasión, el rendimiento y la innovación de una marca legendaria.
        </p>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-10"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRHZKqcLtXAIecy1CaFDcrDpO6QnBnrr6Ag&s"
          alt="Grupo Sílaba"
          className="w-24 h-auto opacity-70 hover:opacity-100 transition duration-300"
        />
      </motion.div>

      {/* Beneficios de la APP */}
      <section className="text-center py-12 px-6 text-gray-100 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-white">Descubre todos los beneficios de nuestra APP</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
          {/* Única */}
          <div className="flex flex-col items-center space-y-3">
            <GiMagicAxe className="text-blue-400 text-4xl" />
            <h3 className="text-lg font-semibold text-white">Única</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Buscamos crear una herramienta dispuesta a evolucionar contigo, basada en eficiencia y confiabilidad.
              Acceso a la información de tu vehículo como nunca antes.
            </p>
          </div>
          {/* Fácil */}
          <div className="flex flex-col items-center space-y-3">
            <LuLightbulb className="text-blue-400 text-4xl" />
            <h3 className="text-lg font-semibold text-white">Fácil</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Estudiamos cada proceso para que puedas hacer trámites como citas, pagos o cotizaciones con un solo toque. ¡EXPERIMÉNTALO!
            </p>
          </div>
          {/* Rápida */}
          <div className="flex flex-col items-center space-y-3">
            <LuClock3 className="text-blue-400 text-4xl" />
            <h3 className="text-lg font-semibold text-white">Rápida</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Grupo Sílaba APP te brinda acceso a nuestros servicios en segundos. Porque la eficiencia también se siente.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 w-full py-10 text-gray-300 mt-10 text-center text-sm">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRHZKqcLtXAIecy1CaFDcrDpO6QnBnrr6Ag&s"
            alt="Logo GS"
            className="w-16 h-16"
          />
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> Sucursal Principal: Grupo Silaba, Calle 50 y 64, San Francisco</p>
          <p className="flex items-center gap-2"><FaPhone /> (507) 230–8999</p>
          <p className="flex items-center gap-2"><FaEnvelope /> contactos@silaba.com</p>
          <div className="flex space-x-4 mt-2 text-xl">
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;







