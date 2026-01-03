import React from 'react';
import { Users, ShieldCheck, Zap, Target, Award, ArrowRight, CheckCircle2 } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="bg-white dark:bg-[#020817] text-slate-900 dark:text-white min-h-screen font-sans transition-colors duration-300">

            {/* Main Container - max-w-[1500px] */}
            <div className="max-w-[1500px] mx-auto px-6  md:px-12">

                {/* Hero Section */}
                <section className="relative py-24 text-center overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
                            Redefining the <br />
                            <span className="text-blue-600 dark:text-blue-500">Rental Experience</span>
                        </h1>
                        <p className="text-slate-600 dark:text-gray-400 max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed">
                            RoamRides is the premier global marketplace for transportation rentals.
                            We bridge the gap between vehicle owners and explorers through cutting-edge technology.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 max-w-[1500px]  lg:px-0 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 border gap-8 bg-slate-50 dark:bg-[#0a101f] p-12 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-xl">
                        {[
                            { label: "Satisfied Users", value: "15k+" },
                            { label: "Premium Vehicles", value: "850+" },
                            { label: "Global Locations", value: "120+" },
                            { label: "Customer Rating", value: "4.9/5" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <h2 className="text-4xl md:text-6xl font-black text-blue-600 dark:text-blue-500 mb-2">{stat.value}</h2>
                                <p className="text-slate-500 dark:text-gray-500 uppercase text-xs md:text-sm tracking-[0.2em] font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="py-28 grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="rounded-[3rem] overflow-hidden border-8 border-slate-100 dark:border-white/5 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"
                                alt="Luxury Car"
                                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-blue-600 text-white p-10 rounded-[2.5rem] shadow-2xl hidden xl:block">
                            <p className="font-black text-4xl mb-1">08+</p>
                            <p className="text-blue-100 font-medium uppercase tracking-widest text-sm">Years of Trust</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-600 text-sm font-bold uppercase tracking-widest">
                            Our Story
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Crafting Memorable <span className="text-blue-600 dark:text-blue-500">Journeys</span> Since 2016.
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-xl leading-relaxed">
                            We started with a simple idea: making car rentals as easy as a single tap.
                            Today, RoamRides is a trusted name for thousands of travelers who demand
                            quality, safety, and transparency.
                        </p>

                        <ul className="space-y-5">
                            {["Transparent Pricing Policy", "24/7 Premium Roadside Assistance", "Handpicked Verified Fleet", "Instant Digital Confirmation"].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-lg font-semibold">
                                    <CheckCircle2 className="text-blue-600" size={24} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-24 bg-slate-50 dark:bg-white/5 rounded-[4rem] px-10 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4">The Values That <span className="text-blue-600 dark:text-blue-500 font-serif italic">Drive Us</span></h2>
                            <p className="text-slate-500 dark:text-gray-400 text-lg">Our commitment to excellence defines every interaction we have with our clients.</p>
                        </div>
                        <div className="h-[2px] flex-grow bg-slate-200 dark:bg-white/10 mx-10 hidden md:block mb-8"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <ValueCard
                            icon={<ShieldCheck size={48} />}
                            title="Uncompromised Safety"
                            desc="Every vehicle on our platform undergoes a rigorous 150-point inspection before it reaches you."
                        />
                        <ValueCard
                            icon={<Zap size={48} />}
                            title="Seamless Technology"
                            desc="Our advanced AI algorithms match you with the perfect car based on your preferences in seconds."
                        />
                        <ValueCard
                            icon={<Users size={48} />}
                            title="Customer Obsession"
                            desc="Our dedicated concierge team is available around the clock to ensure your journey stays on track."
                        />
                    </div>
                </section>

                {/* CTA Section - Style matched to your footer banner */}
                <section className="py-28">
                    <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/30 group">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
                                The road is calling. <br /> Where will you go?
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                                <button className="bg-white text-blue-600 px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3">
                                    Start Exploring <ArrowRight size={24} />
                                </button>
                                <button className="bg-transparent text-white border-2 border-white/40 px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all">
                                    Talk to Expert
                                </button>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
                    </div>
                </section>

            </div>
        </div>
    );
};

// Internal Card Component for Values
const ValueCard = ({ icon, title, desc }) => (
    <div className="group bg-white dark:bg-[#020817] p-12 rounded-[3rem] border border-slate-200 dark:border-white/5 hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-4">
        <div className="text-blue-600 mb-8 p-4 bg-blue-600/5 inline-block rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            {icon}
        </div>
        <h3 className="text-3xl font-bold mb-5 tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-gray-400 leading-relaxed text-lg">
            {desc}
        </p>
    </div>
);

export default AboutPage;