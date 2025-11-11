import React from "react";
import "../index.css"; // Ensure this includes any custom animations if you add them
import WhyChooseUs from "../Component/WhyChose";
import CallToAction from "../Component/CalltoAction";
import NewsAndArticles from "../Component/NewsArticle";
import CarCtaSection from "../Component/CarCtaSection";
import ProductCarouselSection from "../Component/ProductCarouselSection";
import TestimonialSection from "../Component/TestimonialSection";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";

const Home = () => {

  const cardata = useLoaderData()
  console.log(cardata);
  const sliceProduct = Array.isArray(cardata) ? cardata.slice(0, 8) : [];


  return (
    <div>
      <div
        className="relative z-0 min-h-[700px] flex flex-col items-center justify-center p-4 "
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/car-with-headlights-is-driving-through-desert_23-2151850148.jpg?t=st=1762704107~exp=1762707707~hmac=6b6ce097fb2be6592232041fc81ab2c508b860c7d80c8565617024065d6c7537&w=1060")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto space-y-7 px-4">
          {" "}
          <p>Get Anything on Rent Within Couple of Hours</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-lg animate-fade-in-up delay-200">
            Transportation Rental
            <span className="text-blue-400">Marketplace</span>
          </h1>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5 animate-fade-in-up delay-300">
            <div className="relative w-full sm:w-3/5 lg:w-2/5">
              <input
                type="search"
                required
                placeholder="Search your car..."
                className="w-full py-4 pl-6 pr-16 rounded-l-2xl rounded-b-2xl text-gray-800 bg-white bg-opacity-95 border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 shadow-xl transition-all duration-300 placeholder-gray-500"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-10 rounded-l-2xl rounded-b-2xl shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              {" "}
    
              Search Car
            </button>
          </div>
        </div>
      </div>
    
      <div className="max-w-[1400px] mx-auto py-20">
          <h1 className="text-[30px] font-black mb-5">Explore All Vehicles</h1>
        <div className="grid grid-cols-4 gap-5 ">
            {
          sliceProduct.map(data => <ProductCard key={data._id} car={data} ></ProductCard>)
        }
        </div>
        
        
      </div> 
      <ProductCarouselSection></ProductCarouselSection>
      <WhyChooseUs></WhyChooseUs>
      <NewsAndArticles></NewsAndArticles>
      <CarCtaSection></CarCtaSection>
      <TestimonialSection></TestimonialSection>
      <CallToAction></CallToAction>
    
    </div>
  );
};

export default Home;
