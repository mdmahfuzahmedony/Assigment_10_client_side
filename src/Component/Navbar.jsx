import React, { useState } from "react";
import "../index.css";
import image1 from "../Image/car1.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="main_container  mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Browse Cars</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-blue-500 font-black text-3xl">
            Roam<span className="text-white">Rides</span>
          </a>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="font-semibold">Home</a>
            </li>
            <li>
              <a className="font-semibold">Browse Cars</a>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <div className="relative ml-3">
            <img
              src={image1}
              className="w-[40px] h-[40px] rounded-full cursor-pointer border-2 border-blue-500"
              onClick={handleToggle}
              alt="User"
            />
              {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-20">
              <div className="flex flex-col space-y-2">
                <div className="border-b pb-2">
                  <p className="font-bold text-gray-800">Mahfuz Ahmed</p>
                  <p className="text-sm text-gray-500">mahfuz@gmail.com</p>
                </div>
                <button className="text-left px-2 py-1 hover:bg-gray-100 rounded">
                  Profile
                </button>
                <button className="text-left px-2 py-1 hover:bg-gray-100 rounded">
                  Settings
                </button>
                <button className="text-left px-2 py-1 hover:bg-red-100 text-red-600 rounded">
                  Logout
                </button>
              </div>
            </div>
          )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Navbar;
