import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Component/ProductCard";

const BrowseCars = () => {
  const allCarData = useLoaderData();
  console.log(allCarData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCarData = allCarData?.filter((car) => {
    if (car && car["Car Name"]) {
      return car["Car Name"].toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-28 mb-10 p-4 ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-3 py-4 bg-base-200">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          Our Available Cars: {allCarData.length}
        </div>

    
        <div className="w-full md:w-auto flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search by car name..."
            className="p-2 w-full focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="p-2 bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* গাড়ির গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCarData && filteredCarData.length > 0 ? (
          filteredCarData.map((data) => (
            <ProductCard key={data._id} car={data}></ProductCard>
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
            No cars found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
