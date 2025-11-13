import React, { useState, useEffect, useContext } from "react"; // useEffect এবং useContext যোগ করুন
import {
  MapPin,
  Tag,
  DollarSign,
  User,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router"; // react-router-dom ব্যবহার করুন
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/Authprovider"; // AuthContext ইম্পোর্ট করুন

const CarDetailsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // AuthContext থেকে user ডেটা নিন
  const [loading, setLoading] = useState(false);
  const [isCarBookedByUser, setIsCarBookedByUser] = useState(false); // নতুন স্টেট: গাড়িটি ইউজার বুক করেছে কিনা
  const [bookingStatusLoading, setBookingStatusLoading] = useState(true); // বুকিং স্ট্যাটাস লোড হচ্ছে কিনা

  const {
    _id: carId, // গাড়ির ID নিন
    "Car Name": carName,
    "Rent Price (per day)": rentPrice,
    "Car Type / Model": carType,
    "Provider Name": providerName,
    providerEmail,
    image: carImage,
    description,
    location,
    status,
  } = data || {};

  const displayRentPrice =
    typeof rentPrice === "object" && rentPrice?.$numberInt
      ? rentPrice.$numberInt
      : rentPrice;

  const descriptionText =
    description ||
    "No detailed description available for this car. It's a fantastic choice for its category and price point.";
  const locationText = location || "Central City, USA";
  const statusText = status || "available";

  // optional provider email
  const finalProviderEmail =
    providerEmail ||
    "contact@" + providerName?.toLowerCase().replace(/\s/g, "") + ".com";

  // ==============================================
  // ✅ চেক করুন ইউজার এই গাড়িটি আগে বুক করেছে কিনা
  // ==============================================
  useEffect(() => {
    const checkIfBooked = async () => {
      if (user?.email && carId) {
        try {
          // আপনার বুকিং API থেকে ইউজারের বুকিংগুলো আনুন
          const res = await fetch(
            `https://assigmen-10-server-side.vercel.app/bookings?userEmail=${user.email}`
          );
          const userBookings = await res.json();

          // এই গাড়ির ID ব্যবহার করে দেখুন ইউজার এটি বুক করেছে কিনা
          const booked = userBookings.some((booking) => booking.carId === carId);
          setIsCarBookedByUser(booked);
        } catch (error) {
          console.error("Error checking booking status:", error);
          toast.error("⚠️ Failed to check booking status.");
        } finally {
          setBookingStatusLoading(false);
        }
      } else {
        setBookingStatusLoading(false); // যদি ইউজার লগইন না থাকে বা carId না থাকে
      }
    };

    checkIfBooked();
  }, [user, carId]); // user বা carId পরিবর্তিত হলে আবার চেক করুন

  // ==============================================
  // 🚗 BOOK NOW HANDLER
  // ==============================================
  const handleBookNow = async () => {
    // ⚠️ যদি গাড়িটি ইতিমধ্যেই বুক করা থাকে, তাহলে এরর দেখান
    if (isCarBookedByUser) {
      toast.error("❌ You have already booked this car.");
      return;
    }

    if (!user) {
      toast.error("Please log in to book a car.");
      navigate("/login"); // লগইন পেজে রিডাইরেক্ট করুন
      return;
    }
    // প্রোভাইডার নিজেই নিজের গাড়ি বুক করতে পারবে না
    if (user.email === finalProviderEmail) {
      toast.error("❌ You cannot book your own car.");
      return;
    }

    const bookingInfo = {
      carId, // গাড়ির ID বুকিংয়ে যোগ করুন
      carName,
      carImage,
      rentPrice: displayRentPrice,
      carType,
      location: locationText,
      providerName,
      providerEmail: finalProviderEmail,
      userEmail: user.email, // লগইন করা ইউজারের ইমেইল ব্যবহার করুন
      date: new Date().toLocaleString(),
      status: "pending",
    };

    setLoading(true);
    try {
      const res = await fetch(
        "https://assigmen-10-server-side.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingInfo),
        }
      );

      if (res.ok) {
        toast.success("✅ Booking successful!");
        setIsCarBookedByUser(true); // বুকিং সফল হলে স্টেট আপডেট করুন
        navigate("/my-bookings");
      } else {
        const errorData = await res.json();
        toast.error(`❌ Failed to create booking: ${errorData.message || 'Try again!'}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // বাটন ডিসেবল করার কন্ডিশন
  const isDisabled =
    loading ||
    bookingStatusLoading || // বুকিং স্ট্যাটাস লোড হওয়া পর্যন্ত ডিসেবল
    statusText !== "available" ||
    isCarBookedByUser || // যদি ইউজার এটি বুক করে থাকে
    user?.email === finalProviderEmail; // যদি প্রোভাইডার নিজেই নিজের গাড়ি হয়

  // বাটনের টেক্সট
  let buttonText = "Book Now";
  if (loading) {
    buttonText = "Booking...";
  } else if (bookingStatusLoading) {
    buttonText = "Checking Status...";
  } else if (!user) {
    buttonText = "Login to Book";
  } else if (user?.email === finalProviderEmail) {
    buttonText = "Your Own Car";
  } else if (isCarBookedByUser) {
    buttonText = "Already Booked";
  } else if (statusText !== "available") {
    buttonText = "Not Available";
  }

  return (
    <section className="min-h-screen max-w-[1200px] mx-auto my-30 py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl shadow-lg overflow-hidden md:flex bg-[#101228]">
          {/* Car Image */}
          <div className="md:w-1/2 rounded-2xl">
            <img
              src={carImage}
              alt={carName}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 px-10 flex flex-col">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 leading-tight text-white">
                {carName}
              </h1>

              <p className="text-gray-300 mb-6 text-lg">{descriptionText}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6 text-gray-300">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-blue-500" />
                  <span>
                    Category:{" "}
                    <span className="font-semibold text-white">{carType}</span>
                  </span>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  <span>
                    Rent Price:{" "}
                    <span className="font-semibold text-white">
                      ${displayRentPrice}
                    </span>{" "}
                    / day
                  </span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  <span>
                    Location:{" "}
                    <span className="font-semibold text-white">
                      {locationText}
                    </span>
                  </span>
                </div>

                <div className="flex items-center">
                  {statusText === "available" ? (
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                  )}
                  <span>
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        statusText === "available"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {statusText}
                    </span>
                  </span>
                </div>
              </div>

              {/* Provider Info */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-white">
                  Provider Information
                </h3>
                <div className="flex items-center text-gray-300 mb-2">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>
                    Name:{" "}
                    <span className="font-semibold text-white">
                      {providerName}
                    </span>
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <span>
                    Email:{" "}
                    <span className="font-semibold text-white">
                      {finalProviderEmail}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="mt-8">
              <button
                onClick={handleBookNow}
                disabled={isDisabled}
                className={`w-full ${
                  isDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;