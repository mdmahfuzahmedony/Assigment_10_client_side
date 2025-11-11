import React from "react";
import { NavLink } from "react-router";

const ProductCard = ({ car }) => {
  const {
    "Car Name": carName,
    "Rent Price (per day)": rentPrice,
    "Car Type / Model": carType,
    "Provider Name": providerName,
    "View Details": viewDetailsLink,
  } = car;

  return (
    <div
      className="bg-[#101228] rounded-xl shadow-lg overflow-hidden flex flex-col h-full 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30"
    >
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{carName}</h3>

        <div className="flex justify-between items-center text-gray-400 text-sm mb-3 mt-3">
          <p>
            Rent:{" "}
            <span className="font-semibold text-green-500">${rentPrice}</span> / day
          </p>
          <p>
            Type: <span className="font-semibold text-blue-400">{carType}</span>
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-4 font-bold">
          Provider:{" "}
          <span className="font-normal text-blue-400">{providerName}</span>
        </p>

        <NavLink
          to={"/carDetails"}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
