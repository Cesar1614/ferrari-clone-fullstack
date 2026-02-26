import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/racing', label: 'Racing' },
    { to: '/sports-cars', label: 'Sports Cars' },
    { to: '/collections', label: 'Colecciones' },
    { to: '/experiences', label: 'Experiencias' },
    { to: '/about-us', label: 'Sobre Nosotros' },
    //{ to: '/chatbot', label: 'Chatbot' },
   //{ to: '/admin/cars', label: 'Admin Carros' },
    { to: '/cart', label: 'Carrito' },
    { to: '/historial', label: 'Historial' },
  ];

  return (
    <nav className="bg-gradient-to-r from-black via-slate-900 to-black shadow-md border-b border-cyan-500 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 tracking-wide transition duration-300"
        >
          Grupo Silaba
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-2 py-1 transition-all duration-300 hover:text-cyan-300 hover:scale-110 ${
                location.pathname === link.to
                  ? 'text-cyan-400 after:content-[""] after:absolute after:w-full after:h-[2px] after:bg-cyan-400 after:bottom-0 after:left-0 after:rounded'
                  : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


