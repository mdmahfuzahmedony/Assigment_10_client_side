import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Calendar, DollarSign, Car } from "lucide-react";
import { AuthContext } from "../AuthProvider/Authprovider";
import { toast } from "react-toastify";
import { Link } from "react-router";
import Swal from "sweetalert2"; // Delete confirmation এর জন্য ভালো

const MyListing = () => {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // ইমেইল দিয়ে ফিল্টার করে ডাটা আনা হচ্ছে
      const response = await fetch(
        `https://assigmen-10-server-side.vercel.app/carProduct?email=${user?.email}`
      );
      const data = await response.json();
      setMyCars(data);
    } catch (error) {
      console.error("Error fetching my cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assigmen-10-server-side.vercel.app/carProduct/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              toast.success("Car deleted successfully");
              // ডিলিট হওয়ার পর স্টেট আপডেট করা
              const remaining = myCars.filter((car) => car._id !== id);
              setMyCars(remaining);
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white">
            My <span className="text-blue-600">Listings</span>
          </h2>
          <p className="text-slate-400 mt-1">Manage all your posted vehicles here.</p>
        </div>
        <div className="bg-blue-600/10 text-blue-500 px-4 py-2 rounded-full font-bold text-sm">
          Total: {myCars.length} Cars
        </div>
      </div>

      {myCars.length === 0 ? (
        <div className="text-center py-20 bg-[#101228] rounded-3xl border border-dashed border-slate-800">
          <Car size={60} className="mx-auto text-slate-700 mb-4" />
          <p className="text-xl font-bold text-slate-500">You haven't listed any cars yet.</p>
          <Link to="/dashboard/add-car" className="btn btn-primary mt-4">Add a Car Now</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#101228] rounded-3xl border border-slate-800 shadow-2xl">
          <table className="table w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-widest font-black">
                <th className="p-6">Car Info</th>
                <th>Category</th>
                <th>Rent Price</th>
                <th>Added Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => (
                <tr key={car._id} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-all group">
                  {/* Car Info with Image */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-24 overflow-hidden rounded-xl bg-slate-800">
                        <img
                          src={car.hostedImageUrl || car.image}
                          alt=""
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{car.carName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={10} /> {car.location || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {car.category}
                    </span>
                  </td>

                  {/* Rent Price */}
                  <td>
                    <div className="flex flex-col">
                      <span className="text-blue-500 font-black text-lg">${car.rentPricePerDay}</span>
                      <span className="text-[9px] text-slate-500 uppercase font-bold">Per Day</span>
                    </div>
                  </td>

                  {/* Added Date */}
                  <td>
                    <div className="text-slate-400 text-sm font-semibold flex items-center gap-2">
                      <Calendar size={14} className="text-slate-600" />
                      {new Date(car.dateAdded || Date.now()).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Actions (Edit & Delete) */}
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/dashboard/update_car/${car._id}`}
                        className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                        title="Edit Listing"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="p-2 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                        title="Delete Listing"
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
      )}
    </motion.div>
  );
};

// MapPin আইকন ব্যবহার করা হয়েছে কিন্তু ইমপোর্ট করা হয়নি, তাই নিচের ছোট অ্যাডজাস্টমেন্ট:
import { MapPin } from "lucide-react";

export default MyListing;