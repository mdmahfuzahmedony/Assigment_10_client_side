import React from "react";
// Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper Modules
import { Autoplay, Pagination } from "swiper/modules";
// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

import { FaStar, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Business Traveler",
      company: "Apex Enterprise",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "Renting a car for my business trips has never been easier. RoamRides provides top-quality vehicles and their booking process is incredibly fast. Highly recommended!",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      company: "Global Tours",
      image: "https://images.unsplash.com/photo-1573496359-7013ac2bebb5?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "The customer support is outstanding. I had to change my booking at the last minute and they handled it without any hassle. The car was clean and in perfect condition.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Adventure Blogger",
      company: "Roam Free",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      rating: 4,
      comment: "Found a great SUV for our mountain trip. The pricing was transparent with no hidden fees. Definitely my go-to marketplace for transportation rental from now on.",
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Event Planner",
      company: "Urban Events",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      comment: "We needed multiple premium cars for a corporate event. RoamRides managed everything perfectly. The providers were professional and the coordination was seamless.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">

      {/* Background Texture (Blue Dots) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      ></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-4 relative z-10">

        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm">
            Client Stories
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            What People{" "}
            <span className="text-blue-500">
              Say
            </span>
          </h2>
        </div>

        {/* --- SWIPER SLIDER --- */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                className="group h-full p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-2 overflow-hidden relative
                bg-slate-50 dark:bg-[#101228] 
                border-slate-100 dark:border-slate-800
                shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* --- TOP SECTION --- */}
                <div className="flex flex-row gap-5 mb-6 items-center">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-blue-500 transition-colors duration-300">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1 text-yellow-400 text-xs mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}
                        />
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {review.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {review.role}
                    </p>
                    <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wide mt-1">
                      {review.company}
                    </p>
                  </div>
                </div>

                {/* --- BOTTOM SECTION --- */}
                <div className="w-full border-t pt-5 border-slate-200 dark:border-slate-800">
                  <div className="flex gap-3">
                    <FaQuoteLeft className="text-3xl text-blue-500/10 dark:text-blue-900/20 flex-shrink-0" />
                    <p className="text-base leading-relaxed italic text-slate-600 dark:text-slate-300">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <a href="#" className="text-xs font-black flex items-center gap-1 text-slate-900 dark:text-white hover:text-blue-500 transition-colors uppercase tracking-widest">
                      Case Study <FaArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <style jsx="true">{`
            .swiper-pagination-bullet-active {
              background-color: #3b82f6 !important; 
              width: 30px !important;
              border-radius: 10px !important;
            }
            .swiper-pagination-bullet {
              background-color: #94a3b8;
              opacity: 0.5;
            }
            .dark .swiper-pagination-bullet {
              background-color: #334155;
            }
          `}</style>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;