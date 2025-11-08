import React from "react";
import "../index.css"
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
    <footer className="bg-[#1a2130] text-white py-12 md:py-16">
      <div className="main_container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center mb-4">
              <h1 className="text-3xl font-black text-blue-500">
                Roam <span className="text-white">Rides</span>
              </h1>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Roam Rides blends technology and travel to deliver smarter,
              faster, and safer car experiences — designed for modern explorers.
            </p>
          </div>

          <div>
            <h3 className="text-[20px] font-bold mb-6">Explore</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Classic Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Store Manager
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  How it works
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>Jessore Mohihar, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>{currentTime}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>Mdmahfuzahmedony@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <span>01309834483</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              There are many variations of simple lorem ipsum available for not.
            </p>
            <div className="relative">
              <form action="" onSubmit={FormHandel}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full py-3 pl-4 pr-12 rounded-md bg-[#252f40] border border-[#3e4a5d] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <Mail className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-700 my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400 text-sm">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a
              href="https://x.com/MahfuzAhmedOny"
              className="bg-[#252f40] p-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/mahfuzahmedony"
              className="bg-[#252f40] p-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/mahfuzahmedony"
              className="bg-[#252f40] p-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <div className="text-center sm:text-right">
            <p classname="mt">{todayDate}</p>
            <p>© {currentYear} RoamRides. All rights reserved.</p>
            <p>
              Develop by <span className="text-blue-700">Mahfuz ahmed</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
