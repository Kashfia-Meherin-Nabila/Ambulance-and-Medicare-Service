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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/ambulance-api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.message) {
        alert("Registration Successful ✅");
        navigate("/login");
      } else {
        alert("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account 🚑</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div>
              <label className="label">
                <span className="label-text">Register As</span>
              </label>
              <select
                name="role"
                className="select select-bordered w-full"
                onChange={handleChange}
                defaultValue="patient"
              >
                <option value="patient">Patient / General Public</option>
                <option value="driver">Ambulance Driver</option>
                <option value="medical">Medical Staff</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full mt-2">
              Register
            </button>

          </form>

          {/* Redirect */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;