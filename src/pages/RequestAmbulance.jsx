import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react'; // Import all icons for dynamic mapping

const RequestAmbulance = () => {
  const [services, setServices] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from public/data/services.json
  useEffect(() => {
    fetch('/data/services.json')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        if (data.length > 0) setSelectedType(data[0].id); // Default to first service
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-600">Loading AmbuSaver Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen bg-slate-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Request an Ambulance</h1>
          <p className="text-slate-500">Please fill in the details. Our team will contact you within 60 seconds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: The Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Service Selection (Fetched Dynamically) */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Select Service Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((s) => {
                  // Dynamic icon lookup
                  const IconComponent = Icons[s.iconName] || Icons.Ambulance;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedType(s.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        selectedType === s.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-inner' 
                        : 'border-slate-100 hover:border-blue-200 text-slate-500'
                      }`}
                    >
                      <IconComponent size={24} />
                      <span className="text-xs font-bold">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pickup Details */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-5">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Pickup Information</label>
              
              <div className="relative">
                <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Patient or Contact Name" className="input input-bordered w-full pl-12 h-14 rounded-xl bg-slate-50 border-none focus:ring-2 ring-blue-500" />
              </div>

              <div className="relative">
                <Icons.Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="tel" placeholder="Active Mobile Number" className="input input-bordered w-full pl-12 h-14 rounded-xl bg-slate-50 border-none focus:ring-2 ring-blue-500" />
              </div>

              <div className="relative">
                <Icons.MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Full Pickup Address in Dhaka" className="input input-bordered w-full pl-12 h-14 rounded-xl bg-slate-50 border-none focus:ring-2 ring-blue-500" />
              </div>
            </div>
          </div>

          {/* Right Side: Summary & Action */}
          <div className="space-y-6">
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-blue-100">Request Summary</h3>
                <div className="space-y-3 border-b border-blue-500 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Selected:</span>
                    <span className="font-bold uppercase">
                      {services.find(s => s.id === selectedType)?.title || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Est. Price:</span>
                    <span className="font-bold">
                      {services.find(s => s.id === selectedType)?.price || "—"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-blue-700/50 p-3 rounded-xl mb-6">
                  <Icons.AlertTriangle className="text-yellow-400" size={20} />
                  <p className="text-[10px] leading-tight">By clicking confirm, you agree to our emergency response terms.</p>
                </div>

                <button className="btn btn-white w-full h-14 rounded-xl text-blue-600 font-bold hover:bg-slate-100 border-none group">
                  Confirm Request
                  <Icons.ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center text-center space-y-3">
              <p className="text-slate-500 text-sm font-medium">Prefer booking over call?</p>
              <a href="tel:01710060020" className="text-xl font-black text-red-600 hover:scale-105 transition-transform flex items-center gap-2">
                <Icons.PhoneCall size={20} /> 017100-60020
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestAmbulance;