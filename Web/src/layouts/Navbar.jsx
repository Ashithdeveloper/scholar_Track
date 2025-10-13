import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoHomeSharp,
  IoSearchSharp,
  IoNotificationsOutline,
} from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", icon: <IoHomeSharp className="text-2xl" />, path: "/" },
    { label: "Search", icon: <IoSearchSharp className="text-2xl" />, path: "/search" },
    { label: "Profile", icon: <VscAccount className="text-2xl" />, path: "/profile" },
    { label: "Dashboard", icon: <LuLayoutDashboard className="text-2xl" />, path: "/dashboard" },
    { label: "Notifications", icon: <IoNotificationsOutline className="text-2xl" />, path: "/notifications" },
  ];

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="bg-cyan-200/35 text-sm backdrop-blur-md shadow-2xl text-shadow-xl fixed w-full bottom-0 p-1 flex flex-row justify-around gap-2 items-center md:hidden">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between items-center cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="font-semibold text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-row justify-between items-center p-4 bg-cyan-200/30 backdrop-blur-md shadow-2xl fixed w-full top-0 z-10 text-shadow-lg">
        <div className="text-2xl font-bold italic text-blue-900">ScholarTrack</div>
        <div className="flex flex-row gap-6 text-lg font-semibold">
          {navItems.map((item, idx) => (
            <span
              key={idx}
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Spacer div for fixed navbar */}
      <div className="md:h-20 h-16" />
    </div>
  );
};
