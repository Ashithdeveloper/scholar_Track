import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = ({ scholarships, loading }) => {
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading scholarships...
      </div>
    );

  if (!scholarships || scholarships.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500 font-semibold">
        No scholarships available.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-gray-800">
        Explore Scholarships
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((scholar, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/scholarship/${idx}`)}
            className="relative cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-200"
          >
            {/* Header Gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 relative">
              <h2 className="text-xl sm:text-2xl font-bold">
                {scholar.scholarship_name}
              </h2>
              <p className="mt-1 text-sm sm:text-base">
                {scholar["providerName "]}
              </p>

              {/* Footer Badge moved inside header */}
              <div className="absolute top-1 right-4 bg-white/30 px-3 py-1 mb-3 rounded-full text-sm font-semibold text-white backdrop-blur-sm">
                Prize: {scholar.scholar_prize}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
              <p className="text-gray-500 text-sm">
                Deadline: {scholar.deadline}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {scholar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
