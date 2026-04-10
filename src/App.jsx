import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HospitalSelection from "./pages/HospitalSelection";
import RequestAmbulance from "./pages/RequestAmbulance";
import Fare from "./pages/Fare";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import DriverDashboard from "./pages/dashboards/DriverDashboard";
import HospitalDashboard from "./pages/dashboards/HospitalDashboard";
import MedicalDashboard from "./pages/dashboards/MedicalDashboard";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Home /> */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitalSelection" element={<HospitalSelection />} />
          <Route path="/requestAmbulance" element={<RequestAmbulance />} />
          <Route path="/fare" element={<Fare />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/patient-dashboard"
            element={
              <PrivateRoute role="patient">
                <PatientDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/driver-dashboard"
            element={
              <PrivateRoute role="driver">
                <DriverDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/medical-dashboard"
            element={
              <PrivateRoute role="driver">
                <MedicalDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/hospital-dashboard"
            element={
              <PrivateRoute role="driver">
                <HospitalDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
