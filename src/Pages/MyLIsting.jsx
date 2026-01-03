import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, ArrowRight, SlidersHorizontal, ChevronDown, Car, DollarSign } from "lucide-react";

const ExploreCars = () => {
  const [cars, setCars] = useState([]); // মূল ডাটা
  const [filteredCars, setFilteredCars] = useState([]); // ফিল্টার করা ডাটা
  const [isLoading, setIsLoading] = useState(true);

  // ফিল্টার এবং সার্চ স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // ডাটা ফেচিং
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://assigmen-10-server-side.vercel.app/carProduct");
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  // সার্চ এবং ফিল্টার লজিক (Fully Functional)
  useEffect(() => {
    let result = [...cars];

    // ১. সার্চবার লজিক (গাড়ির নাম বা লোকেশন দিয়ে)
    if (searchQuery) {
      result = result.filter((car) =>
        car.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ২. ক্যাটাগরি ফিল্টার (Field 1)
    if (selectedCategory !== "All") {
      result = result.filter((car) => car.category === selectedCategory);
    }

    // ৩. প্রাইস রেঞ্জ ফিল্টার (Field 2)
    if (selectedPriceRange !== "All") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      result = result.filter((car) => {
        const price = Number(car.rentPricePerDay);
        return max ? price >= min && price <= max : price >= min;
      });
    }

    // ৪. সর্টিং লজিক (Price Low/High)
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.rentPricePerDay - b.rentPricePerDay);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.rentPricePerDay - a.rentPricePerDay);
    }

    setFilteredCars(result);
  }, [searchQuery, selectedCategory, selectedPriceRange, sortOrder, cars]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen pb-20 transition-colors duration-500">

      {/* Search & Filter Section */}
      <section className="bg-slate-50 dark:bg-[#0a0f1d] py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10">
            Find Your <span className="text-blue-500">Dream Ride</span>
          </h1>

          {/* Functional Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white dark:bg-[#101228] p-4 rounded-[2rem] shadow-xl border dark:border-slate-800">

            {/* Search Input */}
            <div className="lg:col-span-5 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={20} />
              <input
                type="text"
                placeholder="Search by model or location..."
                className="w-full bg-slate-50 dark:bg-[#020617] border-none rounded-2xl py-4 px-14 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2 relative">
              <select
                className="w-full bg-slate-50 dark:bg-[#020617] rounded-2xl py-4 px-6 appearance-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold text-sm"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-2 relative">
              <select
                className="w-full bg-slate-50 dark:bg-[#020617] rounded-2xl py-4 px-6 appearance-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold text-sm"
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="All">Any Price</option>
                <option value="0-50">$0 - $50</option>
                <option value="51-150">$51 - $150</option>
                <option value="151-500">$151 - $500</option>
                <option value="501-10000">$500+</option>
              </select>
              <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-3 relative">
              <select
                className="w-full bg-slate-900 dark:bg-blue-600 text-white rounded-2xl py-4 px-6 appearance-none font-bold text-sm cursor-pointer"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort: Newest First</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70" size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* Car Grid */}
      <div className="max-w-[1500px] mx-auto px-6 mt-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            Found {filteredCars.length} results
          </p>
        </div>

        {filteredCars.length === 0 ? (
          <div className="py-24 text-center">
            <Car size={64} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
            <h2 className="text-2xl font-bold text-slate-400">No vehicles match your search.</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCars.map((car) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={car._id}
                  className="group bg-white dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image Area */}
                  <div className="relative h-60 overflow-hidden">
                    <img src={car.hostedImageUrl || car.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {car.category}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate pr-2">{car.carName}</h3>
                      <div className="text-right flex-shrink-0">
                        <span className="text-blue-500 font-black text-2xl">${car.rentPricePerDay}</span>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-tighter">per day</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-semibold">
                        <MapPin size={16} className="text-blue-500" /> {car.location || "Available"}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-semibold">
                        <Calendar size={16} className="text-blue-500" /> Posted {new Date(car.dateAdded || Date.now()).toLocaleDateString()}
                      </div>
                    </div>

                    <button className="mt-auto w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group/btn uppercase tracking-widest text-xs">
                      View Details <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination UI */}
        <div className="mt-20 flex justify-center items-center gap-3">
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-500 cursor-not-allowed">Prev</button>
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-12 h-12 rounded-xl font-bold transition-all ${n === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-blue-500 hover:text-white'}`}>
              {n}
            </button>
          ))}
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-500 hover:bg-blue-500 hover:text-white transition-all">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ExploreCars;