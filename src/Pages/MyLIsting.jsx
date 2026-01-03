import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/Authprovider";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Car, Package, DollarSign, Activity } from "lucide-react";
import { toast } from "react-toastify";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCars = async () => {
    if (user?.email) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://assigmen-10-server-side.vercel.app/my-cars/${user.email}`
        );
        const data = await response.json();
        setMyCars(data);
      } catch (error) {
        toast.error("Failed to load your car listings.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [user, loading]);

  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const response = await fetch(`https://assigmen-10-server-side.vercel.app/carProduct/${carId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMyCars((prev) => prev.filter((car) => car._id !== carId));
        toast.success("Listing removed successfully");
      }
    } catch (error) {
      toast.error("Failed to delete listing");
    }
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-slate-500 font-bold animate-pulse">Fetching your garage...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            My Vehicle <span className="text-blue-600">Listings</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage and monitor your shared cars.
          </p>
        </div>
        <NavLink
          to="/dashboard/add-car"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-xs"
        >
          <Plus size={18} /> Add New Car
        </NavLink>
      </div>

      {myCars.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <Car size={60} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Your garage is empty!</p>
          <p className="text-sm text-slate-400 mt-2">Start earning by listing your first vehicle.</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-transparent shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Vehicle Info</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price / Day</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {myCars.map((car) => (
                  <tr key={car._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border dark:border-slate-700">
                          <img src={car.hostedImageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{car.carName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                        <Package size={14} className="text-blue-500" /> {car.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black text-slate-900 dark:text-white">
                      ${Number(car.rentPricePerDay).toFixed(2)}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                        ${car.status === "Booked"
                          ? "bg-red-500/10 text-red-500 border border-red-500/20"
                          : "bg-green-500/10 text-green-500 border border-green-500/20"}
                      `}>
                        {car.status || "Available"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <NavLink
                          to={`/update_car/${car._id}`}
                          className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </NavLink>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyListings;