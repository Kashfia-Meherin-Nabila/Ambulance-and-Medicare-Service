import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/ambulance-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.id) {
        // Save user
        localStorage.setItem("user", JSON.stringify(data));

        // Role-based redirect
        if (data.role === "patient") navigate("/patient-dashboard");
        else if (data.role === "driver") navigate("/driver-dashboard");
        else if (data.role === "medical") navigate("/medical-dashboard");
        else if (data.role === "hospital") navigate("/hospital-dashboard");
        else navigate("/");

      } else {
        alert(data.error || "Login failed ❌");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Welcome Back 🚑</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">

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
              <label className="label flex justify-between">
                <span className="label-text">Password</span>
                <span
                  className="text-sm text-blue-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full mt-2">
              Login
            </button>

          </form>

          {/* Redirect */}
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;