import React from 'react';
import { ShieldCheck, Zap, MapPin, PhoneCall, ArrowRight } from 'lucide-react';
import BannerImg from "../assets/Banner.jpg"

const Banner = () => {
  return (
    <section className="relative min-h-175 bg-slate-50 flex items-center overflow-hidden py-20 px-4 md:px-12">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-125 h-125 bg-red-100/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content: The Text */}
        <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Emergency Response Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
            Saving Lives with <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 animate-gradient-x">
              AmbuSaver
            </span>
          </h1>

          <p className="text-slate-500 text-xl font-light max-w-xl mx-auto lg:mx-0">
            Dhaka's most intelligent ambulance dispatch network. We bridge the gap between emergency and recovery with <span className="font-semibold text-blue-600">precision logistics.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button className="btn btn-lg bg-blue-600 hover:bg-blue-700 border-none text-white rounded-2xl px-10 shadow-xl shadow-blue-200 group flex items-center gap-3">
              <PhoneCall size={20} className="group-hover:rotate-12 transition-transform" />
              <span>01700000000</span>
            </button>
            
            <button className="btn btn-lg btn-ghost border-slate-200 text-slate-700 hover:bg-white px-10 rounded-2xl flex items-center gap-2 group">
              <span>Book Online</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* New Horizontal Feature List */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 opacity-80">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" />
              <span className="text-sm font-semibold text-slate-600">Instant Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-blue-500" />
              <span className="text-sm font-semibold text-slate-600">Smart Routing</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck size={20} />
              <span className="text-sm font-semibold text-slate-600">Verified Medics</span>
            </div>
          </div>
        </div>

        {/* Right Content: The Visual */}
        <div className="order-1 lg:order-2 relative group">
          {/* Main Visual Frame */}
          <div className="relative z-20 rounded-[40px] overflow-hidden border-12 border-white shadow-2xl transition-all duration-500 hover:rotate-2 hover:scale-[1.03]">
            <img 
              src={BannerImg} 
              alt="Medical Service" 
              className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 via-transparent to-transparent" />
          </div>

          {/* Floating Glassmorphism Widget */}
          <div className="absolute top-10 -right-4 md:-right-10 z-30 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 animate-bounce-slow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">10</div>
                <div className="text-sm">
                  <p className="font-black text-slate-800">Minutes</p>
                  <p className="text-xs text-slate-500">Max Response Time</p>
                </div>
              </div>
              <div className="h-0.5 w-full bg-slate-100" />
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="driver" />
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">+50</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;