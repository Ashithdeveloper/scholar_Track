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
    { label: "Home", icon: <IoHomeSharp />, path: "/" },
    { label: "Search", icon: <IoSearchSharp />, path: "/search" },
    { label: "Profile", icon: <VscAccount />, path: "/profile" },
    { label: "Dashboard", icon: <LuLayoutDashboard />, path: "/dashboard" },
    { label: "Notifications", icon: <IoNotificationsOutline />, path: "/notifications" },
  ];

  return (
    <div>
      {/* ================== 📱 Mobile Navbar (bottom) ================== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg border-t border-gray-200 flex justify-around items-center py-2 z-50">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center cursor-pointer transition-all ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon.type className="text-2xl" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* ================== 💻 Medium & Large Navbar (top) ================== */}
      <div className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200 px-6 md:px-10 lg:px-16 py-2 md:py-3 lg:py-4 items-center justify-between">
        {/* Logo */}
        <div
          className="text-xl md:text-2xl lg:text-3xl font-bold italic text-blue-900 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => navigate("/")}
        >
          ScholarTrack
        </div>

        {/* Nav Links */}
        <div className="flex gap-4 md:gap-6 lg:gap-10 text-sm md:text-base lg:text-lg font-semibold">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <span
                key={idx}
                className={`cursor-pointer transition-colors hover:text-blue-600 ${
                  isActive ? "text-blue-700 underline underline-offset-4" : "text-gray-700"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </span>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* ================== 📏 Spacer ================== */}
      {/* Creates top padding so content doesn't go under fixed navbar */}
      <div className="h-14 md:h-16 lg:h-20" />
    </div>
  );
};
