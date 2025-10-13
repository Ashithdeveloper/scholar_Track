import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { FiBell, FiBookmark } from "react-icons/fi";

export const Dashboard = () => {
  // 📈 Sample Data for Chart
  const chartData = [
    { month: "Jan", applications: 4 },
    { month: "Feb", applications: 8 },
    { month: "Mar", applications: 3 },
    { month: "Apr", applications: 6 },
    { month: "May", applications: 10 },
  ];

  const summaryCards = [
    {
      title: "Total Scholarships",
      value: 52,
      icon: <FaUniversity />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Applied",
      value: 18,
      icon: <MdOutlineSchool />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Saved",
      value: 12,
      icon: <FiBookmark />,
      color: "from-yellow-400 to-amber-500",
    },
    {
      title: "Notifications",
      value: 5,
      icon: <FiBell />,
      color: "from-pink-500 to-rose-600",
    },
  ];

  const recentApplications = [
    {
      name: "National Merit Scholarship",
      date: "2025-09-14",
      status: "Under Review",
    },
    {
      name: "Global Education Fund",
      date: "2025-09-10",
      status: "Accepted",
    },
    {
      name: "Science Olympiad Grant",
      date: "2025-08-28",
      status: "Rejected",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 font-sans">
      {/* ✨ Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
          📊 Your Scholarship Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          A personalized space to track, explore, and manage your scholarship journey.
        </p>
      </div>

      {/* 🌟 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow-xl backdrop-blur-lg hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium opacity-90">{card.title}</h3>
              <div className="text-2xl opacity-90">{card.icon}</div>
            </div>
            <p className="text-3xl font-bold tracking-wide">{card.value}</p>
          </div>
        ))}
      </div>

      {/* 📈 Chart Section */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-10 border border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-shadow">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Application Trends
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="month" stroke="#4B5563" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Bar
                dataKey="applications"
                fill="#4F46E5"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🏆 Scholarship Recommendations */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Recommended Scholarships ✨
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((rec) => (
            <div
              key={rec}
              className="group border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-xl hover:bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-300"
            >
              <h3 className="font-bold text-lg text-blue-800 mb-2 group-hover:text-indigo-700 transition-colors">
                Scholarship #{rec}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                A great opportunity for higher studies with funding support and
                recognition.
              </p>
              <button className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 px-4 py-2 rounded-full shadow-md transition-transform hover:scale-105">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🕒 Recent Applications */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Recent Applications 📝
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 text-sm border-b">
                <th className="py-3 px-4">Scholarship</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {app.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{app.date}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      app.status === "Accepted"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧭 Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ScholarTrack — Designed with 💙 for students
      </footer>
    </div>
  );
};
