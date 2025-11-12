import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://assigmen-10-server-side.vercel.app/testimonial"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (e) {
        console.error("Failed to fetch testimonials:", e);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6  text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-3xl font-black text-white mb-4">
            What <span className="text-blue-500">Our Customers Say</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-[700px] mx-auto">
            Loading testimonials...
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className=" p-8 rounded-xl shadow-lg animate-pulse h-60"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-20 px-6  text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-3xl font-black text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-red-500 mb-12 max-w-[700px] mx-auto">{error}</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 px-6 bg-gray-950 text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 mb-12 max-w-[700px] mx-auto">
            No testimonials available yet.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="text-3xl md:text-3xl font-black text-white mb-4">
          What <span className="text-blue-500">Our Customers Say</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-[700px] mx-auto">
          We’re proud to have earned the trust of thousands of satisfied
          customers across the country. Here’s what they have to say about
          RoamRides.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left relative text-white"
            >
              <Quote className="w-8 h-8 text-blue-500 absolute top-6 right-6 opacity-20" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    t.reviewerImage ||
                    "https://via.placeholder.com/100x100?text=User"
                  }
                  alt={t.reviewerName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="font-semibold text-white">{t.reviewerName}</h4>
                  <p className="text-sm text-gray-400">{t.position}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{t.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
