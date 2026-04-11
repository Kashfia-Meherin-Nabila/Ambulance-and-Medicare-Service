import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaPhoneAlt, FaExclamationCircle, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdPayment, MdMedicalServices } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import hospitalsData from "../../public/data/hospitals.json"; // 👈 import your JSON

// Icons
const ambulanceIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const hospitalIcon = new L.DivIcon({
  className: '',
  html: `<div style="background:#ef4444;border:3px solid white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:14px;">🏥</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -18],
});

// Coordinates mapped by hospital id
const hospitalCoords = {
  1: [23.8583, 90.2667], 2: [23.8041, 90.3630], 3: [23.8134, 90.4270],
  4: [23.7620, 90.3750], 5: [23.7270, 90.3960], 6: [23.7930, 90.4150],
  7: [23.7510, 90.3870], 8: [23.7460, 90.3730], 9: [23.7390, 90.3960],
  10: [23.7760, 90.3780], 11: [23.7480, 90.3760], 12: [23.7200, 90.4500],
  13: [23.8060, 90.3580], 14: [23.8760, 90.3990], 15: [23.8900, 90.2820],
  16: [23.8530, 90.2710], 17: [23.7520, 90.3880], 18: [23.7450, 90.3720],
  19: [23.7780, 90.3760], 20: [23.7440, 90.3710], 21: [23.8070, 90.3520],
  22: [23.7400, 90.3970], 23: [23.7800, 90.4030], 24: [23.7660, 90.3970],
  25: [23.8720, 90.3940],
};

const Tracking = () => {
  const pickup = [23.8583, 90.2667];
  const ambulance = [23.8650, 90.2750];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col lg:flex-row">

      {/* MAP */}
      <div className="w-full lg:w-2/3 h-100 lg:h-[calc(100vh-80px)] sticky top-20">
        <MapContainer center={pickup} zoom={12} className="h-full w-full z-0">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={pickup} icon={ambulanceIcon}><Popup>📍 Pickup Point</Popup></Marker>
          <Marker position={ambulance} icon={ambulanceIcon}><Popup>🚑 Ambulance AS-402</Popup></Marker>

          {/* 👇 Fetch hospitals from JSON */}
          {hospitalsData.map((h) =>
            hospitalCoords[h.id] ? (
              <Marker key={h.id} position={hospitalCoords[h.id]} icon={hospitalIcon}>
                <Popup>
                  <div style={{ minWidth: 200, fontFamily: 'sans-serif', fontSize: 12 }}>
                    <p style={{ fontWeight: 'bold', fontSize: 14, color: '#1e293b' }}>🏥 {h.name}</p>
                    <p style={{ color: '#64748b' }}>📍 {h.location}</p>
                    <p><span style={{ color: '#3b82f6', fontWeight: 600 }}>Best For: </span>{h.bestFor}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '6px 0' }}>
                      <span>⭐ {h.rating}</span>
                      <span style={{ color: h.availableBeds > 10 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                        🛏 {h.availableBeds} beds
                      </span>
                    </div>
                    <a href={`tel:${h.contact}`} style={{ display: 'block', textAlign: 'center', padding: '6px', background: '#2563eb', color: 'white', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
                      📞 {h.contact}
                    </a>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>

        {/* Telemetry */}
        <div className="absolute bottom-6 left-6 z-[1000] hidden md:flex gap-4">
          {[
            { icon: <FaTachometerAlt size={20} />, label: 'Speed', value: '45 km/h', bg: 'bg-blue-100', text: 'text-blue-600' },
            { icon: <FaGasPump size={20} />, label: 'Fuel', value: '82%', bg: 'bg-orange-100', text: 'text-orange-600' },
          ].map(({ icon, label, value, bg, text }) => (
            <div key={label} className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3">
              <div className={`p-3 ${bg} ${text} rounded-xl`}>{icon}</div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{label}</p>
                <p className="font-black text-slate-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/3 p-6 lg:p-8 bg-white border-l border-slate-200 overflow-y-auto max-h-[calc(100vh-80px)]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Tracking Request</h1>
            <p className="text-sm text-slate-500">ID: #AMB-99201</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">On Duty</span>
        </div>

        {/* Driver Card */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white mb-8 shadow-xl shadow-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center text-xl font-bold border border-slate-600">RU</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Rahim Uddin</h3>
              <p className="text-xs text-slate-400">Driver • 4.9 ★ Rating</p>
            </div>
            <a href="tel:01710060020" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-colors">
              <FaPhoneAlt />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Ambulance Type</p>
              <p className="text-sm font-semibold text-blue-400">ICU Life Support</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Plate Number</p>
              <p className="text-sm font-semibold">DHAKA-METRO-123</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Live Status</h4>
          <div className="space-y-6">
            <TimelineItem icon={<FaCheckCircle />} title="Request Received" time="12:40 PM" active />
            <TimelineItem icon={<FaCheckCircle />} title="Driver Assigned" time="12:42 PM" active />
            <TimelineItem icon={<div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />} title="On the way to Pickup" time="ETA: 8 mins" active primary />
            <TimelineItem icon={<div className="w-2 h-2 bg-slate-300 rounded-full" />} title="Arrived at Location" time="Pending" />
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Service Details</h4>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <MdMedicalServices size={24} className="text-blue-600" />
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-500">Service Selected</p>
              <p className="font-bold text-slate-900">AC Ambulance (Premium)</p>
            </div>
            <p className="font-black text-blue-600">৳2500</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <MdPayment size={24} className="text-slate-400" />
            <div>
              <p className="text-xs font-bold text-slate-500">Payment Status</p>
              <p className="font-bold text-slate-900">Pay on Arrival</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-10 py-4 text-red-500 font-bold text-sm border-2 border-red-50 border-dashed rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <FaExclamationCircle /> Cancel Emergency Request
        </button>
      </div>
    </div>
  );
};

const TimelineItem = ({ icon, title, time, active, primary }) => (
  <div className="flex gap-4">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
      {icon}
    </div>
    <div className="flex-1 border-b border-slate-50 pb-4">
      <p className={`font-bold text-sm ${primary ? 'text-blue-600' : active ? 'text-slate-900' : 'text-slate-400'}`}>{title}</p>
      <p className="text-[10px] text-slate-500">{time}</p>
    </div>
  </div>
);

export default Tracking;