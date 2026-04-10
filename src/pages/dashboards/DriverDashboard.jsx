import { useState } from "react";

const DriverDashboard = () => {
  // Helper to fetch data
  const getRidesFromStorage = () => {
    try {
      const saved = localStorage.getItem("rides");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse rides:", err);
      return [];
    }
  };

  const [rides, setRides] = useState(getRidesFromStorage());

  // Generalized update function to keep state and localStorage in sync
  const updateRideStatus = (id, newStatus) => {
    const updatedRides = rides.map((ride) =>
      ride.id === id ? { ...ride, status: newStatus } : ride
    );

    setRides(updatedRides);
    localStorage.setItem("rides", JSON.stringify(updatedRides));
  };

  const refreshRides = () => {
    setRides(getRidesFromStorage());
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <span>🚑</span> Driver Dashboard
        </h1>

        <button
          onClick={refreshRides}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all shadow-md active:scale-95"
        >
          Refresh List
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto">
        {rides.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">No rides available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                {/* LEFT INFO */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-800">
                      {ride.hospital}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider
                      ${
                        ride.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : ride.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {ride.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 text-sm text-slate-600">
                    <p>📍 Distance: <span className="font-semibold text-slate-900">{ride.distance} km</span></p>
                    <p>💰 Fare: <span className="font-semibold text-slate-900">{ride.fare} BDT</span></p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    disabled={ride.status !== "Pending"}
                    onClick={() => updateRideStatus(ride.id, "Accepted")}
                    className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium transition-colors
                      ${ride.status === "Pending" 
                        ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                  >
                    Accept
                  </button>

                  <button
                    disabled={ride.status === "Cancelled" || ride.status === "Accepted"}
                    onClick={() => updateRideStatus(ride.id, "Cancelled")}
                    className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium transition-colors
                      ${ride.status === "Pending" 
                        ? "bg-white border border-rose-200 text-rose-600 hover:bg-rose-50" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border-transparent"}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;