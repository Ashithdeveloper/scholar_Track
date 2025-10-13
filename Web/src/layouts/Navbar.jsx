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
    {
      label: "Search",
      icon: <IoSearchSharp className="text-2xl" />,
      path: "/search",
    },
    {
      label: "Profile",
      icon: <VscAccount className="text-2xl" />,
      path: "/profile",
    },
    {
      label: "Dashboard",
      icon: <LuLayoutDashboard className="text-2xl" />,
      path: "/dashboard",
    },
    {
      label: "Notifications",
      icon: <IoNotificationsOutline className="text-2xl" />,
      path: "/notifications",
    },
    {
      label: "community page",
      icon: <VscAccount className="text-2xl" />,
      path: null,
    },
  ];

  return (
    <div>
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-4 mx-4 w-[calc(100%-2rem)] bg-white/70 backdrop-blur-lg shadow-lg rounded-xl p-2 flex justify-around items-center z-50">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => item.path && navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow-lg border-b border-gray-200 px-8 py-3 items-center justify-between z-50">
        <div
          className="text-3xl font-bold italic text-blue-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ScholarTrack
        </div>
        <ul className="flex gap-8 text-lg font-semibold">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => item.path && navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {/* Spacer div for fixed navbar */}
      <div className="md:h-20 h-16" />
    </div>
  );
};
