import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductCarouselSection = () => {
  const products = [
    {
      id: 1,
      title: "Luxury Sedan",
      price: "$45,000",
      image:
        "https://img.freepik.com/free-photo/car-with-headlights-is-driving-through-desert_23-2151850148.jpg?t=st=1762704107~exp=1762707707~hmac=6b6ce097fb2be6592232041fc81ab2c508b860c7d80c8565617024065d6c7537&w=1060",
    },
    {
      id: 2,
      title: "Sport Convertible",
      price: "$72,500",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 3,
      title: "Electric SUV",
      price: "$58,900",
      image:
        "https://images.unsplash.com/photo-1614200179365-71cb0b6dfb05?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-6 py-16 px-6">
      {/* Left side: Carousel (2/3) */}
      <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-[500px]"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="relative w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-opacity-20"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg font-semibold bg-blue-600 px-3 py-1 rounded inline-block">
                    {item.price}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right side: Company info (1/3) */}
      <div className="bg-[#101828] p-8 rounded-xl shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">
          Why Choose RoamRides?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At RoamRides, we believe in delivering excellence on every road. Our
          cars are carefully selected, maintained, and priced fairly for every
          car lover out there.
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>✅ 100% verified vehicles</li>
          <li>✅ Affordable financing options</li>
          <li>✅ Trusted by 10,000+ happy drivers</li>
        </ul>
      </div>
    </section>
  );
};

export default ProductCarouselSection;
