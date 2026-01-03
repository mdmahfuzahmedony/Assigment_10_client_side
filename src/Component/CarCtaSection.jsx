import React from "react";
import { NavLink } from "react-router";

const CarCtaSection = () => {
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 items-center gap-16 lg:gap-24">

        {/* Left Side: Two Images (Left up, Right down) */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
          {/* বাম পাশের ইমেজ - একটু উপরে */}
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl h-[300px] md:h-[450px] lg:-mt-12 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Car 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ডান পাশের ইমেজ - একটু নিচে */}
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl h-[300px] md:h-[450px] mt-12 md:mt-20 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Car 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
            Get A Fair Price For Your Car <br />
            <span className="text-blue-500">Sell To Us Today</span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
            We are committed to providing our customers with exceptional
            service, competitive pricing, and a wide range of vehicle options.
          </p>

          <ul className="space-y-5">
            {[
              "One of the largest car service providers nationwide.",
              "24/7 roadside assistance for complete peace of mind.",
              "4 out of 5 cars fixed right at the roadside."
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full text-xs font-bold shadow-lg shadow-blue-500/30">
                  ✓
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-bold text-base md:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <NavLink to={"/browsecars"} className="inline-flex items-center gap-3 bg-blue-600 text-white font-black px-12 py-5 rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-500/30 uppercase tracking-widest text-sm">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarCtaSection;