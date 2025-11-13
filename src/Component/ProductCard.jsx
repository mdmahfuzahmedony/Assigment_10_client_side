import React from "react";
import { NavLink } from "react-router"; 

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from 'framer-motion';

const ProductCard = ({ car }) => {

  const {
    _id,
    carName,
    rentPricePerDay,
    category,
    providerName,
    hostedImageUrl,
    location,
  } = car;

  const displayRentPrice = rentPricePerDay;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      zIndex: 1,
    },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      className="bg-[#101228] rounded-xl shadow-lg overflow-hidden flex flex-col h-full
                 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {hostedImageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <motion.img
            src={hostedImageUrl}
            alt={carName}
            className="w-full h-full object-cover"
            variants={imageVariants}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{carName}</h3>

        <div className="flex justify-between items-center text-gray-400 text-sm mb-3 mt-3">
          <p>
            Rent:{" "}
            <span
              className="font-semibold text-green-500 cursor-help"
              data-tooltip-id="rent-price-tooltip"
              data-tooltip-content={`Daily rental price for ${carName}`}
              data-tooltip-place="top"
            >
              ${displayRentPrice}
            </span>{" "}
            / day
          </p>
          <p>
            Type:{" "}
            <span className="font-semibold text-blue-400">{category}</span>{" "}
          </p>
        </div>

        {location && (
          <p className="text-gray-500 text-sm mb-2 font-bold">
            Location:{" "}
            <span className="font-normal text-blue-400">{location}</span>
          </p>
        )}

        <p className="text-gray-500 text-sm mb-4 font-bold">
          Provider:{" "}
          <span className="font-normal text-blue-400">{providerName}</span>
        </p>

        <NavLink
          to={`/cardetails/${_id}`}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          View Details
        </NavLink>
      </div>

      <Tooltip id="rent-price-tooltip" />
    </motion.div>
  );
};

export default ProductCard;
