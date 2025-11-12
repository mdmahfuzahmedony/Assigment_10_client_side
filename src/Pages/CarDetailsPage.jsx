import React, { useState } from "react";
import {
  MapPin,
  Tag,
  DollarSign,
  User,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";

const CarDetailsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
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
  // 🚗 BOOK NOW HANDLER
  // ==============================================
  const handleBookNow = async () => {
    const userEmail = "user@example.com"; // TODO: Replace with logged-in user's email (from AuthContext)
    const bookingInfo = {
      carName,
      carImage,
      rentPrice: displayRentPrice,
      carType,
      location: locationText,
      providerName,
      providerEmail: finalProviderEmail,
      userEmail,
      date: new Date().toLocaleString(),
      status: "pending",
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      if (res.ok) {
        toast.success("✅ Booking successful!");
        navigate("/my-bookings");
      } else {
        toast.error("❌ Failed to create booking. Try again!");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


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
                disabled={loading || statusText !== "available"}
                className={`w-full ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200`}
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;
