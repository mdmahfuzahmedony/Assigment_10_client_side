import React, { useContext, useState } from "react"; // useState add kora hoyeche
import { AuthContext } from "../AuthProvider/Authprovider"; // Adjust path as needed
import { useNavigate } from "react-router"; // Use react-router-dom for v6+
import { toast } from "react-toastify";
// react-hot-toast use korchi

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State variables for each form field
  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rentPricePerDay, setRentPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [hostedImageUrl, setHostedImageUrl] = useState("");

  // State variables for validation errors
  const [errors, setErrors] = useState({});

  // Function to handle form submission (eita holo apnar handleSubmit function)
  const handleFormSubmit = async (e) => {
    // Event object receive korbe
    e.preventDefault(); // Default form submission prevent korbe

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

    setErrors(newErrors); // Update errors state

    // If there are any errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors.");
      return;
    }

    // If no errors, proceed with submission

    const carData = {
      carName, // Shorthand for carName: carName
      description,
      category,
      rentPricePerDay: parseFloat(rentPricePerDay),
      location,
      hostedImageUrl,
      providerName: user?.displayName || "Unknown",
      providerEmail: user?.email || "unknown@example.com",
      createdAt: new Date().toISOString(),
    };

    console.log("Car data to submit:", carData);

    try {
      const response = await fetch(
        "http://assigmen-10-server-side.vercel.app/add-car",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.accessToken}` // If you have auth
          },
          body: JSON.stringify(carData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add car");
      }

      const result = await response.json();
      console.log("Car added successfully:", result);

      toast.success("Car added successfully!");

      // Clear all form fields after success
      setCarName("");
      setDescription("");
      setCategory("");
      setRentPricePerDay("");
      setLocation("");
      setHostedImageUrl("");
      setErrors({}); // Clear any previous errors
      navigate("/my-listings");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error(`Error: ${error.message || "Failed to add car"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 mt-20 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-[#101228] p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-200 mb-2 animate-fade-in-down">
            Add Your Car to Roam<span className="text-blue-600"> Rides</span>
          </h2>
          <p className="text-lg text-gray-400 animate-fade-in-up mt-4">
            Fill in the details below to list your car for rent.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-7">
          {" "}
          {/* onSubmit direct handleFormSubmit ke call korbe */}
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
              value={carName} // value state theke ashbe
              onChange={(e) => setCarName(e.target.value)} // onChange handler state update korbe
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
                errors.category ? "border-red-500" : ""
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
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
              className="block text-sm font-medium text-gray-200 mb-4"
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
              className="block text-sm font-medium text-gray-200 mb-4"
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
          </div>
          {/* Provider Name (Read-only) */}
          <div>
            <label
              htmlFor="providerName"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Provider Name
            </label>
            <input
              type="text"
              id="providerName"
              value={user?.displayName || "Loading..."}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>
          {/* Provider Email (Read-only) */}
          <div>
            <label
              htmlFor="providerEmail"
              className="block text-sm font-medium text-gray-200 mb-4"
            >
              Provider Email
            </label>
            <input
              type="email"
              id="providerEmail"
              value={user?.email || "Loading..."}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
