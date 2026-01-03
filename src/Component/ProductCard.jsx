import React from "react";
import { NavLink } from "react-router";
import { motion } from 'framer-motion';

const ProductCard = ({ car }) => {
  const {
    _id,
    carName,
    category,
    providerName,
    hostedImageUrl,
    location,
  } = car;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      // এখানে লাইট মোডে সাদা এবং ডার্ক মোডে নেভি ব্লু কালার দেওয়া হয়েছে
      className="bg-white dark:bg-[#101228] border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full
                 transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/20"
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
        {/* টাইটেল কালার ফিক্সড */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{carName}</h3>

        <div className="flex justify-between items-center text-sm mb-4">
          <p className="text-slate-500 dark:text-gray-400 font-medium">
            Category:{" "}
            <span className="font-semibold text-blue-500 dark:text-blue-400">{category}</span>{" "}
          </p>
        </div>

        {/* লোকেশন এবং প্রোভাইডার সেকশন */}
        <div className="space-y-2 mb-6">
          {location && (
            <p className="text-slate-500 dark:text-gray-400 text-sm font-bold">
              Location:{" "}
              <span className="font-normal text-slate-700 dark:text-blue-300">{location}</span>
            </p>
          )}

          <p className="text-slate-500 dark:text-gray-400 text-sm font-bold">
            Provider:{" "}
            <span className="font-normal text-slate-700 dark:text-blue-300">{providerName}</span>
          </p>
        </div>

        <NavLink
          to={`/cardetails/${_id}`}
          className="mt-auto block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
        >
          View Details
        </NavLink>
      </div>
    </motion.div>
  );
};

export default ProductCard;