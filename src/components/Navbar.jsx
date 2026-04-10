import { Link, NavLink } from "react-router-dom";

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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive ? "border-b border-blue-600 text-blue-600" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/requestAmbulance"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive ? "border-b border-blue-600 text-blue-600" : ""
            }`
          }
        >
          Request-Ambulance
        </NavLink>
        <NavLink
          to="/tracking"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive ? "border-b border-blue-600 text-blue-600" : ""
            }`
          }
        >
          Tracking
        </NavLink>
        <NavLink
          to="/hospitalSelection"
          className={({ isActive }) =>
            `hover:text-blue-600 ${
              isActive ? "border-b border-blue-600 text-blue-600" : ""
            }`
          }
        >
          Hospitals
        </NavLink>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Link
        to="/login"
        className="px-4 py-2 border font-semibold border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
