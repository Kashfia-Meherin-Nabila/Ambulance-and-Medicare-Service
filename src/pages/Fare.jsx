import { useEffect, useState } from "react";
import {
  MapPin,
  Hospital,
  Navigation,
  Truck,
  CheckCircle,
  Info
} from "lucide-react";

const Fare = () => {
  const [hospitals, setHospitals] = useState([]);
  const [services, setServices] = useState([]); // 🚑 New state for services
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // 🚑 Load hospitals and services
  useEffect(() => {
    // Fetch Hospitals
    fetch("/data/hospitals.json")
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.log("Hospital Fetch Error:", err));

    // Fetch Services (Ambulance Categories)
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        if (data.length > 0) setSelectedService(data[0]); // Default to first service
      })
      .catch((err) => console.log("Service Fetch Error:", err));
  }, []);

  // 💰 Calculate fare
  const calculateFare = () => {
    if (!distance || distance <= 0 || !selectedService) return;

    // Math: Base Price + (Distance * Rate Per KM)
    const total = selectedService.basePrice + (distance * selectedService.ratePerKm);
    setFare(Math.round(total));
    setConfirmed(false);
  };

  // 🚑 Confirm ride
  const confirmRide = () => {
    const ride = {
      id: Date.now(),
      hospital: selectedHospital?.name,
      ambulanceType: selectedService?.title,
      distance,
      fare,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const oldRides = JSON.parse(localStorage.getItem("rides")) || [];
    localStorage.setItem("rides", JSON.stringify([ride, ...oldRides]));

    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          💰 Fare Calculator
        </h1>
        <p className="text-slate-500">Select destination and ambulance type for an instant quote.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: SELECTIONS */}
        <div className="space-y-6">
          {/* HOSPITAL SELECT */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <Hospital className="text-red-500" size={20} />
              <h2 className="font-bold">Select Hospital</h2>
            </div>
            <select
              className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 ring-blue-500"
              onChange={(e) => {
                const hospital = hospitals.find(h => h.id === parseInt(e.target.value));
                setSelectedHospital(hospital);
                if (hospital) setDistance(parseFloat(hospital.distance));
              }}
            >
              <option value="">Choose hospital...</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name} ({h.distance})</option>
              ))}
            </select>
          </div>

          {/* AMBULANCE CATEGORY SELECT */}
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
              <Truck className="text-blue-500" size={20} />
              <h2 className="font-bold">Ambulance Category</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedService?.id === s.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{s.title}</span>
                    <span className="text-xs font-bold text-blue-600">৳{s.ratePerKm}/km</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Base: ৳{s.basePrice}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculateFare}
            disabled={!selectedHospital}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition disabled:opacity-50"
          >
            Calculate Total Fare
          </button>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="space-y-6">
          {fare ? (
            <div className="bg-white shadow-xl border-2 border-blue-100 rounded-4xl p-8 sticky top-6">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Info className="text-blue-600" /> Trip Summary
              </h2>

              <div className="space-y-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-bold text-slate-900">{selectedHospital?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-bold text-slate-900">{selectedService?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-bold text-slate-900">{distance} km</span>
                </div>
                
                <div className="pt-4 border-t border-dashed border-slate-200">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold">Total Fare</span>
                    <span className="text-4xl font-black text-blue-600">৳{fare}</span>
                  </div>
                </div>
              </div>

              {!confirmed ? (
                <button
                  onClick={confirmRide}
                  className="mt-8 w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Confirm Booking 🚑
                </button>
              ) : (
                <div className="mt-8 p-4 bg-emerald-50 rounded-2xl flex items-center justify-center gap-2 text-emerald-700 font-black animate-bounce">
                  <CheckCircle size={24} />
                  Booking Successful!
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-4xl p-10">
              <Navigation size={48} className="mb-4 opacity-20" />
              <p className="text-center font-medium">Select a hospital and ambulance type to generate your fare summary.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Fare;