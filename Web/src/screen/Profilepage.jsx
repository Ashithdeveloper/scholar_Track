import React, { useEffect, useState } from "react";
import client from "../api/client";

export default function ProfilePage() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const res = await client.apiGet("/api/user/getme", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getMe();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">No user data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">{user.fullname}</h2>
          <p className="text-md md:text-lg mt-1 opacity-90">{user.institution || "Student"}</p>
        </div>

        {/* Profile Details */}
        <div className="p-8 md:p-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Phone Number" value={user.phoneNumber} />
            <ProfileItem label="Gender" value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1)} />
            <ProfileItem label="Category" value={user.category} />
            <ProfileItem label="Caste" value={user.caste} />
            <ProfileItem label="Institution" value={user.institution} />
            <ProfileItem label="Last Education" value={user.lasteducation.toUpperCase()} />
            <ProfileItem label="Percentage" value={`${user.percentage}%`} />
          </div>

          {/* Edit Button */}
          <div className="text-center mt-6">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for profile fields
const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-100/50 rounded-lg p-4 flex flex-col">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-900 font-semibold mt-1">{value || "-"}</span>
  </div>
);
