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
    <section className="py-16 md:py-24 bg-white dark:bg-[#020617] transition-colors duration-500">
      <div className="mx-auto px-6 lg:px-4 max-w-[1500px]">

        {/* হেডিং সেকশন - কালার ফিক্সড */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Why <span className="text-blue-500">Rent with us?</span>
          </h2>
          <p className='text-slate-500 dark:text-slate-400 py-3 max-w-2xl mx-auto'>
            We provide top-notch services ensuring your travel experience is smooth, affordable, and highly reliable.
          </p>
        </div>

        {/* কার্ড গ্রিড - কালার ফিক্সড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-[#101228] border border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
                {advantage.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {advantage.title}
              </h3>

              <p className="text-slate-500 dark:text-gray-400 text-base leading-relaxed">
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