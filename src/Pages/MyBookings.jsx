import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, ArrowRight } from "lucide-react";
import { AuthContext } from "../AuthProvider/Authprovider"; // AuthContext ইমপোর্ট করা হয়েছে

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // লগ-ইন করা ইউজারকে কনটেক্সট থেকে নেওয়া হয়েছে

  useEffect(() => {
    // শুধুমাত্র ইউজার লগ-ইন অবস্থায় থাকলে এবং ইমেইল থাকলে ডাটা ফেচ হবে
    if (user?.email) {
      setLoading(true);

      // URL-এর শেষে ইমেইল কুয়েরি প্যারামিটার (?email=...) যোগ করা হয়েছে
      fetch(`https://assigmen-10-server-side.vercel.app/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        });
    }
  }, [user?.email]); // ইমেইল পরিবর্তন হলে বা লোড হলে এটি আবার রান করবে

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-slate-500 font-bold animate-pulse">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 py-10 container mx-auto px-4"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            My <span className="text-blue-600">Bookings</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Showing bookings for: <span className="text-blue-500 font-bold">{user?.email}</span>
          </p>
        </div>
        <div className="px-5 py-2 bg-blue-500/10 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
          {bookings.length} {bookings.length <= 1 ? "Booking" : "Bookings"} Found
        </div>
      </div>

      {/* Conditional Rendering: Empty State vs Grid */}
      {bookings.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--search-empty-results-pack-user-interface-illustrations-5197916.png"
              alt="No Bookings"
              className="w-64 opacity-60 dark:opacity-40"
            />
          </div>
          <p className="text-xl font-bold text-slate-500 dark:text-slate-400">No bookings found!</p>
          <p className="text-sm text-slate-400 mt-2">You haven't booked any rides yet with this account.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-[#101228] border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              {/* Car Image Area */}
              <div className="relative h-44 w-full overflow-hidden rounded-[2rem] mb-6">
                <img
                  src={booking.carImage || "https://via.placeholder.com/300"}
                  alt={booking.carName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 px-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                  Confirmed
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-4">
                <h2 className="text-xl font-black text-slate-900 dark:text-white truncate">
                  {booking.carName}
                </h2>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar size={12} className="text-blue-500" /> Date
                    </span>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {booking.date || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <DollarSign size={12} className="text-blue-500" /> Price
                    </span>
                    <p className="text-sm font-black text-green-600 dark:text-green-500">
                      ${booking.rentPrice}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    Manage Booking <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;