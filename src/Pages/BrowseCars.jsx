import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";
import { Search, Filter, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

const BrowseCars = () => {
  const allCarData = useLoaderData() || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // নতুন ক্যাটাগরি স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ১. ডাইনামিক ক্যাটাগরি লিস্ট তৈরি করা (ডাটা থেকে ক্যাটাগরিগুলো বের করা)
  const categories = useMemo(() => {
    const uniqueCategories = ["All", ...new Set(allCarData.map(car => car.category).filter(Boolean))];
    return uniqueCategories;
  }, [allCarData]);

  // ২. সার্চ এবং ক্যাটাগরি ফিল্টারিং লজিক
  const filteredCarData = useMemo(() => {
    return allCarData.filter((car) => {
      const matchesSearch = car?.carName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allCarData, searchTerm, selectedCategory]);

  // ৩. প্যাগিনেশন লজিক
  const totalPages = Math.ceil(filteredCarData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCars = filteredCarData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] pt-32 pb-20 transition-colors duration-500">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-4">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- বাম পাশের সাইডবার: ফিল্টার এবং ক্যাটাগরি --- */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-32 space-y-8 bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">

              {/* সার্চ বক্স */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Search size={18} className="text-blue-500" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">Search</h2>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by car name..."
                    className="w-full py-3.5 pl-5 pr-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* ক্যাটাগরি লিস্ট */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <LayoutGrid size={18} className="text-blue-500" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">Categories</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-xl font-bold transition-all ${selectedCategory === category
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600"
                        }`}
                    >
                      <span className="capitalize">{category}</span>
                      {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                  Showing {paginatedCars.length} of {filteredCarData.length} Results
                </p>
              </div>
            </div>
          </aside>

          {/* --- ডান পাশের এরিয়া: কার্ড গ্রিড --- */}
          <main className="w-full lg:w-3/4">
            <div className="mb-10 flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                Available <span className="text-blue-500">Cars</span>
              </h1>
              <div className="px-5 py-2 bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedCategory} Vehicles
              </div>
            </div>

            {/* গ্রিড এরিয়া */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {paginatedCars.length > 0 ? (
                paginatedCars.map((data) => (
                  <ProductCard key={data._id} car={data} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-slate-50 dark:bg-slate-800/20 rounded-[3rem]">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl font-bold text-slate-500 dark:text-slate-400">
                    No cars found in this category.
                  </p>
                </div>
              )}
            </div>

            {/* --- প্যাগিনেশন --- */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black transition-all ${currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowseCars;