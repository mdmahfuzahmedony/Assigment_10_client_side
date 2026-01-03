import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';

const NewsArticle = () => {
  const articles = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/view-luxurious-car-parked-highway_23-2151044458.jpg",
      date: "Nov 20, 2024",
      author: "Admin",
      title: "Top 10 Tips for a Smooth Long-Distance Car Rental Experience",
      description: "Planning a road trip? Learn how to choose the right vehicle and prepare for your journey..."
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/modern-automobile-classic-style-outdoors_23-2151669466.jpg",
      date: "Nov 18, 2024",
      author: "Mahfuz",
      title: "Why MERN Stack is Revolutionizing Rental Marketplaces",
      description: "Discover how modern technology ensures faster bookings and secure payment systems..."
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-30510.jpg",
      date: "Nov 15, 2024",
      author: "Editor",
      title: "The Future of Electric Vehicle Rentals in 2025",
      description: "As the world moves towards green energy, see how the rental industry is adapting..."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-4">

        {/* হেডিং এরিয়া - কালার ফিক্সড */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Latest <span className="text-blue-500">News & Articles</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-base">
              Stay updated with the latest trends, tips, and insights from the automotive and rental world.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-500 font-bold hover:gap-4 transition-all duration-300 mb-2">
            View All Posts <ArrowRight size={20} />
          </button>
        </div>

        {/* নিউজ গ্রিড - কালার ফিক্সড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-[#101228] border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Area */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-4 text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500" /> {article.date}</span>
                  <span className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {article.author}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {article.description}
                </p>

                <button className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest group">
                  Read More
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <button className="px-8 py-3 bg-blue-500 text-white font-bold rounded-full">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsArticle;