import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdPayment, MdMedicalServices } from 'react-icons/md';

// Fix for Leaflet Marker Icons
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Tracking = () => {
  const pickup = [23.8583, 90.2667];
  const ambulance = [23.8650, 90.2750];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex flex-col lg:flex-row">
      
      {/* 1. LEFT SIDE: INTERACTIVE MAP */}
      <div className="w-full lg:w-2/3 h-100 lg:h-[calc(100vh-80px)] sticky top-20">
        <MapContainer center={pickup} zoom={14} className="h-full w-full z-0">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pickup} icon={customIcon}><Popup>Pickup Point</Popup></Marker>
          <Marker position={ambulance} icon={customIcon}><Popup>Ambulance AS-402</Popup></Marker>
        </MapContainer>
        
        {/* Floating Telemetry Stats */}
        <div className="absolute bottom-6 left-6 z-1000 hidden md:flex gap-4">
          <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><FaTachometerAlt size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Speed</p>
              <p className="font-black text-slate-900">45 km/h</p>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><FaGasPump size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Fuel</p>
              <p className="font-black text-slate-900">82%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: INFORMATION DASHBOARD */}
      <div className="w-full lg:w-1/3 p-6 lg:p-8 bg-white border-l border-slate-200 overflow-y-auto max-h-[calc(100vh-80px)]">
        
        {/* Header Status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Tracking Request</h1>
            <p className="text-sm text-slate-500">ID: #AMB-99201</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">On Duty</span>
          </div>
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

        {/* Section: Status Timeline */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Live Status</h4>
          <div className="space-y-6">
            <TimelineItem icon={<FaCheckCircle />} title="Request Received" time="12:40 PM" active />
            <TimelineItem icon={<FaCheckCircle />} title="Driver Assigned" time="12:42 PM" active />
            <TimelineItem icon={<div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />} title="On the way to Pickup" time="ETA: 8 mins" active primary />
            <TimelineItem icon={<div className="w-2 h-2 bg-slate-300 rounded-full" />} title="Arrived at Location" time="Pending" />
          </div>
        </div>

        {/* Section: Service Summary */}
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

        {/* Emergency Cancel */}
        <button className="w-full mt-10 py-4 text-red-500 font-bold text-sm border-2 border-red-50 border-dashed rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <FaExclamationCircle /> Cancel Emergency Request
        </button>
      </div>
    </div>
  );
};

// Helper Component for Timeline
const TimelineItem = ({ icon, title, time, active, primary }) => (
  <div className="flex gap-4">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
      {icon}
    </div>
    <div className="flex-1 border-b border-slate-50 pb-4">
      <p className={`font-bold text-sm ${primary ? 'text-blue-600' : 'text-slate-900'} ${!active && 'text-slate-400'}`}>{title}</p>
      <p className="text-[10px] text-slate-500">{time}</p>
    </div>
  </div>
);

export default Tracking;