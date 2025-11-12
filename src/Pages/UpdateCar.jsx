import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/Authprovider";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { toast } from "react-toastify";

const UpdateCar = () => {

  const data = useLoaderData();
  
  console.log(data);


  const { user, loading: authLoading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rentPricePerDay, setRentPricePerDay] = useState("");
  const [location, setLocation] = useState("");
  const [hostedImageUrl, setHostedImageUrl] = useState("");

  // State for provider details (read-only)
  const [providerName, setProviderName] = useState("");
  const [providerEmail, setProviderEmail] = useState("");

  // const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
  if (data) {
    setCarName(data.carName || "");
    setDescription(data.description || "");
    setCategory(data.category || "");
    setRentPricePerDay(data.rentPricePerDay || "");
    setLocation(data.location || "");
    setHostedImageUrl(data.hostedImageUrl || "");
    setProviderName(data.providerName || user?.displayName || "");
    setProviderEmail(data.providerEmail || user?.email || "");
  }
}, [data, user]);


  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

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

    console.log("Updating car with ID:", id);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the form errors.");
      return;
    }


    const updatedCar = {
      carName,
      description,
      category,
      rentPricePerDay: parseFloat(rentPricePerDay),
      location,
      hostedImageUrl,
    };

    try {
      const response = await fetch(`http://localhost:2001/update-car/${id}`, {
        // Your new PUT backend API endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update car");
      }

      const result = await response.json();
      console.log("Car updated successfully:", result);

      toast.success("Car updated successfully!", );
      setErrors({});
      navigate("/my-listings");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error(`Error: ${error.message || "Failed to update car"}`);
    }
  };

  if (authLoading) {
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
              defaultValue={data.carName}
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
            {hostedImageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-200 mb-2">
                  Current Image Preview:
                </p>
                <img
                  src={hostedImageUrl}
                  alt="Car Preview"
                  className="max-w-full h-48 object-contain rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

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
              value={providerName}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

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
              value={providerEmail}
              readOnly
              className="mt-1 block text-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
            />
          </div>

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
