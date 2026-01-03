import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCarouselSection = () => {
  const [allCars, setAllCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [errorLoadingCars, setErrorLoadingCars] = useState(false);

  useEffect(() => {
    const fetchAllCars = async () => {
      setErrorLoadingCars(false);
      setLoadingCars(true);
      try {
        const response = await fetch(
          "https://assigmen-10-server-side.vercel.app/carProduct"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch car products");
        }
        const data = await response.json();
        setAllCars(data);
      } catch (error) {
        console.error("Error fetching all cars:", error);
        setErrorLoadingCars(true);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchAllCars();
  }, []);

  const sliceProduct = Array.isArray(allCars) ? allCars.slice(0, 3) : [];

  if (loadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
        <p className="text-xl text-gray-700 ml-3">Loading cars...</p>
      </div>
    );
  }

  if (errorLoadingCars) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          Failed to load car products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-[1500px] mx-auto p-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[500px] rounded-xl shadow-lg overflow-hidden"
      >
        {sliceProduct.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              className="relative w-full h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${item.hostedImageUrl})` }}
            >
              {/* THIS IS THE CRITICAL CHANGE */}
              {/* <div className="absolute inset-0 bg-black  bg-opacity-XX (e.g., bg-opacity-20, bg-opacity-60"></div> */}
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">
                  {item.carName || "Unnamed Car"}
                </h3>
                <p className="text-lg font-medium mb-1">
                  Category: {item.category}
                </p>
                <p className="text-lg mb-1">Provider: {item.providerName}</p>
                <p className="text-xl font-semibold bg-blue-600 px-4 py-2 rounded inline-block">
                  ${Number(item.rentPricePerDay).toFixed(2)} / day
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarouselSection;
