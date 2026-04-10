import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate email
    const userExists = existingUsers.find(
      (u) => u.email === formData.email
    );

    if (userExists) {
      setError("Email already exists ❌");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formData,
    };

    const updatedUsers = [...existingUsers, newUser];

    // save users list
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // auto login
    localStorage.setItem("user", JSON.stringify(newUser));

    // redirect
    const routes = {
      patient: "/patient-dashboard",
      driver: "/driver-dashboard",
      hospital: "/hospital-dashboard",
      medical: "/medical-dashboard",
    };

    navigate(routes[newUser.role] || "/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Create Account 🚑
          </h2>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

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

            <button className="btn btn-primary w-full">
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;