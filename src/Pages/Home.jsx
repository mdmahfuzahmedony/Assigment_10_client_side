import React, { useEffect, useState } from "react";
import "../index.css";
import WhyChooseUs from "../Component/WhyChose";
import CallToAction from "../Component/CalltoAction";
import NewsAndArticles from "../Component/NewsArticle";
import CarCtaSection from "../Component/CarCtaSection";
import ProductCarouselSection from "../Component/ProductCarouselSection";
import TestimonialSection from "../Component/TestimonialSection";
import ProductCard from "../Component/ProductCard";
import { NavLink } from "react-router"; // "react-router-dom" হলে সেটি ব্যবহার করুন
import Categories from "../Component/catagory";

const Home = () => {
  const [allCars, setAllCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [errorLoadingCars, setErrorLoadingCars] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchAllCars = async () => {
      setLoadingCars(true);
      setErrorLoadingCars(false);
      try {
        const response = await fetch(
          "https://assigmen-10-server-side.vercel.app/carProduct"
        );
        if (!response.ok) throw new Error("Failed to fetch car products");
        const data = await response.json();
        setAllCars(data);
        setFilteredCars(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching all cars:", error);
        setErrorLoadingCars(true);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchAllCars();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCars(allCars.slice(0, 8));
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const newFilteredCars = allCars.filter(
        (car) => car.carName && car.carName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCars(newFilteredCars.slice(0, 8));
    }
  }, [searchQuery, allCars]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  if (loadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden">

      {/* Hero / Banner Section - FIXED Responsive */}
      <div
        className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[750px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-photo/car-with-headlights-is-driving-through-desert_23-2151850148.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll", // মোবাইলে ফিক্সড ব্যাকগ্রাউন্ড ইস্যু করে তাই কন্ডিশনাল
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white w-full max-w-6xl mx-auto px-4 py-12">
          <p className="text-blue-400 font-medium tracking-widest uppercase mb-4 animate-fade-in text-sm md:text-base">
            Get Anything on Rent Within Couple of Hours
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8 drop-shadow-2xl">
            Transportation Rental <br className="hidden md:block" />
            <span className="text-blue-500 inline-block mt-2">Marketplace</span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95">
              Explore Our Services
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-10 rounded-full border border-white/30 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <Categories />

      {/* Car List Section */}
      <div className="max-w-[1440px] mx-auto py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Explore <span className="text-blue-500">All Cars</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect vehicle for your needs from our extensive collection of premium and budget-friendly cars.
          </p>
        </div>

        {/* Search Bar & Filter Area */}
        <div className="flex flex-col md:flex-row gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 justify-between items-center p-5 mb-12 rounded-2xl shadow-sm">
          <div className="w-full md:w-auto flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by car name..."
                className="w-full py-3.5 pl-12 pr-6 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <NavLink
            to={"/browsecars"}
            className="w-full md:w-auto text-center bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold py-3.5 px-10 rounded-xl transition duration-300"
          >
            View All
          </NavLink>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <ProductCard key={car._id} car={car} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 text-xl font-medium">No cars found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <WhyChooseUs />
      <NewsAndArticles />
      <CarCtaSection />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
};

export default Home;