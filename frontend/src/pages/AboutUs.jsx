import { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js';
    script.async = true;
    script.onload = () => {
      window.tsParticles.load('tsparticles', {
        background: { color: { value: "#0f172a" } },
        particles: {
          number: { value: 50 },
          color: { value: "#38bdf8" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 1.2,
            random: true,
            straight: false,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#38bdf8",
            opacity: 0.3,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
          },
        },
        detectRetina: true,
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white px-4">
      <div id="tsparticles" className="absolute inset-0 -z-10"></div>
      <div className="max-w-3xl bg-black bg-opacity-40 p-6 rounded-xl shadow-lg border border-sky-500">
        <h1 className="text-4xl font-bold mb-4 text-sky-400">Sobre Nosotros</h1>
        <p className="text-blue-100 text-lg">
          Grupo Silaba es una marca legendaria dedicada a la innovación, el rendimiento y el lujo.
          Desde nuestros modelos más sencillos hasta nuestros modelos icónicos,
          ofrecemos experiencias incomparables en cada detalle.
        </p>
        <p className="mt-4 text-blue-200">
          Nuestro compromiso con la excelencia nos impulsa a crear vehículos únicos,
          prendas exclusivas y experiencias inolvidables para nuestros seguidores.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

