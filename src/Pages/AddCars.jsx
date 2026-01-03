import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/Authprovider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Car, DollarSign, MapPin, Image as ImageIcon, AlignLeft, Tags, User, Mail, Plus } from "lucide-react";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rentPricePerDay, setRentPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [hostedImageUrl, setHostedImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!carName) newErrors.carName = "Vehicle name is required";
    if (!description || description.length < 30) newErrors.description = "Description (min 30 chars)";
    if (!category) newErrors.category = "Please select a category";
    if (!rentPricePerDay || isNaN(rentPricePerDay)) newErrors.rentPricePerDay = "Enter a valid price";
    if (!location) newErrors.location = "Location is required";
    if (!hostedImageUrl) newErrors.hostedImageUrl = "Image URL is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const carData = {
      carName,
      description,
      category,
      rentPricePerDay: parseFloat(rentPricePerDay),
      location,
      hostedImageUrl,
      providerName: user?.displayName || "Unknown",
      providerEmail: user?.email || "unknown@example.com",
      createdAt: new Date().toISOString(),
      status: "available"
    };

    try {
      const response = await fetch("https://assigmen-10-server-side.vercel.app/add-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData),
      });

      if (!response.ok) throw new Error("Failed to add car");

      toast.success("Vehicle listed successfully!");
      navigate("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Add New <span className="text-blue-600">Vehicle</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Ready to earn? List your car in just a few steps.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8">

        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Car size={16} className="text-blue-500" /> Vehicle Name
            </label>
            <input
              type="text"
              className={`w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border ${errors.carName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white`}
              placeholder="e.g. Tesla Model 3"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Tags size={16} className="text-blue-500" /> Category
            </label>
            <select
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Section 2: Pricing & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <DollarSign size={16} className="text-blue-500" /> Rent Price ($ / day)
            </label>
            <input
              type="number"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              placeholder="0.00"
              value={rentPricePerDay}
              onChange={(e) => setRentPricePerDay(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <MapPin size={16} className="text-blue-500" /> Location
            </label>
            <input
              type="text"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              placeholder="City, Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Section 3: Image URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <ImageIcon size={16} className="text-blue-500" /> Image URL
          </label>
          <input
            type="url"
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white font-mono text-sm"
            placeholder="https://images.unsplash.com/..."
            value={hostedImageUrl}
            onChange={(e) => setHostedImageUrl(e.target.value)}
          />
        </div>

        {/* Section 4: Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <AlignLeft size={16} className="text-blue-500" /> Detailed Description
          </label>
          <textarea
            rows="4"
            className="w-full px-5 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
            placeholder="Tell us more about the features, condition, and rules..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Read Only Info Bar */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-3">
            <User size={18} className="text-blue-500" />
            <div>
              <p className="text-[10px] uppercase font-black text-blue-400">Owner</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{user?.displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-blue-500" />
            <div>
              <p className="text-[10px] uppercase font-black text-blue-400">Contact Email</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/25 uppercase tracking-widest"
        >
          <Plus size={20} /> List Vehicle
        </button>
      </form>
    </motion.div>
  );
};

export default AddCar;