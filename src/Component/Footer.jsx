import React from "react";
import "../index.css";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { format } from "date-fns";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const todayDate = format(new Date(), "MMMM do, yyyy");
  const currentTime = format(new Date(), "hh:mm:ss a");

  const FormHandel = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 py-16 transition-colors duration-500">
      <div className="main_container mx-auto px-6 lg:px-4 max-w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-black text-blue-600">
                Roam <span className="text-slate-900 dark:text-white transition-colors">Rides</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Roam Rides blends technology and travel to deliver smarter,
              faster, and safer car experiences — designed for modern explorers.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white">Explore</h3>
            <ul className="space-y-3 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Classic Search</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Store Manager</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white">Contact</h3>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 flex-shrink-0" />
                <span>Jessore Mohihar, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-blue-600 flex-shrink-0" />
                <span className="font-mono">{currentTime}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 flex-shrink-0" />
                <span>Mdmahfuzahmedony@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-600 flex-shrink-0" />
                <span>+880 1309-834483</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white">Newsletter</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Subscribe to get latest updates and offers directly in your inbox.
            </p>
            <form onSubmit={FormHandel} className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full py-3.5 pl-5 pr-14 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <hr className="border-t border-slate-200 dark:border-slate-800 my-12" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Twitter size={20} />, url: "https://x.com/MahfuzAhmedOny" },
              { icon: <Facebook size={20} />, url: "https://www.facebook.com/mahfuzahmedony" },
              { icon: <Instagram size={20} />, url: "https://www.instagram.com/mahfuzahmedony" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright Info */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-black">{todayDate}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {currentYear} <span className="font-bold text-slate-900 dark:text-white">RoamRides</span>. All rights reserved.
            </p>
            <p className="text-xs text-slate-400">
              Developed by <span className="text-blue-600 font-bold hover:underline cursor-pointer">Mahfuz Ahmed</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;