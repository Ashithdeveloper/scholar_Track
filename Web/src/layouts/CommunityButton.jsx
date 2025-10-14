import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

export const FloatingCommunityButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/community");
  };

  return (
    <div
      className="fixed right-78 z-50"
      style={{ bottom: "40px", transition: "all 0.3s ease" }} // increased bottom value
    >
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300"
        title="Community Forum"
      >
        <FaUsers className="text-2xl" />
      </button>
    </div>
  );
};
