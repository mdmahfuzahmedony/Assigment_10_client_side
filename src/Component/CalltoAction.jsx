import React from "react";
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
import { Phone, CarFront, ArrowRight } from 'lucide-react'; // আইকন ব্যবহারের জন্য

const CallToAction = () => {
  const phoneNumber = "01309834483";

  const handleCallUsClick = () => {
    toast.info(
      <div className="flex flex-col items-center p-2">
        <p className="mb-4 font-bold text-slate-800">Do you want to call us?</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              window.open(`tel:${phoneNumber}`, "_self");
              toast.dismiss();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold"
          >
            Yes, Call Now
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
        position: "top-center",
      }
    );
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-[1500px] mx-auto">

        {/* মেইন CTA কার্ড - যা লাইট ও ডার্ক মোডে উজ্জ্বল নীল থাকবে */}
        <div className="bg-blue-600 dark:bg-blue-800 rounded-[3rem] p-10 lg:p-20 text-white relative overflow-hidden shadow-2xl">

          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

            <div className="text-center lg:text-left max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Let's Start Your <br /> Next Ride.
              </h2>
              <p className="text-lg md:text-xl text-blue-100 font-medium opacity-90">
                Ready to hit the road? Our team is here to help you find the
                perfect vehicle for your journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              {/* Find Car Button */}
              <NavLink
                to={"/browsecars"}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-700 font-black rounded-2xl shadow-xl hover:bg-slate-100 transition-all hover:scale-105 uppercase tracking-widest text-sm"
              >
                <CarFront size={20} /> Find Your Car
              </NavLink>

              {/* Contact Button */}
              <button
                onClick={handleCallUsClick}
                className="flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 bg-blue-700/50 backdrop-blur-md text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all hover:scale-105 uppercase tracking-widest text-sm"
              >
                <Phone size={20} /> Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;