import React, { useEffect, useState, useContext } from "react";
import {
  MapPin,
  Tag,
  DollarSign,
  User,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router"; // Your original import
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/Authprovider";

const CarDetailsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isCarBookedByUser, setIsCarBookedByUser] = useState(false);
  const [bookingStatusLoading, setBookingStatusLoading] = useState(true);

  const {
    _id: carId,
    carName,
    rentPricePerDay,
    category,
    providerName,
    providerEmail,
    hostedImageUrl: carImage,
    description,
    location,
    status,
    additionalImages = [],
  } = data || {};

  // --- Image Gallery Logic ---
  const [activeImg, setActiveImg] = useState(carImage);
  useEffect(() => {
    if (carImage) setActiveImg(carImage);
  }, [carImage]);

  const allImages = carImage ? [carImage, ...additionalImages] : [];
  const displayImages = allImages.length > 1 ? allImages : [carImage, carImage, carImage, carImage];

  const displayRentPrice = Number(rentPricePerDay) || 0;
  const statusText = status || "available";
  const finalProviderEmail = providerEmail || "contact@provider.com";

  // --- Check Booking Status (Original Logic) ---
  useEffect(() => {
    const checkIfBooked = async () => {
      if (user?.email && carId) {
        setBookingStatusLoading(true);
        try {
          const res = await fetch(`https://assigmen-10-server-side.vercel.app/bookings/user/${user.email}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const userBookings = await res.json();
          const booked = userBookings.some(b => b.carId === carId && b.userEmail === user.email);
          setIsCarBookedByUser(booked);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setBookingStatusLoading(false);
        }
      } else {
        setBookingStatusLoading(false);
      }
    };
    if (carId) checkIfBooked();
  }, [user?.email, carId]);

  // --- Handle Book Now (Directly Redirects to My Bookings) ---
  const handleBookNow = async () => {
    if (isCarBookedByUser) return toast.error("❌ You have already booked this car.");
    if (!user) {
      toast.error("Please log in to book a car.");
      navigate("/login");
      return;
    }
    if (user.email === finalProviderEmail) return toast.error("❌ You cannot book your own car.");

    const bookingInfo = {
      carId, carImage, carName, rentPrice: displayRentPrice, category,
      location: location || "City Center", providerName, providerEmail: finalProviderEmail,
      userEmail: user.email, date: new Date().toISOString(), status: "pending",
    };

    setLoading(true);
    try {
      const res = await fetch("https://assigmen-10-server-side.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      if (res.ok) {
        toast.success("✅ Booking successful!");
        setIsCarBookedByUser(true);
        navigate("/dashboard/my-bookings"); // Redirection logic
      } else {
        const errorData = await res.json();
        toast.error(`❌ Failed: ${errorData.message || "Try again!"}`);
      }
    } catch (error) {
      toast.error("⚠️ Error processing booking.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || bookingStatusLoading || statusText !== "available" || isCarBookedByUser || user?.email === finalProviderEmail;

  let buttonText = "Book Now";
  if (loading) buttonText = "Booking...";
  else if (bookingStatusLoading) buttonText = "Checking Status...";
  else if (isCarBookedByUser) buttonText = "Already Booked";
  else if (statusText !== "available") buttonText = "Not Available";

  return (
    <div className="min-h-screen bg-white dark:bg-[#070815] transition-colors duration-300 py-10 md:py-20 px-4">
      <div className="max-w-7xl mx-auto mt-10">

        {/* Main Wrapper: Responsive Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-gray-50 dark:bg-[#101228] border border-gray-200 dark:border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl">

          {/* LEFT: Image Section (Responsive Aspect Ratio) */}
          <div className="w-full lg:w-1/2 p-4 md:p-6">
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 aspect-[4/3] sm:aspect-video lg:aspect-square shadow-md">
              <img
                src={activeImg}
                alt={carName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${statusText === 'available'
                    ? 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400'
                  }`}>
                  {statusText}
                </span>
              </div>
            </div>

            {/* Thumbnails (Responsive Grid) */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="car thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Content Section */}
          <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col">
            <div className="flex-grow">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {carName}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                {description || "Experience the perfect balance of luxury and performance. This vehicle is well-maintained, fuel-efficient, and ready for your next adventure."}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                  <Tag className="text-blue-500" size={24} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Category</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                  <DollarSign className="text-green-500" size={24} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Price/Day</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200">${displayRentPrice}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                  <MapPin className="text-red-500" size={24} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Location</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">{location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
                  <CheckCircle className="text-purple-500" size={24} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Security</p>
                    <p className="font-bold text-gray-800 dark:text-gray-200">Verified Car</p>
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div className="p-5 bg-gray-100 dark:bg-black/20 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center sm:text-left">Listed By</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {providerName?.charAt(0)}
                  </div>
                  <div className="text-center sm:text-left overflow-hidden w-full">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{providerName}</p>
                    <p className="text-xs text-gray-500 truncate">{finalProviderEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <button
                onClick={handleBookNow}
                disabled={isDisabled}
                className={`w-full py-4 md:py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${isDisabled
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 dark:shadow-blue-900/40"
                  }`}
              >
                {buttonText}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-tighter">
                Clicking book will confirm your reservation instantly
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;