import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-3xl">🚑</span>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 animate-gradient-x">
          AmbuSaver
        </h1>
      </div>

      {/* Menu */}
      <div className="hidden md:flex gap-6 text-gray-700 font-semibold">
        <Link to="/" className="hover:text-blue-600 hover:border-b border-blue-600">Home</Link>
        <Link to="/requestAmbulance" className="hover:text-blue-600 hover:border-b border-blue-600">Request-Ambulance</Link>
        <Link to="/tracking" className="hover:text-blue-600 hover:border-b border-blue-600">Tracking</Link>
        <Link to="/hospitalSelection" className="hover:text-blue-600 hover:border-b border-blue-600">Hospitals</Link>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="px-4 py-2 border font-semibold border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Login
        </button>
        <button className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;