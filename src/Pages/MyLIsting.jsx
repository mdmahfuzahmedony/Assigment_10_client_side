import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router"; // Corrected import
import { AuthContext } from "../AuthProvider/Authprovider";

import { FaEdit, FaTrash } from "react-icons/fa"; // Imported but not used directly in buttons
import { toast } from "react-toastify";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const fetchMyCars = async () => {
    if (user?.email) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://assigmen-10-server-side.vercel.app/my-cars/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setMyCars(data);
      } catch (error) {
        console.error("Error fetching my cars:", error);
        toast.error("Failed to load your car listings.");
      } finally {
        setIsLoading(false);
      }
    } else if (!loading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [user, loading]); // Re-fetch when user or loading state changes

  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car listing?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://assigmen-10-server-side.vercel.app/carProduct/${carId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // Attempt to parse error response from backend if available
        let errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || "Failed to delete car on server.");
      }

      // If delete is successful, update the UI
      setMyCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(`Error: ${error.message || "Failed to delete car"}`);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xl text-gray-700 ml-3">Loading your listings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          Please log in to view your listings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-6xl mx-auto p-8 rounded-lg shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-200 mb-2">
            My Car <span className="text-blue-600">Listings</span>
          </h2>
          <p className="text-md text-gray-400 mt-4">
            Manage all the cars you've added for rent.
          </p>
        </div>

        {myCars.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 mb-4">
              You haven't added any cars yet.
            </p>
            <button
              onClick={() => navigate("/add-car")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Your First Car
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-900 py-10">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    Car Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    Rent Price (per day)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-[#101228] divide-y divide-gray-200">
                {myCars.map((car) => (
                  <tr key={car._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-200">
                        {car.carName}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {car.category}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-200">
                        {/* Ensure rentPricePerDay is parsed to a number before toFixed */}
                        ${Number(car.rentPricePerDay).toFixed(2)}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-sm ${
                          car.status === "Booked"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {car.status || "Available"}{" "}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex gap-4 justify-center">
                        {" "}
                        {/* Centered buttons */}
                        <NavLink
                          to={`/update_car/${car._id}`}
                          className="btn btn-sm btn-primary" // Added btn-sm for smaller buttons
                          title="Update Car"
                        >
                          <FaEdit className="inline mr-1" /> Update
                        </NavLink>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="btn btn-sm btn-error" // Added btn-sm for smaller buttons
                          title="Delete Car"
                        >
                          <FaTrash className="inline mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
