import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (result.success) {
        // save session
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("role", result.role);

        const routes = {
          patient: "/patient-dashboard",
          driver: "/driver-dashboard",
          hospital: "/hospital-dashboard",
          medical: "/medical-dashboard",
        };

        navigate(routes[result.role] || "/");
      } else {
        setError(result.message || "Invalid email or password ❌");
      }
    } catch {
      setError("Server error. Make sure XAMPP is running ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          🚑 Ambulance System
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          {/* Role Selector */}
          <select
            name="role"
            className="select select-bordered w-full"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="patient">Patient</option>
            <option value="driver">Driver</option>
          </select>

          <button
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;