import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar, FaBed, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';

const HospitalSelection = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the 25-item dataset from your public folder
    fetch('/data/hospitals.json')
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading hospitals:", err));
  }, []);

  // Filter logic: Checks both Name and "Best For" specialty
  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.bestFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Available <span className="text-blue-600">Hospitals</span>
          </h1>
          <p className="text-slate-500 mb-8 max-w-xl">
            Real-time bed availability and specialty matching. Search for a specific hospital or medical condition.
          </p>

          <div className="relative group max-w-2xl">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search e.g. 'Enam', 'Cardiac', 'Cancer'..."
              className="w-full pl-14 pr-6 py-5 bg-white shadow-xl shadow-slate-200/50 rounded-2xl outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital) => (
            <div 
              key={hospital.id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group"
            >
              {/* Image Area */}
              <div className="relative h-52 w-full overflow-hidden rounded-4xl">
                <img 
                  src={hospital.image} 
                  alt={hospital.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                  {hospital.category}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                  <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                    <FaStar className="text-orange-400" size={12} />
                    <span className="text-xs font-bold text-orange-700">{hospital.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>{hospital.location} • <span className="font-bold text-slate-700">{hospital.distance}</span></span>
                </div>

                {/* Highlighted Specialty */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Recommended For</p>
                  <p className="text-sm font-bold text-slate-800">{hospital.bestFor}</p>
                </div>

                {/* Bed Availability & Contact */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                      <FaBed size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Available Beds</p>
                      <p className="font-bold text-slate-900">{hospital.availableBeds}</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${hospital.contact}`} 
                    className="w-10 h-10 bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all"
                  >
                    <FaPhoneAlt size={14} />
                  </a>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 py-4 bg-slate-900 group-hover:bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                  Set as Destination <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No hospitals found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalSelection;