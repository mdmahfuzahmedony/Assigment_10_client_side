import React from 'react';
import { CalendarCheck, DollarSign, Users, Headset } from 'lucide-react'; 
const WhyChooseUs = () => {
  
  const advantages = [
    {
      icon: <CalendarCheck className="h-12 w-12 text-blue-500" />, 
      title: "Easy Booking Process",
      description: "Our intuitive platform allows you to book your desired car in just a few simple steps, saving you time and hassle."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-500" />, 
      title: "Affordable & Transparent Rates",
      description: "Enjoy competitive pricing with no hidden fees. What you see is what you pay, ensuring peace of mind."
    },
    {
      icon: <Users className="h-12 w-12 text-orange-500" />, 
      title: "Trusted Local Providers",
      description: "We partner with top-rated local providers to offer a wide range of reliable vehicles and exceptional service quality."
    },
    {
      icon: <Headset className="h-12 w-12 text-red-500" />, 
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to assist you with any queries or emergencies during your rental period."
    }
  ];

  return (
    <section className="py-16 md:py-20  text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-6 md:mb-10"> 
          <h2 className="text-3xl sm:text-3xl md:text-3xl font-black text-center text-white leading-tight">
            Why <span className="text-blue-500">Rent with us?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-[#101228] rounded-lg p-6 md:p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-6"> 
                {advantage.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed"> 
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;