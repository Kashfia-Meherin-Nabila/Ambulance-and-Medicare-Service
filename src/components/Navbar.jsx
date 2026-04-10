import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react'; // Optional: for a nice icon

const Navbar = () => {
  const navigate = useNavigate();
  
  // 1. Check if a user is logged in
  // Assuming you store user data as 'user' in localStorage upon login
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // 2. Clear user session data
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // clear token if you use one
    
    // 3. Redirect to home or login page
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-8 py-4 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-3xl">🚑</span>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400">
          AmbuSaver
        </h1>
      </Link>

      {/* Menu */}
      <div className="hidden md:flex gap-6 text-gray-700 font-semibold">
        <NavLink to="/" className={({ isActive }) => `hover:text-blue-600 ${isActive ? "border-b-2 border-blue-600 text-blue-600" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/requestAmbulance" className={({ isActive }) => `hover:text-blue-600 ${isActive ? "border-b-2 border-blue-600 text-blue-600" : ""}`}>
          Request-Ambulance
        </NavLink>
        <NavLink to="/tracking" className={({ isActive }) => `hover:text-blue-600 ${isActive ? "border-b-2 border-blue-600 text-blue-600" : ""}`}>
          Tracking
        </NavLink>
        <NavLink to="/hospitalSelection" className={({ isActive }) => `hover:text-blue-600 ${isActive ? "border-b-2 border-blue-600 text-blue-600" : ""}`}>
          Hospitals
        </NavLink>
      </div>

      {/* Auth Buttons Logic */}
      <div className="flex gap-3 items-center">
        {user ? (
          /* ── SHOW THIS IF LOGGED IN ── */
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Welcome back,</p>
              <p className="text-sm font-bold text-slate-800">{user.name || 'User'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          /* ── SHOW THIS IF GUEST ── */
          <>
            <Link
              to="/login"
              className="px-4 py-2 border font-semibold border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;