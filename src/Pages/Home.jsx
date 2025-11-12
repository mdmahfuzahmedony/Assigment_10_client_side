import React, { useEffect, useState } from "react"; // useState যোগ করুন
import "../index.css";
import WhyChooseUs from "../Component/WhyChose";
import CallToAction from "../Component/CalltoAction";
import NewsAndArticles from "../Component/NewsArticle";
import CarCtaSection from "../Component/CarCtaSection";
import ProductCarouselSection from "../Component/ProductCarouselSection";
import TestimonialSection from "../Component/TestimonialSection";
import ProductCard from "../Component/ProductCard";

const Home = () => {
  const [allCars, setAllCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [errorLoadingCars, setErrorLoadingCars] = useState(false);

 

  useEffect(() => {
    const fetchAllCars = async () => {
      // setLoadingCars(true);
      // setErrorLoadingCars(false);
      try {
        const response = await fetch(
          "https://assigmen-10-server-side.vercel.app/carProduct"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch car products");
        }
        const data = await response.json();
        setAllCars(data); 
      } catch (error) {
        console.error("Error fetching all cars:", error);
        setErrorLoadingCars(true);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchAllCars();
  }); 

  const sliceProduct = Array.isArray(allCars) ? allCars.slice(0, 8) : []; // স্টেটে থাকা ডেটা ব্যবহার করুন

  if (loadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xl text-gray-700 ml-3">Loading cars...</p>
      </div>
    );
  }

  if (errorLoadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          Failed to load car products. Please try again later.
        </p>
      </div>
    );
  }

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
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-10 r rounded-full shadow-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              {" "}
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* home product  */}

      <div className="max-w-[1400px] mx-auto py-20">
        <h1 className="text-3xl text-center font-black mb-10">
          Explore All <span className="text-blue-500">Vehicles</span>
        </h1>
        <div className="border mb-10 border-base-300"></div>
        <div className="grid grid-cols-4 gap-5  ">
          {sliceProduct.map((car) => (
            <ProductCard key={car._id} car={car}></ProductCard>
          ))}
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
