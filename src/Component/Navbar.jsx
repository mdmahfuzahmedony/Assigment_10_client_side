import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/Authprovider";
import { LayoutDashboard, UserCircle } from "lucide-react"; // আইকন যোগ করা হয়েছে

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
      <li><Link to="/" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500">Home</Link></li>
      <li><Link to="/browsecars" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500">Browse Cars</Link></li>
      <li><Link to="/about" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500">About</Link></li>
      <li><Link to="/blogs" className="font-semibold text-slate-700 dark:text-gray-200 hover:text-blue-500">Blogs</Link></li>
      
     
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white dark:bg-[#0f172a] border-b dark:border-slate-800 transition-colors duration-300">
      <div className="navbar max-w-[1500px] mx-auto px-4 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-slate-800 rounded-box w-52 border dark:border-slate-700">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-blue-500 font-black text-2xl lg:text-3xl">Roam<span className="text-slate-900 dark:text-white">Rides</span></Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-4">
          <input onChange={handleTheme} type="checkbox" checked={theme === "dark"} className="toggle toggle-info toggle-sm" />
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img src={userProfilePic} className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 object-cover" onClick={handleToggle} alt="user" />
              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl shadow-2xl p-5 z-50">
                  <div className="flex flex-col items-center">
                    <img src={userProfilePic} className="w-20 h-20 rounded-full border-4 border-blue-500/20 object-cover mb-3" alt="user" />
                    <p className="font-bold text-lg text-slate-900 dark:text-white truncate w-full text-center">{user?.displayName || "User"}</p>
                    <p className="text-sm text-slate-500 mb-4 truncate w-full text-center">{user?.email}</p>
                    <div className="w-full border-t dark:border-slate-700 pt-3">
                      <Link to="/dashboard" onClick={() => setOpen(false)} className="btn btn-sm btn-ghost w-full mb-2 dark:text-white">Profile Dashboard</Link>
                      <button onClick={handleLogout} className="btn btn-sm btn-ghost text-red-500 w-full hover:bg-red-50">Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="btn btn-sm bg-blue-500 border-none text-white px-5">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;