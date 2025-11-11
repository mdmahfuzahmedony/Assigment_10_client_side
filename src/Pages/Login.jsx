import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import carImage from "../Image/car1.jpeg";
import { AuthContext } from "../AuthProvider/Authprovider";
import { useNavigate } from "react-router"; // Change from 'react-router' to 'react-router-dom'
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext); 
  const fromHandel = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;


    signInUser(email, password)
      .then((result) => { 
        toast.success("Login Successful!");
        console.log("Logged in user:", result.user); 
        Navigate("/home");
      })
      .catch((err) => toast.error(`Login failed: ${err.message}`)); 
  };
  const signINgoogle = () => {
    signInWithGoogle()
      .then((result) => { 

        console.log("Google Logged in user:", result.user);

        toast.success("Logged in with Google!");
        Navigate("/home");
      })
      .catch((err) => toast.error(`Google sign-in failed: ${err.message}`));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="hero bg-base-200 min-h-[80vh] w-full max-w-5xl rounded-lg shadow-xl overflow-hidden">
        <div className="hero-content flex-col lg:flex-row p-0 w-full h-full">
      
          <div
            className="relative w-full lg:w-1/2 h-64 lg:h-full flex items-center justify-center text-white p-4"
            style={{
              backgroundImage: `url(${carImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 text-center">
              <h1 className="text-[20px] md:text-6xl text-white font-bold">
                Log <span className="text-blue-500">In</span>
              </h1>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-base-200 h-full">
            <h1 className="text-4xl font-bold text-white text-center mb-6">
              Welcome <span className="text-blue-500">Back!</span>
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Sign in to manage your bookings and explore new rides.
            </p>

            <div className="card w-full max-w-sm mx-auto shadow-none">
              <div className="card-body p-0">
                <form onSubmit={fromHandel}>
                  <fieldset className="fieldset space-y-4">
                    <div>
                      <label className="label block text-gray-500 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        name="email"
                      />
                    </div>

                    <div className="relative">
                      <label className="label block text-gray-500 text-sm font-bold mb-2">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        name="password"
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-[43px] text-gray-500 hover:text-blue-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <div className="text-right">
                      <a
                        href="#"
                        className="link link-hover text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button className="btn btn-neutral w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300">
                      Login
                    </button>
                  </fieldset>
                </form>

                <div className="divider text-gray-500 my-8">OR</div>

                <button
                  onClick={signINgoogle}
                  className="btn btn-outline w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition duration-300"
                >
                  Sign in with Google
                </button>

                <p className="text-center text-gray-600 mt-6">
                  Don’t have an account?{" "}
                  <a
                    href="/register"
                    className="link link-hover text-blue-600 hover:underline font-semibold"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;