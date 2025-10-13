import React, { useEffect, useState } from "react";
import client from "../api/client";

export default function ProfilePage() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const res = await client.apiGet("/api/user/getme", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">No user data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
        {user.fullname}'s Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-gray-700">Email:</p>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Phone Number:</p>
          <p className="text-gray-900">{user.phoneNumber}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Gender:</p>
          <p className="text-gray-900">{user.gender}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Category:</p>
          <p className="text-gray-900">{user.category}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Caste:</p>
          <p className="text-gray-900">{user.caste}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Institution:</p>
          <p className="text-gray-900">{user.institution}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Last Education:</p>
          <p className="text-gray-900">{user.lasteducation}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-700">Percentage:</p>
          <p className="text-gray-900">{user.percentage}%</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
