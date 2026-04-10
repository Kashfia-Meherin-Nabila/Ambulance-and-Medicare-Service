import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ambulance, MapPin, DollarSign, Phone,
  ChevronRight, CheckCircle, XCircle, Clock, Navigation, ShieldCheck, Hospital
} from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [recentRides, setRecentRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRide, setActiveRide] = useState(null); // 🚑 State for live tracking

  useEffect(() => {
    // 1. Fetch History from JSON
    fetch('/data/rides.json')
      .then(res => res.json())
      .then(data => { setRecentRides(data); setLoading(false); })
      .catch(err => { console.error('Error fetching rides:', err); setLoading(false); });

    // 2. Check LocalStorage for a LIVE ride
    const checkActiveRide = () => {
      const savedRides = JSON.parse(localStorage.getItem("rides")) || [];
      // Look for the most recent ride that isn't finished
      const live = savedRides.find(r => r.status === "Pending" || r.status === "Accepted");
      setActiveRide(live);
    };

    checkActiveRide();
    // Listen for storage changes (if booking happens in another tab)
    window.addEventListener('storage', checkActiveRide);
    return () => window.removeEventListener('storage', checkActiveRide);
  }, []);

  const stats = [
    { label: 'Total Requests', value: '12', icon: <Ambulance size={22} />, color: 'bg-red-100 text-red-600' },
    { label: 'Active Ride', value: activeRide ? '1' : '0', icon: <Clock size={22} />, color: 'bg-orange-100 text-orange-600' },
    { label: 'Completed', value: '10', icon: <CheckCircle size={22} />, color: 'bg-green-100 text-green-600' },
    { label: 'Cancelled', value: '1', icon: <XCircle size={22} />, color: 'bg-slate-100 text-slate-500' },
  ];

  const quickActions = [
    { label: 'Request Ambulance', desc: 'Book now', icon: <Ambulance size={26} />, color: 'border-slate-100 hover:border-red-400 hover:bg-red-50', route: '/requestAmbulance' },
    { label: 'Track Ambulance', desc: 'Live location', icon: <MapPin size={26} />, color: 'border-slate-100 hover:border-orange-400 hover:bg-orange-50', route: '/tracking' },
    { label: 'Fare Estimation', desc: 'Check cost', icon: <DollarSign size={26} />, color: 'border-slate-100 hover:border-green-400 hover:bg-green-50', route: '/fare' },
    { label: 'Find Hospital', desc: 'Specialties', icon: <Phone size={26} />, color: 'border-slate-100 hover:border-blue-400 hover:bg-blue-50', route: '/hospitalSelection' },
  ];

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-slate-400">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── 🟢 LIVE TRACKING UI ── */}
        {activeRide ? (
          <div className="bg-white rounded-[3rem] border-2 border-blue-500 overflow-hidden shadow-2xl shadow-blue-100 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              
              {/* Simple Live Map Simulator */}
              <div className="lg:col-span-3 bg-slate-200 h-72 lg:h-auto relative">
                <div className="absolute inset-0 bg-blue-50 overflow-hidden">
                   {/* Visual Map Grid Effect */}
                   <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                   
                   {/* Animated Route Line */}
                   <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-dashed border-t-4 border-blue-200 border-dashed animate-pulse"></div>
                   
                   {/* Pulsing Ambulance Icon */}
                   <div className="absolute top-[45%] left-1/3 animate-bounce">
                      <div className="p-3 bg-red-600 text-white rounded-2xl shadow-xl">
                        <Ambulance size={24} />
                      </div>
                      <div className="w-6 h-6 bg-red-600/20 rounded-full animate-ping absolute -bottom-2 left-3"></div>
                   </div>

                   {/* Destination Icon */}
                   <div className="absolute top-[45%] right-1/4 p-3 bg-slate-900 text-white rounded-2xl">
                      <Hospital size={24} />
                   </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Navigation className="text-blue-600 animate-pulse" size={20} />
                    <span className="text-xs font-black text-slate-800 uppercase">Driver is 2.4 km away</span>
                  </div>
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase">ETA: 6 Mins</span>
                </div>
              </div>

              {/* Ride Status Card */}
              <div className="lg:col-span-2 p-8 space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-black text-slate-900 leading-none">Live Trip</h2>
                   <ShieldCheck className="text-emerald-500" size={28} />
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Destination</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{activeRide.hospital}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Fare</p>
                      <p className="text-sm font-bold text-slate-800">৳{activeRide.fare}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                      <p className="text-sm font-bold text-blue-600">{activeRide.status}</p>
                    </div>
                  </div>
                </div>

                {/* Live Progress Bar */}
                <div className="space-y-2">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Booking Progress</span>
                      <span className="text-xs font-bold text-blue-600">40%</span>
                   </div>
                   <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[40%] rounded-full animate-pulse"></div>
                   </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <Phone size={14} /> Call Driver
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem("rides");
                      setActiveRide(null);
                    }}
                    className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-bold text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                    Cancel
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ── Welcome Banner (Only visible if NO active ride) ── */
          <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-200">
            <div>
              <p className="text-blue-400 font-bold mb-2 tracking-widest uppercase text-xs">Medical Support 24/7</p>
              <h1 className="text-4xl font-black text-white mb-2 leading-tight">Need Urgent Help?</h1>
              <p className="text-slate-400">Your safety is our priority. Book an ambulance in seconds.</p>
            </div>
            <button
              onClick={() => navigate('/requestAmbulance')}
              className="group flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white font-black px-10 py-5 rounded-4xl text-xl shadow-xl shadow-red-200 transition-all"
            >
              Request Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{s.label}</p>
                <p className="text-3xl font-black text-slate-900">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick Actions Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className={`bg-white rounded-3xl p-6 border-2 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${action.color}`}
            >
              <div className="mb-4">{action.icon}</div>
              <p className="font-black text-slate-900 text-sm mb-1">{action.label}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{action.desc}</p>
            </button>
          ))}
        </div>

        {/* ── Recent Rides ── */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-2">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-800">Recent Activity</h2>
            <button className="text-xs font-bold text-blue-600 hover:underline">View History</button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentRides.length > 0 ? (
              recentRides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                      <Ambulance size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{ride.to || ride.hospital}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{ride.date}</p>
                    </div>
                  </div>
                  <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                    ride.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {ride.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-slate-400 text-sm">No recent activity</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;