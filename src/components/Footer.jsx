import React from 'react';
import { Link } from 'react-router-dom';
// Using Fa for social/brand icons and Hi for clean UI icons
import { FaFacebookF, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tighter">
              Ambu<span className="text-blue-500">Saver</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner in emergency medical transport. We bridge the gap between patients and hospitals with speed, safety, and care across Dhaka.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/requestAmbulance" className="hover:text-blue-400 transition-colors">Request Ambulance</Link></li>
              <li><Link to="/fare" className="hover:text-blue-400 transition-colors">Fare Estimation</Link></li>
              <li><Link to="/tracking" className="hover:text-blue-400 transition-colors">Live Tracking</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-slate-400">AC Ambulance</li>
              <li className="text-slate-400">ICU & Life Support</li>
              <li className="text-slate-400">Non-AC Emergency</li>
              <li className="text-slate-400">Freezer Van Service</li>
            </ul>
          </div>

          {/* Column 4: Emergency Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Emergency</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <HiOutlinePhone size={24} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">Call 24/7 Support</p>
                  <a href="tel:01710060020" className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    017100-60020
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail size={20} className="text-blue-500" />
                <span>support@ambusaver.com</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker size={20} className="text-blue-500 shrink-0" />
                <span>Savar, Dhaka Division,<br />Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 AmbuSaver. Developed by <span className="text-slate-300 font-medium">Kashfia Meherin Nabila</span>.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-300">Terms of Service</Link>
            <p className="flex items-center gap-1 ml-4">
              Made with <FaHeart size={12} className="text-red-600" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;