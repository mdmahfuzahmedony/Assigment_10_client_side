import React, { useEffect, useState } from "react";
import "../index.css";
import WhyChooseUs from "../Component/WhyChose";
import CallToAction from "../Component/CalltoAction";
import NewsAndArticles from "../Component/NewsArticle";
import CarCtaSection from "../Component/CarCtaSection";
import ProductCarouselSection from "../Component/ProductCarouselSection";
import TestimonialSection from "../Component/TestimonialSection";
import ProductCard from "../Component/ProductCard";
import { NavLink } from "react-router";

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
        if (!response.ok) {
          throw new Error("Failed to fetch car products");
        }
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
        (car) =>
          car.carName && car.carName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCars(newFilteredCars.slice(0, 8));
    }
  }, [searchQuery, allCars]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // লোডিং স্টেট ডার্ক মোড সাপোর্ট
  if (loadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xl text-gray-700 dark:text-gray-300 ml-3">Loading cars...</p>
      </div>
    );
  }

  if (errorLoadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <p className="text-xl text-red-500">
          Failed to load car products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    // মেইন র‍্যাপার - যা ডার্ক মোড সাপোর্ট করবে
    <div className="bg-white dark:bg-[#020617] transition-colors duration-500">

      {/* ব্যানার সেকশন - অপরিবর্তিত ডিজাইন */}
      <div
        className="relative z-0 min-h-[700px] flex flex-col items-center justify-center p-4"
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
          <p>Get Anything on Rent Within Couple of Hours</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-lg animate-fade-in-up delay-200">
            Transportation Rental
            <span className="text-blue-400">Marketplace</span>
          </h1>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5 animate-fade-in-up delay-300">
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-10 rounded-full shadow-xl transition duration-300 transform hover:scale-105">
              Explore Our Services
            </button>
          </div>
        </div>
      </div>

      {/* কার লিস্ট সেকশন - ডার্ক মোড ফিক্সড */}
      <div className="max-w-[1500px] mx-auto py-20 px-4 lg:px-0">
        <h2 className="text-3xl text-center  md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
        Explore <span className="text-blue-500">All Cars</span>
        </h2>
        <p className="text-center py-2 text-gray-600 dark:text-gray-400 mb-10">
          Find the perfect vehicle for your needs
        </p>

        {/* সার্চ বার এরিয়া - ডার্ক মোড ফিক্সড */}
        <div className="flex flex-col md:flex-row bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 justify-between items-center p-4 mb-10 rounded-xl shadow-sm">
          <div className="flex-grow md:mr-4 w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search by car name..."
              className="w-full md:w-[350px] py-3 px-6 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <NavLink
              to={"/browsecars"}
              className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
            >
              More Products
            </NavLink>
          </div>
        </div>

        {/* গ্রিড এরিয়া */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <ProductCard key={car._id} car={car} />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-xl col-span-full">
              No cars found matching your search.
            </p>
          )}
        </div>
      </div>

      {/* নিচের কম্পোনেন্টগুলো */}
      <WhyChooseUs />
      <NewsAndArticles />
      <CarCtaSection />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
};

export default Home;