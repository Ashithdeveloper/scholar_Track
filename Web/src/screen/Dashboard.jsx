import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { FiBell, FiBookmark, FiClock } from "react-icons/fi";

export const Dashboard = () => {
  const chartData = [
    { month: "Jan", applications: 4, accepted: 2, rejected: 1, amount: 2000 },
    { month: "Feb", applications: 8, accepted: 5, rejected: 2, amount: 5000 },
    { month: "Mar", applications: 3, accepted: 1, rejected: 1, amount: 1000 },
    { month: "Apr", applications: 6, accepted: 3, rejected: 2, amount: 3000 },
    { month: "May", applications: 10, accepted: 6, rejected: 2, amount: 7000 },
  ];

  const pieData = [
    { name: "Accepted", value: 14 },
    { name: "Rejected", value: 5 },
    { name: "Pending", value: 9 },
  ];

  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  const summaryCards = [
    { title: "Total Scholarships", value: 52, icon: <FaUniversity />, color: "from-blue-500 to-indigo-600" },
    { title: "Applied", value: 18, icon: <MdOutlineSchool />, color: "from-green-500 to-emerald-600" },
    { title: "Saved", value: 12, icon: <FiBookmark />, color: "from-yellow-400 to-amber-500" },
    { title: "Pending Reviews", value: 5, icon: <FiClock />, color: "from-pink-500 to-rose-600" },
  ];

  const recentApplications = [
    { name: "National Merit Scholarship", level: "Undergraduate", amount: "$2000", date: "2025-09-14", status: "Under Review" },
    { name: "Global Education Fund", level: "Postgraduate", amount: "$5000", date: "2025-09-10", status: "Accepted" },
    { name: "Science Olympiad Grant", level: "High School", amount: "$1000", date: "2025-08-28", status: "Rejected" },
  ];

  const recommendedScholarships = [
    { name: "International Excellence Scholarship", type: "Merit-Based", amount: "$4000", deadline: "2025-11-30" },
    { name: "Women in STEM Grant", type: "Special Program", amount: "$3500", deadline: "2025-12-15" },
    { name: "Community Leadership Award", type: "Merit-Based", amount: "$2500", deadline: "2025-10-20" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          📊 Scholarship Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Track your scholarships, applications, and upcoming opportunities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${card.color} text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm opacity-90">{card.title}</h3>
              <div className="text-2xl opacity-90">{card.icon}</div>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        {/* Bar Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Application Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#4B5563" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#4F46E5" radius={[12, 12, 0, 0]} />
                <Bar dataKey="accepted" fill="#10B981" radius={[12, 12, 0, 0]} />
                <Bar dataKey="rejected" fill="#EF4444" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Application Status</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Monthly Scholarship Amount</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#4B5563" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 overflow-x-auto mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Applications 📝</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-3 px-4">Scholarship</th>
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentApplications.map((app, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{app.name}</td>
                <td className="py-3 px-4 text-gray-600">{app.level}</td>
                <td className="py-3 px-4 text-gray-600">{app.amount}</td>
                <td className="py-3 px-4 text-gray-600">{app.date}</td>
                <td className={`py-3 px-4 font-semibold ${
                  app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"
                }`}>
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommended Scholarships */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Recommended Scholarships ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedScholarships.map((rec, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-lg text-blue-800 mb-2">{rec.name}</h3>
              <p className="text-gray-600 text-sm mb-1">Type: {rec.type}</p>
              <p className="text-gray-600 text-sm mb-1">Amount: {rec.amount}</p>
              <p className="text-gray-600 text-sm mb-4">Deadline: {rec.deadline}</p>
              <button className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ScholarTrack — Designed with 💙 for students
      </footer>
    </div>
  );
};
