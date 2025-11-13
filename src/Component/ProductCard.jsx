import React from "react";
import { NavLink } from "react-router"; // Correct import for NavLink
import { motion } from "framer-motion"; // Import motion from framer-motion

const ProductCard = ({ car }) => {
  const {
    _id,
    "Car Name": carName,
    "Rent Price (per day)": rentPrice,
    "Car Type / Model": carType,
    "Provider Name": providerName,
    image,
  } = car;

  // Handles cases where rentPrice might be an object (like from MongoDB) or a direct number
  const displayRentPrice =
    typeof rentPrice === "object" && rentPrice.$numberInt
      ? rentPrice.$numberInt
      : rentPrice;

  // Framer Motion variants for the card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", zIndex: 1 }
  };

  // Framer Motion variants for the image animation on hover
  const imageVariants = {
    hover: { scale: 1.1 }
  };

  return (
    // Use motion.div for the main card container
    <motion.div
      className="bg-[#101228] rounded-xl shadow-lg overflow-hidden flex flex-col h-full 
                 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30"
      variants={cardVariants}
      initial="hidden" // Start from the hidden state
      animate="visible" // Animate to the visible state when component mounts
      whileHover="hover" // Apply hover animation when mouse is over the card
      // Optionally add a viewport prop to trigger animation when it comes into view
      // viewport={{ once: true, amount: 0.8 }}
    >
      {image && (
        <div className="w-full h-40 overflow-hidden">
          {/* Use motion.img for image hover effect */}
          <motion.img
            src={image}
            alt={carName}
            className="w-full h-full object-cover"
            variants={imageVariants} // Apply image specific variants
            transition={{ duration: 0.3 }} // Smooth transition for image scale
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{carName}</h3>

        <div className="flex justify-between items-center text-gray-400 text-sm mb-3 mt-3">
          <p>
            Rent:{" "}
            <span className="font-semibold text-green-500">
              ${displayRentPrice}
            </span>{" "}
            / day
          </p>
          <p>
            Type: <span className="font-semibold text-blue-400">{carType}</span>
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-4 font-bold">
          Provider:{" "}
          <span className="font-normal text-blue-400">{providerName}</span>
        </p>
        {/* NavLink can also be wrapped in motion.a or motion.button if you want specific button animations */}
        <NavLink
          to={`/cardetails/${_id}`}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
        >
          View Details
        </NavLink>
      </div>
    </motion.div>
  );
};

export default ProductCard;