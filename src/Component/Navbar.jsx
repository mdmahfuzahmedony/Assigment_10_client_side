import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router"; // বা "react-router-dom" ব্যবহার করলে সেটি দিন
import { AuthContext } from "../AuthProvider/Authprovider";
import { Menu, X } from "lucide-react"; // আইকনগুলো ব্যবহার করলে রেসপন্সিভ মেনু দেখতে ভালো লাগে

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleToggle = () => setOpen(!open);

  const handleLogout = () => {
    logOut().then(() => {
      setOpen(false);
      navigate("/login");
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const userProfilePic = user?.photoURL || "https://i.ibb.co/VtP8R1d/Default-Avatar.jpg";

  const navLinks = (
    <>
      <li><Link to="/" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500 py-2">Home</Link></li>
      <li><Link to="/browsecars" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500 py-2">Browse Cars</Link></li>
      <li><Link to="/about" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500 py-2">About</Link></li>
      <li><Link to="/blogs" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500 py-2">Blogs</Link></li>
      <li><Link to="/contact" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500 py-2">Contact</Link></li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-[100] shadow-sm bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b dark:border-slate-800 transition-all duration-300">
      <div className="navbar max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 h-16 sm:h-20">

        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 sm:p-2 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-xl bg-white dark:bg-slate-800 rounded-2xl w-60 border dark:border-slate-700 space-y-2">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-blue-500 font-black text-xl sm:text-2xl lg:text-3xl tracking-tight ml-1">
            Roam<span className="text-slate-900 dark:text-white">Rides</span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 xl:gap-4">{navLinks}</ul>
        </div>

        {/* Navbar End: Theme & Profile */}
        <div className="navbar-end gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <div className="flex items-center">
            <input onChange={handleTheme} type="checkbox" checked={theme === "dark"} className="toggle toggle-info toggle-xs sm:toggle-sm" />
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={userProfilePic}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer border-2 border-blue-500 object-cover hover:scale-105 transition-transform"
                onClick={handleToggle}
                alt="user"
              />
              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-2xl p-5 z-[110] animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col items-center">
                    <img src={userProfilePic} className="w-16 h-16 rounded-full border-4 border-blue-500/20 object-cover mb-3" alt="user" />
                    <p className="font-bold text-base text-slate-900 dark:text-white truncate w-full text-center">{user?.displayName || "User"}</p>
                    <p className="text-xs text-slate-500 mb-4 truncate w-full text-center">{user?.email}</p>
                    <div className="w-full border-t dark:border-slate-700 pt-3 flex flex-col gap-1">
                      <Link to="/dashboard" onClick={() => setOpen(false)} className="btn btn-sm btn-ghost w-full justify-start dark:text-white font-medium">Profile Dashboard</Link>
                      <button onClick={handleLogout} className="btn btn-sm btn-ghost text-red-500 w-full justify-start hover:bg-red-50 dark:hover:bg-red-900/10 font-medium">Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login Button: Now visible on mobile too but slightly smaller */
            <Link to="/login" className="btn btn-xs sm:btn-sm bg-blue-500 border-none hover:bg-blue-600 text-white px-3 sm:px-6 rounded-lg transition-all">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;