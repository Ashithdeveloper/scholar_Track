import React, { useState } from "react";
import { FiBell, FiCheckCircle, FiAlertCircle, FiInfo, FiTrash2 } from "react-icons/fi";

export const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Scholarship Approved",
      message: "Your application for the National Merit Scholarship has been accepted.",
      type: "success",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Deadline Reminder",
      message: "Don't miss the deadline for the Global Education Fund.",
      type: "warning",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Scholarship Update",
      message: "New scholarships matching your profile are available.",
      type: "info",
      time: "3 days ago",
    },
    {
      id: 4,
      title: "Application Rejected",
      message: "Unfortunately, your application for Science Olympiad Grant was not approved.",
      type: "error",
      time: "5 days ago",
    },
  ]);

  const handleClear = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-500 text-xl" />;
      case "warning":
        return <FiAlertCircle className="text-yellow-500 text-xl" />;
      case "info":
        return <FiInfo className="text-blue-500 text-xl" />;
      case "error":
        return <FiAlertCircle className="text-red-500 text-xl" />;
      default:
        return <FiBell className="text-gray-400 text-xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiBell className="text-blue-600 text-3xl" /> Notifications
          </h1>
          {notifications.length > 0 && (
            <button
              onClick={() => setNotifications([])}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex justify-between items-start"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {getIcon(note.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{note.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{note.message}</p>
                    <span className="text-xs text-gray-400 mt-2 block">
                      {note.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleClear(note.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <FiBell className="text-gray-400 text-5xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                No new notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
