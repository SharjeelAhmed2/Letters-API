import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate(); // grab it right here 🧸

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Random Letter', path: '/random' },
    { label: 'Post a Letter', path: '/post' },
    { label: 'About', path: '/about' },
    {label: 'All Letters', path:'/getLetters'}
  ];

  return (
    <nav className="bg-pink-100 shadow-md py-4 px-6 flex justify-center items-center gap-6 sticky top-0 z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="text-gray-700 hover:text-white hover:bg-pink-400 transition-all duration-200 px-4 py-2 rounded-full font-medium shadow-sm"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
