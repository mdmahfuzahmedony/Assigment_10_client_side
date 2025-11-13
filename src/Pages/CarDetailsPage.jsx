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
import { useLoaderData, useNavigate } from "react-router"; // Changed to 'react-router-dom'
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/Authprovider";

const CarDetailsPage = () => {
  const data = useLoaderData();
  // console.log(data); // Can remove this console.log if not needed for debugging
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isCarBookedByUser, setIsCarBookedByUser] = useState(false);
  const [bookingStatusLoading, setBookingStatusLoading] = useState(true); // Default to true as we need to check

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
  } = data || {}; // Added default empty object for safety

  const displayRentPrice = Number(rentPricePerDay) || 0;

  const descriptionText =
    description ||
    "No detailed description available for this car. It's a fantastic choice for its category and price point.";
  const locationText = location || "Central City, USA";
  const statusText = status || "available";

  const finalProviderEmail =
    providerEmail ||
    "contact@" +
      (providerName?.toLowerCase().replace(/\s/g, "") || "unknown") +
      ".com";

  // --- START FIXED USEEFFECT ---
  useEffect(() => {
    const checkIfBooked = async () => {
      // Ensure both user email and carId are available before making the fetch call
      if (user?.email && carId) {
        setBookingStatusLoading(true); // Start loading when checking status
        try {
          // Changed the endpoint to match the server-side update
          const res = await fetch(
            `http://https://assigmen-10-server-side.vercel.app/bookings/user/${user.email}`
          );
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(
              `Failed to fetch user bookings: ${res.status} ${errorText}`
            );
          }
          const userBookings = await res.json();

          // Check if any of the fetched bookings match the current carId and userEmail
          const booked = userBookings.some(
            (booking) =>
              booking.carId === carId && booking.userEmail === user.email
          );
          setIsCarBookedByUser(booked);
        } catch (error) {
          console.error("Error checking booking status:", error);
          toast.error("⚠️ Failed to check booking status. Please try again.");
          setIsCarBookedByUser(false); // Assume not booked on error
        } finally {
          setBookingStatusLoading(false); // Stop loading regardless of success or failure
        }
      } else {
        setIsCarBookedByUser(false);
        setBookingStatusLoading(false);
      }
    };

    if (carId) {
      checkIfBooked();
    } else {
      setBookingStatusLoading(false);
    }
  }, [user?.email, carId]); // Dependency array: Re-run if user.email or carId changes
  // --- END FIXED USEEFFECT ---

  const handleBookNow = async () => {
    if (isCarBookedByUser) {
      toast.error("❌ You have already booked this car.");
      return;
    }

    if (!user) {
      toast.error("Please log in to book a car.");
      navigate("/login");
      return;
    }
    if (user.email === finalProviderEmail) {
      toast.error("❌ You cannot book your own car.");
      return;
    }

    const bookingInfo = {
      carId,
      carImage,
      carName,
      rentPrice: displayRentPrice,
      category,
      location: locationText,
      providerName,
      providerEmail: finalProviderEmail,
      userEmail: user.email,
      date: new Date().toISOString(), // Use ISO string for consistent date storage
      status: "pending", // Initial booking status
    };

    setLoading(true);
    try {
      const res = await fetch(
        "http://https://assigmen-10-server-side.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingInfo),
        }
      );

      if (res.ok) {
        toast.success("✅ Booking successful!");
        setIsCarBookedByUser(true); // Update state to reflect booking
        navigate("/my-bookings"); // Redirect to user's bookings page
      } else {
        const errorData = await res.json(); // Get error message from backend
        // Display specific error message from backend if available
        toast.error(
          `❌ Failed to create booking: ${
            errorData.message || "Please try again!"
          }`
        );
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("⚠️ Something went wrong while processing your booking!");
    } finally {
      setLoading(false);
    }
  };

  // Button logic
  const isDisabled =
    loading ||
    bookingStatusLoading || // Disable while checking booking status
    statusText !== "available" ||
    isCarBookedByUser ||
    user?.email === finalProviderEmail;

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
                    <span className="font-semibold text-white">{category}</span>
                  </span>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                  <span>
                    Rent Price:{" "}
                    <span className="font-semibold text-white">
                      ${displayRentPrice.toFixed(2)}{" "}
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
