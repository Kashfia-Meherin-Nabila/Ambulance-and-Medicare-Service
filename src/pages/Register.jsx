import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient, registerDriver } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;

      if (formData.role === "driver") {
        result = await registerDriver({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: "",
          license_number: "",
          ambulance_type: "",
          plate_number: "",
        });
      } else {
        result = await registerPatient({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: "",
          address: "",
          blood_group: "",
        });
      }

      if (result.success) {
        // save to localStorage for auto login
        const newUser = { id: Date.now(), ...formData };
        localStorage.setItem("user", JSON.stringify(newUser));

        const routes = {
          patient: "/patient-dashboard",
          driver: "/driver-dashboard",
          hospital: "/hospital-dashboard",
          medical: "/medical-dashboard",
        };
        navigate(routes[formData.role] || "/");
      } else {
        setError(result.message || "Registration failed ❌");
      }
    } catch {
      setError("Server error. Make sure XAMPP is running ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account 🚑</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

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

            <select
              name="role"
              className="select select-bordered w-full"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="patient">Patient</option>
              <option value="driver">Driver</option>
              <option value="medical">Medical</option>
              <option value="hospital">Hospital</option>
            </select>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
