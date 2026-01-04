import React from 'react';
import { Users, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-[#020817] text-slate-900 dark:text-white min-h-screen font-sans transition-colors duration-300 overflow-x-hidden">

            {/* Main Container */}
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12">

                {/* Hero Section */}
                <section className="relative py-16 md:py-24 text-center overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 dark:bg-blue-600/20 blur-[80px] md:blur-[120px] rounded-full -z-10"></div>

                    <div className="relative z-10 px-2">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight">
                            Redefining the <br />
                            <span className="text-blue-600 dark:text-blue-500">Rental Experience</span>
                        </h1>
                        <p className="text-slate-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-xl md:text-2xl leading-relaxed px-4">
                            RoamRides is the premier global marketplace for transportation rentals.
                            We bridge the gap between vehicle owners and explorers through cutting-edge technology.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-8 md:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-slate-50 dark:bg-[#0a101f] p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-xl">
                        {[
                            { label: "Satisfied Users", value: "15k+" },
                            { label: "Premium Vehicles", value: "850+" },
                            { label: "Global Locations", value: "120+" },
                            { label: "Customer Rating", value: "4.9/5" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-blue-600 dark:text-blue-500 mb-1">{stat.value}</h2>
                                <p className="text-slate-500 dark:text-gray-500 uppercase text-[10px] md:text-sm tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="py-16 md:py-28 grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="relative order-2 lg:order-1 px-4 sm:px-0">
                        <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-slate-100 dark:border-white/5 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"
                                alt="Luxury Car"
                                className="w-full h-[300px] sm:h-[450px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Experience Badge - Hidden on mobile, shown on large screens */}
                        <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl hidden lg:block">
                            <p className="font-black text-2xl md:text-4xl mb-1">08+</p>
                            <p className="text-blue-100 font-medium uppercase tracking-widest text-[10px] md:text-sm">Years of Trust</p>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-10 order-1 lg:order-2 px-2">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs md:text-sm font-bold uppercase tracking-widest">
                            Our Story
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                            Crafting Memorable <span className="text-blue-600 dark:text-blue-500">Journeys</span> Since 2016.
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-base md:text-xl leading-relaxed">
                            We started with a simple idea: making car rentals as easy as a single tap.
                            Today, RoamRides is a trusted name for travelers worldwide.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Transparent Pricing", "24/7 Roadside Assistance", "Verified Fleet", "Instant Confirmation"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm md:text-lg font-semibold">
                                    <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-16 md:py-24 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-6xl font-bold mb-4">Values That <span className="text-blue-600 dark:text-blue-500 italic">Drive Us</span></h2>
                            <p className="text-slate-500 dark:text-gray-400 text-base md:text-lg">Commitment to excellence in every interaction.</p>
                        </div>
                        <div className="h-[2px] flex-grow bg-slate-200 dark:bg-white/10 mx-10 hidden md:block mb-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                        <ValueCard
                            icon={<ShieldCheck size={40} />}
                            title="Uncompromised Safety"
                            desc="Every vehicle undergoes a rigorous 150-point inspection before it reaches you."
                        />
                        <ValueCard
                            icon={<Zap size={40} />}
                            title="Seamless Tech"
                            desc="Advanced algorithms match you with the perfect car based on your preferences."
                        />
                        <ValueCard
                            icon={<Users size={40} />}
                            title="Customer Obsession"
                            desc="Our concierge team is available around the clock to ensure your journey stays on track."
                        />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-28">
                    <div className="bg-blue-600 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/30 group">
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 md:mb-10 tracking-tight leading-tight">
                                The road is calling. <br /> Where will you go?
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="w-full sm:w-auto bg-white text-blue-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-black text-lg md:text-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3">
                                    Start Exploring <ArrowRight size={20} />
                                </button>
                                <button className="w-full sm:w-auto bg-transparent text-white border-2 border-white/40 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-white/10 transition-all">
                                    Talk to Expert
                                </button>
                            </div>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-white/10 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32 blur-2xl md:blur-3xl group-hover:bg-white/20 transition-colors"></div>
                    </div>
                </section>

            </div>
        </div>
    );
};

// Internal Card Component for Values
const ValueCard = ({ icon, title, desc }) => (
    <div className="group bg-white dark:bg-[#020817] p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-white/5 hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-xl">
        <div className="text-blue-600 mb-6 p-3 bg-blue-600/5 inline-block rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-sm md:text-lg">
            {desc}
        </p>
    </div>
);

export default AboutPage;