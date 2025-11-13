import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://https://assigmen-10-server-side.vercel.app/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f1124] text-white">
        <p className="text-lg animate-pulse">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-[#0f1124] text-white mt-30 mb-20">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--search-empty-results-pack-user-interface-illustrations-5197916.png"
            alt="No Bookings"
            className="w-60 mb-6"
          />
          <p className="text-lg text-gray-300">You have no bookings yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            // console.log(booking)
            <div
              key={booking._id}
              className="bg-[#1a1d3b] p-5 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={booking.carImage}
                alt={booking.carName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{booking.carName}</h2>
              <p className="text-gray-400">
                Date: <span className="text-gray-300">{booking.date}</span>
              </p>
              <p className="text-gray-400">
                Price:
                <span className="text-green-400 font-medium">
                  ${booking.rentPrice}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
