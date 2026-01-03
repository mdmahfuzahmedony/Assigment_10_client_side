import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Search, Filter, ChevronRight } from 'lucide-react';

const BlogPage = () => {
    // ডামি ডাটা (পরবর্তীতে তুমি এখান থেকে ব্যাকেন্ড ডাটা ম্যাপ করতে পারবে)
    const articles = [
        {
            id: 1,
            image: "https://img.freepik.com/free-photo/view-luxurious-car-parked-highway_23-2151044458.jpg",
            date: "Nov 20, 2024",
            author: "Admin",
            category: "Travel",
            title: "Top 10 Tips for a Smooth Long-Distance Car Rental Experience",
            description: "Planning a road trip? Learn how to choose the right vehicle and prepare for your journey..."
        },
        {
            id: 2,
            image: "https://img.freepik.com/free-photo/modern-automobile-classic-style-outdoors_23-2151669466.jpg",
            date: "Nov 18, 2024",
            author: "Mahfuz",
            category: "Technology",
            title: "Why MERN Stack is Revolutionizing Rental Marketplaces",
            description: "Discover how modern technology ensures faster bookings and secure payment systems..."
        },
        {
            id: 3,
            image: "https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-30510.jpg",
            date: "Nov 15, 2024",
            author: "Editor",
            category: "Electric",
            title: "The Future of Electric Vehicle Rentals in 2025",
            description: "As the world moves towards green energy, see how the rental industry is adapting..."
        },
        {
            id: 4,
            image: "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight_23-2151107415.jpg",
            date: "Nov 10, 2024",
            author: "Admin",
            category: "Business",
            title: "How to Choose the Best Luxury Car for Your Business Meeting",
            description: "First impressions matter. Here is our guide to picking the right luxury vehicle for professional success."
        }
    ];

    const categories = ["All Categories", "Travel", "Technology", "Electric", "Business", "Safety"];

    return (
        <section className="py-50  bg-white  dark:bg-[#020617] transition-colors duration-500 min-h-screen py-10">
            <div className="max-w-[1500px] mx-auto px-6 py-10  lg:px-0">

                {/* Page Header */}
                <div className="mb-16 ">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
                        Our <span className="text-blue-500">Blog & Insights</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Explore the latest stories, news, and car rental tips.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT SIDE: Filter Options */}
                    <aside className="w-full lg:w-1/4 space-y-8">

                        {/* Search Bar */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:border-blue-500 transition-all text-slate-900 dark:text-white"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={20} />
                        </div>

                        {/* Categories Filter */}
                        <div className="bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Filter size={20} className="text-blue-500" /> Categories
                            </h3>
                            <div className="space-y-4">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center justify-between w-full text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-500 font-semibold transition-colors group"
                                    >
                                        <span>{cat}</span>
                                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Post Card */}
                        <div className="bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-4 tracking-tight">Subscribe to our newsletter!</h4>
                                <p className="text-blue-100 text-sm mb-6">Get the latest news directly in your inbox.</p>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 mb-4 placeholder:text-blue-100 focus:outline-none"
                                />
                                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors">
                                    Join Now
                                </button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>

                    </aside>

                    {/* RIGHT SIDE: Articles Grid */}
                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {articles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    whileHover={{ y: -10 }}
                                    className="bg-white dark:bg-[#101228] border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                                >
                                    {/* Image Area */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                            {article.category}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-5 mb-4 text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Calendar size={14} className="text-blue-500" /> {article.date}</span>
                                            <span className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {article.author}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6 flex-grow">
                                            {article.description}
                                        </p>

                                        <button className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest group/btn">
                                            Read Article
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination / Load More */}
                        <div className="mt-16 flex justify-center">
                            <button className="px-12 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-full hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300">
                                Load More Articles
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default BlogPage;