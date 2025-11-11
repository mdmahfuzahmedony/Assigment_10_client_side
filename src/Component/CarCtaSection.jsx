import React from "react";

const CarCtaSection = () => {
  return (
    <section className=" py-16 px-6">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Left Image */}
        <div className="w-full overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Car"
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            Get A Fair Price For Your Car <br /> Sell To Us Today
          </h2>
          <p className="text-gray-400 mb-6 text-[17px] leading-relaxed">
            We are committed to providing our customers with exceptional
            service, competitive pricing, and a wide range of vehicle options.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg font-bold">✓</span>
              <span className="text-gray-400">
                We are one of the largest car service providers nationwide.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg font-bold">✓</span>
              <span className="text-gray-400">
                You get 24/7 roadside assistance for peace of mind.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg font-bold">✓</span>
              <span className="text-gray-400">
                4 out of 5 cars are fixed right at the roadside.
              </span>
            </li>
          </ul>

          <button className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-l-2xl rounded-b-2xl hover:bg-blue-700 transition-all">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarCtaSection;
