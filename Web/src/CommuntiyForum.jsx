import React, { useState } from "react";
import { FaUsers, FaSearch, FaPlus } from "react-icons/fa";

const dummyThreads = [
  { id: 1, title: "Tips for Scholarship Applications", user: "Alice", replies: 12, lastActivity: "2h ago" },
  { id: 2, title: "Best Websites for Scholarships", user: "Bob", replies: 8, lastActivity: "1d ago" },
  { id: 3, title: "How to improve your GPA for scholarships", user: "Charlie", replies: 5, lastActivity: "3d ago" },
  { id: 4, title: "STEM Scholarships for Women", user: "Diana", replies: 20, lastActivity: "5h ago" },
];

export const CommunityForum = () => {
  const [search, setSearch] = useState("");

  const filteredThreads = dummyThreads.filter(thread =>
    thread.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">💬 Community Forum</h1>
          <p className="text-gray-600 text-lg md:text-base">
            Join discussions, share experiences, and get scholarship tips from the community.
          </p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <FaPlus /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search threads..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Threads List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThreads.map(thread => (
          <div
            key={thread.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{thread.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>👤 {thread.user}</span>
              <span>🕒 {thread.lastActivity}</span>
            </div>
            <div className="text-sm text-gray-600">
              Replies: <span className="font-semibold">{thread.replies}</span>
            </div>
          </div>
        ))}
        {filteredThreads.length === 0 && (
          <p className="text-gray-500 col-span-full">No threads match your search.</p>
        )}
      </div>
    </div>
  );
};
