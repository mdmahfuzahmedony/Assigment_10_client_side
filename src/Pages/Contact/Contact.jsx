import React from 'react';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-12 md:py-20 lg:py-28 bg-white dark:bg-[#020617] transition-colors duration-500 min-h-screen overflow-x-hidden">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="text-center mb-12 md:mb-20">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight">
                        Get In <span className="text-blue-500">Touch</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
                        Have a question or need help with a booking? Our team is here to help you 24/7.
                        Reach out to us and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

                    {/* LEFT SIDE: Contact Information */}
                    <div className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
                        <div className="bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-900 dark:text-white">Contact Information</h3>

                            <div className="space-y-6 md:space-y-8">
                                {/* Email Item */}
                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-sm md:text-xl font-bold text-slate-900 dark:text-white break-words">mdmahfuzahmedony@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone Item */}
                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-sm md:text-xl font-bold text-slate-900 dark:text-white">+880 1309-834483</p>
                                    </div>
                                </div>

                                {/* Location Item */}
                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Office</p>
                                        <p className="text-sm md:text-xl font-bold text-slate-900 dark:text-white text-pretty">Jessore Mohihar, Bangladesh</p>
                                    </div>
                                </div>

                                {/* Hours Item */}
                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Working Hours</p>
                                        <p className="text-sm md:text-xl font-bold text-slate-900 dark:text-white">09:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">Follow Our Journey</p>
                                <div className="flex flex-wrap gap-3 md:gap-4">
                                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                        <button key={i} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                                            <Icon size={18} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Contact Form */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-sm">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-900 dark:text-white">Send Us a Message</h3>

                            <form className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white text-sm md:text-base"
                                        />
                                    </div>
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                {/* Subject Input */}
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="How can we help you?"
                                        className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white text-sm md:text-base"
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="Write your message here..."
                                        className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white resize-none text-sm md:text-base"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-blue-500/20 text-sm md:text-base">
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-12 md:mt-20 px-2">
                    <div className="w-full h-[300px] md:h-[450px] bg-slate-100 dark:bg-[#101228] rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="text-center">
                                <MapPin size={36} className="text-blue-500 mx-auto mb-3 md:mb-4 animate-bounce" />
                                <h4 className="text-lg md:text-xl font-bold dark:text-white">Our Headquarters</h4>
                                <p className="text-xs md:text-base text-slate-500 dark:text-slate-400">Jessore Mohihar, Khulna Division, Bangladesh</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;