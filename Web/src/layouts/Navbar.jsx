import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeSharp,
  IoSearchSharp,
  IoNotificationsOutline,
} from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", icon: IoHomeSharp, path: "/" },
    { label: "Search", icon: IoSearchSharp, path: "/search" },
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
    {
      label: "Notifications",
      icon: IoNotificationsOutline,
      path: "/notifications",
    },
    { label: "Profile", icon: VscAccount, path: "/profile" },
  ];

  return (
    <div>
      {/* ================== 📱 Mobile Navbar (Bottom) ================== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg border-t border-gray-200 flex justify-around items-center py-2 z-50">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "text-blue-600 scale-110"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <Icon className="text-2xl" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* ================== 💻 Desktop Navbar (Top) ================== */}
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm px-6 md:px-10 lg:px-16 py-3 items-center justify-between z-50">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl lg:text-3xl font-bold italic text-blue-900 cursor-pointer hover:text-blue-600 transition-all duration-300"
        >
          ScholarTrack
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 lg:gap-10 font-semibold text-gray-700">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 cursor-pointer transition-all ${
                  isActive
                    ? "text-blue-700 underline underline-offset-8"
                    : "hover:text-blue-600"
                }`}
              >
                <item.icon className="text-lg" />
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-transform duration-300"
        >
          Logout
        </button>
      </div>

      {/* Spacer to prevent content overlap with fixed navbar */}
      <div className="h-14 md:h-16 lg:h-20" />
    </div>
  );
};
