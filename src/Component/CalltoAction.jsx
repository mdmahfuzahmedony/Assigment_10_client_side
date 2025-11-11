import React from "react";
import { Link, NavLink } from 'react-router';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-800 rounded-3xl p-8 md:p-12 lg:p-16 text-white shadow-2xl relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Let's Start Your Next Ride.
              </h2>
              <p className="text-lg md:text-xl text-blue-100">
                Ready to hit the road? Our team is here to help you find the
                perfect vehicle for your journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 lg:mt-0">
              <NavLink to={"/browsecars"} className="flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <span className="mr-2 text-2xl">🚚</span> Find Your Car
              </NavLink>
              <button className="flex items-center justify-center px-8 py-4 border-2 border-white bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                <span className="mr-2 text-2xl">📞</span> Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
