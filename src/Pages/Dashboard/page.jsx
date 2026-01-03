import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { PlusCircle, ListOrdered, BookCheck, UserCircle, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const menuItems = [
        { name: "My Profile", path: "/dashboard", icon: <UserCircle size={20} /> },
        { name: "Add New Car", path: "/dashboard/add-car", icon: <PlusCircle size={20} /> },
        { name: "My Listings", path: "/dashboard/my-listings", icon: <ListOrdered size={20} /> },
        { name: "My Bookings", path: "/dashboard/my-bookings", icon: <BookCheck size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-10 transition-colors duration-500">
            <div className="max-w-[1500px] mx-auto px-6 lg:px-4 flex flex-col lg:flex-row gap-10">

                {/* SIDEBAR */}
                <aside className="w-full lg:w-1/4">
                    <div className="sticky top-28 bg-white dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                                <LayoutDashboard size={24} />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Dashboard</h2>
                        </div>

                        <nav className="flex flex-col gap-3">
                            {menuItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    end // This ensures the exact path is matched
                                    className={({ isActive }) => `
                    flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all
                    ${isActive
                                            ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30"
                                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
                                        }
                  `}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="w-full lg:w-3/4">
                    <div className="bg-white dark:bg-[#101228] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-12 shadow-sm min-h-[600px]">
                        {/* এখানে Outlet ব্যবহার করা হয়েছে যাতে সাব-রুটগুলো এখানে রেন্ডার হয় */}
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Dashboard;