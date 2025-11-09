import React, { useContext, useState } from "react";
import { Link } from "react-router";
import "../index.css";

import { AuthContext } from "../AuthProvider/Authprovider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const userProfilePic = user?.photoURL;

  const userName = user?.displayName || "User Name";
  const userEmail = user?.email || "user@example.com";

  return (
    <div className="main_container mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/browse-cars">Browse Cars</Link>
              </li>

              {!user && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-blue-500 font-black text-3xl"
          >
            Roam<span className="text-white">Rides</span>
          </Link>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li>
              <Link to="/" className="font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse-cars" className="font-semibold">
                Browse Cars
              </Link>
            </li>
          </ul>

          {user ? (
            <div className="relative ml-3">
              <img
                src={userProfilePic}
                className="w-[40px] h-[40px] rounded-full cursor-pointer border-2 "
                onClick={handleToggle}
                alt={userName}
              />
              {open && (
                <div className="absolute right-0 mt-5 w-60 bg-white border rounded-lg shadow-lg p-3 z-20">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-center items-center">
                      <img
                        src={userProfilePic}
                        className="w-[100px] h-[100px] rounded-full cursor-pointer border-2 "
                        onClick={handleToggle}
                        alt={userName}
                      />
                    </div>

                    <div className="border-b pb-2 mb-2">
                      <p className="font-bold text-[20px] text-gray-800 text-center break-words">
                        {userName}
                      </p>
                      <p className="text-[16px] text-gray-500 text-center break-words">
                        {userEmail}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="text-left px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="text-left px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-center text-black px-2 py-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-3 space-x-2 hidden lg:flex">
              {" "}
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
