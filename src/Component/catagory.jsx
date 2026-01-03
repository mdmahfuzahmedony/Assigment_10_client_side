import React from 'react';
import { motion } from 'framer-motion';
import {
    Car,
    Zap,
    Compass,
    ShieldAlert,
    Truck,
    Crown,
    ArrowRight
} from 'lucide-react';

const Categories = () => {
    // ক্যাটাগরি ডাটা
    const categoryList = [
        {
            id: 1,
            name: "Luxury Cars",
            icon: <Crown size={32} />,
            count: "120+ Cars",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            name: "SUVs",
            icon: <Compass size={32} />,
            count: "85+ Cars",
            color: "from-indigo-500 to-blue-500"
        },
        {
            id: 3,
            name: "Electric",
            icon: <Zap size={32} />,
            count: "45+ Cars",
            color: "from-emerald-500 to-teal-500"
        },
        {
            id: 4,
            name: "Sports",
            icon: <Car size={32} />,
            count: "30+ Cars",
            color: "from-rose-500 to-orange-500"
        },
        {
            id: 5,
            name: "Off-Road",
            icon: <ShieldAlert size={32} />,
            count: "60+ Cars",
            color: "from-amber-500 to-yellow-500"
        },
        {
            id: 6,
            name: "Vans/Trucks",
            icon: <Truck size={32} />,
            count: "25+ Vehicles",
            color: "from-slate-500 to-gray-500"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#020617] transition-colors duration-500">
            <div className="max-w-[1500px] mx-auto px-6">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
                            Browse by <span className="text-blue-500">Category</span>
                        </h2>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">
                            Find the perfect ride tailored to your needs. From luxury sedans to heavy-duty off-roaders.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-blue-500 font-bold hover:gap-4 transition-all duration-300 group">
                        Explore All <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {categoryList.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ y: -10 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Card Background & Border */}
                            <div className="h-full bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]">

                                {/* Icon Container with Glow */}
                                <div className={`mb-6 w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                    {category.icon}
                                </div>

                                {/* Text Content */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-slate-400 dark:text-gray-500 text-sm font-semibold uppercase tracking-widest">
                                    {category.count}
                                </p>

                                {/* Hidden Arrow that appears on hover */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Optional Feature Badge */}
                <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Top Rated Fleet
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Verified Providers
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-tighter">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 24/7 Roadside Assist
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Categories;