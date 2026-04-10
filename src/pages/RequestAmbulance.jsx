import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

const RequestAmbulance = () => {
  const location = useLocation(); // Catch the data from the search page
  const [data, setData] = useState({ services: [], hospitals: [] });
  const [selection, setSelection] = useState({ type: 'ac', hospitalId: '' });
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, hospRes] = await Promise.all([
          fetch('/data/services.json'),
          fetch('/data/hospitals.json')
        ]);
        const hospitals = await hospRes.json();
        const services = await servRes.json();
        
        setData({ services, hospitals });

        // AUTO-SELECT if user came from the search page
        if (location.state?.id) {
          setSelection(prev => ({ ...prev, hospitalId: location.state.id.toString() }));
        }
      } finally { setLoading(false); }
    };
    fetchData();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [location.state]);

  const selectedHospital = data.hospitals.find(h => h.id === Number(selection.hospitalId));
  const currentService = data.services.find(s => s.id === selection.type);
  
  const distanceVal = selectedHospital ? parseFloat(selectedHospital.distance) : 0;
  const distanceCharge = Math.round(distanceVal * (currentService?.ratePerKm || 0));
  const totalFare = (currentService?.basePrice || 0) + distanceCharge;

  const handleBooking = () => {
    const newRide = {
      id: Date.now(),
      hospital: selectedHospital.name,
      location: selectedHospital.location,
      distance: distanceVal,
      fare: totalFare,
      status: "Pending",
      requestTime: new Date().toLocaleTimeString()
    };
    const existingRides = JSON.parse(localStorage.getItem("rides")) || [];
    localStorage.setItem("rides", JSON.stringify([newRide, ...existingRides]));
    setIsBooked(true);
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Preparing Booking...</div>;

  if (isBooked) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
       <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm border border-emerald-100">
          <Icons.CheckCircle className="text-emerald-500 mx-auto mb-4" size={60} />
          <h2 className="text-2xl font-black mb-2 text-slate-900">Request Sent!</h2>
          <p className="text-slate-500 mb-8">Ambulance assigned to: {selectedHospital?.name}</p>
          <button onClick={() => setIsBooked(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold">Back</button>
       </div>
    </div>
  );

  return (
    <div className="container min-h-screen pt-20 pb-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-black">Finalize Booking</h1>
          
          {/* Destination Preview (Auto-filled) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Destination</h3>
            <select 
              className="select select-bordered w-full h-14 rounded-2xl bg-slate-50"
              onChange={(e) => setSelection({ ...selection, hospitalId: e.target.value })}
              value={selection.hospitalId}
            >
              <option value="">Select Hospital</option>
              {data.hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>

          {/* Service Picker */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase mb-4">Ambulance Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelection({ ...selection, type: s.id })}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    selection.type === s.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 text-slate-400'
                  }`}
                >
                  <Icons.Ambulance size={28} />
                  <span className="text-[10px] font-black uppercase">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-6">Price Breakdown</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm opacity-60">
                <span>Base ({currentService?.title})</span>
                <span>৳{currentService?.basePrice}</span>
              </div>
              <div className="flex justify-between text-sm opacity-60">
                <span>KM Charge ({selectedHospital?.distance})</span>
                <span>৳{distanceCharge}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-lg">Total</span>
                <span className="text-4xl font-black text-blue-400">৳{totalFare}</span>
              </div>
            </div>
            <button 
              onClick={handleBooking}
              disabled={!selection.hospitalId}
              className="w-full h-16 bg-blue-600 rounded-2xl font-black text-lg shadow-xl disabled:bg-slate-800"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAmbulance;