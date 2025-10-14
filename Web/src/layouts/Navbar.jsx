import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoHomeSharp, IoSearchSharp, IoNotificationsOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";

export const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: IoHomeSharp, path: "/" },
    { label: "Search", icon: IoSearchSharp, path: "/search" },
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
    { label: "Notifications", icon: IoNotificationsOutline, path: "/notifications" },
    { label: "Profile", icon: VscAccount, path: "/profile" },
  ];

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg border-t border-gray-200 flex justify-around py-2 z-50">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div key={idx} onClick={() => navigate(item.path)} className={`flex flex-col items-center cursor-pointer ${isActive ? "text-blue-600 scale-110" : "text-gray-600 hover:text-blue-500"}`}>
              <Icon className="text-2xl" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm px-8 py-3 items-center justify-between z-50">
        <div onClick={() => navigate("/")} className="md:text-lg lg:text-2xl font-bold italic text-blue-900 cursor-pointer hover:text-blue-600 transition-all duration-300">ScholarTrack</div>
        <div className="flex gap-0.5 font-semibold lg:gap-6 text-gray-700">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <div key={idx} onClick={() => navigate(item.path)} className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all ${isActive ? "text-blue-700 bg-blue-50 shadow-sm scale-105" : "hover:text-blue-600 hover:bg-gray-100"}`}>
                <Icon className="text-xl" />
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
        <button onClick={handleLogout} className="md:px-2 lg:px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform">Logout</button>
      </div>

      <div className="h-20 md:h-24" /> {/* Spacer */}
    </div>
  );
};
