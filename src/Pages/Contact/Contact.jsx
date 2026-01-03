import React from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-20 lg:py-50 bg-white dark:bg-[#020617] transition-colors duration-500 min-h-screen">
            <div className="max-w-[1500px] mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
                        Get In <span className="text-blue-500">Touch</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Have a question or need help with a booking? Our team is here to help you 24/7.
                        Reach out to us and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDE: Contact Information (4 Columns) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm">
                            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Contact Information</h3>

                            <div className="space-y-8">
                                {/* Email Item */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">mdmahfuzahmedony@gmail.com</p>
                                    </div>
                                </div>

                                {/* Phone Item */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">+880 1309-834483</p>
                                    </div>
                                </div>

                                {/* Location Item */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Our Office</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">Jessore Mohihar, Bangladesh</p>
                                    </div>
                                </div>

                                {/* Hours Item */}
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Working Hours</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">Mon - Sun: 09:00 AM - 11:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Follow Our Journey</p>
                                <div className="flex gap-4">
                                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                        <button key={i} className="w-12 h-12 bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Contact Form (7 Columns) */}
                    <div className="lg:col-span-7">
                        <div className="bg-slate-50 dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 md:p-14 shadow-sm">
                            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Send Us a Message</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white"
                                        />
                                    </div>
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Subject Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="How can we help you?"
                                        className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white"
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Message</label>
                                    <textarea
                                        rows="6"
                                        placeholder="Write your message here..."
                                        className="w-full bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all dark:text-white resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 active:scale-95">
                                    Send Message <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Map Placeholder Section */}
                <div className="mt-20">
                    <div className="w-full h-[450px] bg-slate-100 dark:bg-[#101228] rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative group">
                        {/* You can replace this div with a real Google Map iframe */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin size={48} className="text-blue-500 mx-auto mb-4 animate-bounce" />
                                <h4 className="text-xl font-bold dark:text-white">Our Headquarters</h4>
                                <p className="text-slate-500 dark:text-slate-400">Jessore Mohihar, Khulna Division, Bangladesh</p>
                            </div>
                        </div>
                        {/* Map Styling Overlay */}
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;