import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/Authprovider';
import { User, Mail, Calendar, Hash, ShieldCheck, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    // ইউজারের জয়েনিং ডেট (Firebase metadata থেকে)
    const joinDate = user?.metadata?.creationTime
        ? format(new Date(user.metadata.creationTime), "MMMM dd, yyyy")
        : "N/A";

    const userProfilePic = user?.photoURL || "https://i.ibb.co/VtP8R1d/Default-Avatar.jpg";

    return (
        <div className="space-y-10 animate-fade-in">

            {/* ১. প্রোফাইল হেডার কার্ড */}
            <div className="relative pb-10">
                {/* কভার কালার / ব্যানার */}
                <div className="h-40 w-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] shadow-lg"></div>

                {/* প্রোফাইল ইমেজ এবং নাম */}
                <div className="absolute left-10 -bottom-2 flex flex-col md:flex-row items-end gap-6">
                    <div className="relative group">
                        <img
                            src={userProfilePic}
                            alt="profile"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white dark:border-[#101228] object-cover shadow-2xl"
                        />
                        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                            <span className="text-white text-xs font-bold uppercase">Update</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                            {user?.displayName || "Member"}
                        </h2>
                        <p className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
                            <ShieldCheck size={18} /> Verified Explorer
                        </p>
                    </div>
                </div>
            </div>

            {/* ২. ইনফরমেশন গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 md:pt-16">

                {/* বাম পাশ: ব্যক্তিগত তথ্য */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <User className="text-blue-500" /> Personal Details
                    </h3>

                    <div className="space-y-4">
                        <InfoItem icon={<User size={18} />} label="Full Name" value={user?.displayName || "N/A"} />
                        <InfoItem icon={<Mail size={18} />} label="Email Address" value={user?.email || "N/A"} />
                        <InfoItem icon={<MapPin size={18} />} label="Location" value="Jessore, Bangladesh" />
                    </div>
                </div>

                {/* ডান পাশ: অ্যাকাউন্ট ডিটেইলস */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Calendar className="text-blue-500" /> Account Activity
                    </h3>

                    <div className="space-y-4">
                        <InfoItem icon={<Calendar size={18} />} label="Joined On" value={joinDate} />
                        <InfoItem icon={<Hash size={18} />} label="User UID" value={user?.uid?.substring(0, 12) + "..."} />

                        {/* স্ট্যাটাস ব্যাজ */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Account Status</span>
                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-black uppercase rounded-full border border-green-500/20">Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ৩. স্ট্যাটিসটিকস সেকশন (প্লেসহোল্ডার) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                <StatsCard label="Cars Listed" count="05" color="text-blue-500" />
                <StatsCard label="Total Bookings" count="12" color="text-orange-500" />
                <StatsCard label="Earned" count="$240" color="text-green-500" />
                <StatsCard label="Reviews" count="4.8" color="text-yellow-500" />
            </div>

        </div>
    );
};

// ছোট হেল্পার কম্পোনেন্ট (প্রতিটি ইনফো রো এর জন্য)
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <div className="text-blue-500">{icon}</div>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</span>
        </div>
        <span className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[150px]">{value}</span>
    </div>
);

// স্ট্যাটস কার্ডের জন্য ছোট কম্পোনেন্ট
const StatsCard = ({ label, count, color }) => (
    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
        <h4 className={`text-3xl font-black ${color} mb-1`}>{count}</h4>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
);

export default MyProfile;