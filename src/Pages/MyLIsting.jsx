import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/Authprovider"; // Adjust path as needed
import { useNavigate } from "react-router"; // For navigation (e.g., to update page)

import { FaEdit, FaTrash } from "react-icons/fa"; // For icons (install react-icons if not already)
import { toast } from "react-toastify";

// Install react-icons if you haven't: npm install react-icons

const MyListings = () => {
  const { user, loading } = useContext(AuthContext); // Get user and loading state
  const [myCars, setMyCars] = useState([]); // State to store cars
  const [isLoading, setIsLoading] = useState(true); // State for data loading
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch cars when component mounts or user changes
  useEffect(() => {
    const fetchMyCars = async () => {
      if (user?.email) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:2001/my-cars/${user.email}` // Your new backend API endpoint
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
        // If user is null and not loading, means not logged in
        setIsLoading(false);
      }
    };

    fetchMyCars();
  }, [user, loading]); // Rerun when user or loading state changes

  // Handle Delete Car
  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car listing?")) {
      return;
    }

    const loadingToastId = toast.loading("Deleting car...");
    try {
      const response = await fetch(
        `http://localhost:2001/carProduct/${carId}`,
        {
          // Assuming you'll make a DELETE API
          method: "DELETE",
          // Add Authorization header if your backend needs it
          // headers: { Authorization: `Bearer ${user.accessToken}` }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      // Remove the deleted car from the local state
      setMyCars(myCars.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully!", { id: loadingToastId });
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(`Error: ${error.message || "Failed to delete car"}`, {
        id: loadingToastId,
      });
    }
  };

  // Handle Update Car (navigate to an update page)
  const handleUpdateCar = (carId) => {
    navigate(`/update-car/${carId}`); // Navigate to a hypothetical update page
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
      {" "}
      {/* Adjust mt-16 based on navbar height */}
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
                        ${car.rentPricePerDay?.toFixed(2)}
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
                        {/* Default to "Available" if status not set */}
                      </span>
                    </td>

                    <td className="px-6  py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleUpdateCar(car._id)}
                          className="btn btn-primary"
                          title="Update Car"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="btn btn-error"
                          title="Delete Car"
                        >
                          Delate
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
