import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router"; // Use react-router-dom for v6+
import "../index.css";
import { AuthContext } from "../AuthProvider/Authprovider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  console.log("User object:", user); // Log the full user object for inspection
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
        setOpen(false);
        navigate("/login"); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Use a fallback if userProfilePic is null or undefined
  const userProfilePic = user?.photoURL; // Use DefaultAvatar if photoURL is not available
  const userName = user?.displayName || user?.email || "User"; // Fallback for display name
  const userEmail = user?.email || "N/A";

  const navLinks = (
    <>
      <li>
        <Link to="/" className="font-semibold">
          Home
        </Link>
      </li>
      <li>
        <Link to="/browsecars" className="font-semibold">
          Browse Cars
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/add-car" className="font-semibold">
              Add Car
            </Link>
          </li>
          <li>
            <Link to="/my-listings" className="font-semibold">
              My Listings
            </Link>
          </li>
          <li>
            <Link to="/my-bookings" className="font-semibold">
              My Bookings
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-sm">
      {" "}
      {/* Added bg-white for visibility */}
      <div className="navbar max-w-[1400px] mx-auto">
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
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
              {!user && (
                <li>
                  <Link to="/login" className="font-semibold">
                    Login / Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-blue-500 font-black text-3xl"
          >
            Roam<span className="text-black">Rides</span>
          </Link>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            {navLinks}
          </ul>

          {user ? (
            <div className="relative ml-3" ref={dropdownRef}>
              <img
                src={userProfilePic}
                g
                className="w-[40px] h-[40px] rounded-full cursor-pointer border-2 border-blue-500 object-cover"
                the
                space
                onClick={handleToggle}
                alt={userName}
                onError={(e) => {
                  e.target.src = console.log(
                    "Image load error, using default avatar."
                  );
                }}
              />
              {open && (
                <div className="absolute right-0 mt-5 w-60 bg-base-300 border rounded-lg shadow-lg p-3 z-20">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-center items-center">
                      <img
                        src={userProfilePic}
                        className="w-[80px] h-[80px] rounded-full cursor-pointer border-2 mb-2 object-cover"
                        alt={userName}
                        onError={(e) => {
                          e.target.src = console.log(
                            "Image load error, using default avatar."
                          );
                        }}
                      />
                    </div>

                    <div className="border-b pb-2 mb-2">
                      <p className="font-bold text-[18px] text-gray-100 text-center break-words">
                        {userName}
                      </p>
                      <p className="text-[14px]  text-gray-400 mt-4 text-center break-words">
                        {userEmail}
                      </p>
                    </div>
                    
                    
                    <button
                      onClick={handleLogout}
                      className="text-center px-2 py-1 text-red-700 hover:bg-red-50 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-3 space-x-2 hidden lg:flex">
              <Link
                to="/login"
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 border-none text-white"
              >
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
