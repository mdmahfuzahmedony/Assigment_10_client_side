import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/Authprovider";
import { useParams, useNavigate } from "react-router"; // useParams for ID, useNavigate for redirection
import { toast } from "react-toastify";


const UpdateCar = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // authLoading to distinguish
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate();

  // State for form fields (initialized with empty strings)
  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rentPricePerDay, setRentPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [hostedImageUrl, setHostedImageUrl] = useState("");

  // State for provider details (read-only)
  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");

  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching car data
  const [errors, setErrors] = useState({}); // State for validation errors

  // Redirect if user is not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch car data to pre-fill the form
  useEffect(() => {
    const fetchCarData = async () => {
      if (!user && !authLoading) { // Ensure user is loaded before fetching if private route
        setIsLoading(false);
        return;
      }
      if (id) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:2001/cardetails/${id}`); // Existing API to get single car
          if (!response.ok) {
            throw new Error("Failed to fetch car data");
          }
          const carData = await response.json();

          // Check if the logged-in user is the actual provider of this car
          if (user?.email && carData.providerEmail !== user.email) {
            toast.error("You are not authorized to edit this car.");
            navigate("/my-listings"); // Redirect unauthorized users
            return;
          }

          // Pre-fill form states
          setCarName(carData.carName || "");
          setDescription(carData.description || "");
          setCategory(carData.category || "");
          setRentPricePerDay(carData.rentPricePerDay || "");
          setLocation(carData.location || "");
          setHostedImageUrl(carData.hostedImageUrl || "");
          setProviderName(carData.providerName || user?.displayName || ""); // Fallback for provider name
          setProviderEmail(carData.providerEmail || user?.email || ""); // Fallback for provider email
        } catch (error) {
          console.error("Error fetching car for update:", error);
          toast.error("Could not load car data for update.");
          navigate("/my-listings"); // Redirect on error
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // No ID, so stop loading
      }
    };

    fetchCarData();
  }, [id, user, authLoading, navigate]); // Rerun if ID, user, or authLoading changes

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Manual Validation
    const newErrors = {};
    if (!carName) newErrors.carName = "Car Name is required";
    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 30) {
      newErrors.description = "Description must be at least 30 characters long";
    }
    if (!category) newErrors.category = "Category is required";
    if (!rentPricePerDay) {
      newErrors.rentPricePerDay = "Rent Price is required";
    } else if (isNaN(rentPricePerDay) || parseFloat(rentPricePerDay) <= 0) {
      newErrors.rentPricePerDay = "Price must be a positive number";
    }
    if (!location) newErrors.location = "Location is required";
    if (!hostedImageUrl) {
      newErrors.hostedImageUrl = "Image URL is required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(hostedImageUrl)) {
      newErrors.hostedImageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors.");
      return;
    }

    const loadingToastId = toast.loading("Updating car...");

    const updatedCar = {
      carName,
      description,
      category,
      rentPricePerDay: parseFloat(rentPricePerDay),
      location,
      hostedImageUrl,
      // providerName and providerEmail should not be sent for update, as they are read-only.
      // The backend will ensure they are not modified.
    };

    try {
      const response = await fetch(`http://localhost:2001/update-car/${id}`, { // Your new PUT backend API endpoint
        method: "PUT", // Use PUT for updating entire resource
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.accessToken}` // If you have auth
        },
        body: JSON.stringify(updatedCar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update car");
      }

      const result = await response.json();
      console.log("Car updated successfully:", result);

      toast.success("Car updated successfully!", { id: loadingToastId });
      setErrors({}); // Clear any previous errors
      navigate("/my-listings"); // Redirect back to My Listings page
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error(`Error: ${error.message || "Failed to update car"}`, {
        id: loadingToastId,
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xl text-gray-700 ml-3">Loading car data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Please log in to update cars.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-25 mb-10">
      <div className="max-w-4xl w-full bg-[#101128] p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-200 mb-2">
            Update Car <span className="text-blue-600">Details</span>
          </h2>
          <p className="text-md text-gray-400 mt-4">
            Modify the information for your car listing.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-7">
          {/* Car Name */}
          <div>
            <label
              htmlFor="carName"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Car Name
            </label>
            <input
              type="text"
              id="carName"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.carName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
              placeholder="e.g., Toyota Camry 2020"
            />
            {errors.carName && (
              <p className="mt-1 text-sm text-red-600">{errors.carName}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
              placeholder="Provide a detailed description of your car, its features, condition, etc."
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              }  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
            >
              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Rent Price (per day) */}
          <div>
            <label
              htmlFor="rentPricePerDay"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Rent Price (per day)
            </label>
            <input
              type="number"
              id="rentPricePerDay"
              step="0.01"
              value={rentPricePerDay}
              onChange={(e) => setRentPricePerDay(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.rentPricePerDay ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
              placeholder="e.g., 50.00"
            />
            {errors.rentPricePerDay && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rentPricePerDay}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
              placeholder="e.g., Dhaka, Bangladesh"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Hosted Image URL */}
          <div>
            <label
              htmlFor="hostedImageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hosted Image URL (Unsplash, Google, etc.)
            </label>
            <input
              type="url"
              id="hostedImageUrl"
              value={hostedImageUrl}
              onChange={(e) => setHostedImageUrl(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.hostedImageUrl ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
              placeholder="e.g., https://example.com/your-car-image.jpg"
            />
            {errors.hostedImageUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.hostedImageUrl}
              </p>
            )}
             {hostedImageUrl && ( // Show image preview
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image Preview:</p>
                <img src={hostedImageUrl} alt="Car Preview" className="max-w-full h-48 object-contain rounded-md border border-gray-300" />
              </div>
            )}
          </div>

          {/* Provider Name (Read-only) */}
          <div>
            <label
              htmlFor="providerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Provider Name
            </label>
            <input
              type="text"
              id="providerName"
              value={providerName} // Display fetched provider name
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

          {/* Provider Email (Read-only) */}
          <div>
            <label
              htmlFor="providerEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Provider Email
            </label>
            <input
              type="email"
              id="providerEmail"
              value={providerEmail} // Display fetched provider email
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;