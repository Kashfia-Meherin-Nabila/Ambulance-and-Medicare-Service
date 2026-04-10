import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaChevronRight } from 'react-icons/fa';

const HospitalSelection = ({ limit }) => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/hospitals.json')
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading hospitals:", err);
        setLoading(false);
      });
  }, []);

  // Filter based on search input
  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.bestFor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply limit if passed (for Home Page), otherwise show filtered results
  const displayedHospitals = limit ? filteredHospitals.slice(0, limit) : filteredHospitals;

  const handleSelectHospital = (hospital) => {
    navigate('/requestAmbulance', { 
      state: { 
        id: hospital.id,
        distance: hospital.distance 
      } 
    });
  };

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-slate-400">Loading Hospitals...</p>
    </div>
  );

  return (
    <div className={`bg-slate-50 ${limit ? 'py-16' : 'pt-28 pb-20'} px-4`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section: Only show search if we are NOT on the limited home view */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            {limit ? "Top Rated" : "Available"} <span className="text-blue-600">Hospitals</span>
          </h1>
          
          {!limit && (
            <div className="relative group max-w-2xl">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search specialty or hospital name..."
                className="w-full pl-14 pr-6 py-5 bg-white shadow-xl rounded-2xl outline-none focus:ring-2 ring-blue-500 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-2 hover:shadow-2xl transition-all group">
              <div className="relative h-52 w-full overflow-hidden rounded-4xl">
                <img 
                  src={hospital.image} 
                  alt={hospital.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{hospital.name}</h3>
                  {hospital.rating && (
                    <span className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                      <FaStar /> {hospital.rating}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>{hospital.location} • <b>{hospital.distance}</b></span>
                </div>
                <button 
                  onClick={() => handleSelectHospital(hospital)}
                  className="w-full py-4 bg-slate-900 group-hover:bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  Set as Destination <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button: Only visible when the 'limit' prop is used (Home Page) */}
        {limit && hospitals.length > limit && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => navigate('/hospitalSelection')}
              className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black rounded-3xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-lg shadow-slate-200"
            >
              View All Hospitals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalSelection;