import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { FiBookmark, FiClock } from "react-icons/fi";

export const Dashboard = () => {
  // Chart Data
  const chartData = [
    { month: "Jan", applications: 4, accepted: 2, rejected: 1, amount: 2000 },
    { month: "Feb", applications: 8, accepted: 5, rejected: 2, amount: 5000 },
    { month: "Mar", applications: 3, accepted: 1, rejected: 1, amount: 1000 },
    { month: "Apr", applications: 6, accepted: 3, rejected: 2, amount: 3000 },
    { month: "May", applications: 10, accepted: 6, rejected: 2, amount: 7000 },
  ];

  // Multidimensional Pie Data
  const pieDataStatus = [
    { name: "Accepted", value: 14 },
    { name: "Rejected", value: 5 },
    { name: "Pending", value: 9 },
  ];
  const pieDataPriority = [
    { name: "High Priority", value: 10 },
    { name: "Medium Priority", value: 12 },
    { name: "Low Priority", value: 6 },
  ];

  const COLORS_STATUS = ["#4CAF50", "#F44336", "#FFC107"];
  const COLORS_PRIORITY = ["#1E3A8A", "#3B82F6", "#93C5FD"];

  // Summary Cards
  const summaryCards = [
    { title: "Total Scholarships", value: 52, icon: <FaUniversity />, color: "from-blue-500 to-indigo-600" },
    { title: "Applied", value: 18, icon: <MdOutlineSchool />, color: "from-green-500 to-emerald-600" },
    { title: "Saved", value: 12, icon: <FiBookmark />, color: "from-yellow-400 to-amber-500" },
    { title: "Pending Reviews", value: 5, icon: <FiClock />, color: "from-pink-500 to-rose-600" },
  ];

  // Recent Applications
  const recentApplications = [
    { name: "National Merit Scholarship", level: "Undergraduate", amount: "$2000", date: "2025-09-14", status: "Under Review" },
    { name: "Global Education Fund", level: "Postgraduate", amount: "$5000", date: "2025-09-10", status: "Accepted" },
    { name: "Science Olympiad Grant", level: "High School", amount: "$1000", date: "2025-08-28", status: "Rejected" },
  ];

  // Recommended Scholarships
  const recommendedScholarships = [
    { name: "International Excellence Scholarship", type: "Merit-Based", amount: "$4000", deadline: "2025-11-30" },
    { name: "Women in STEM Grant", type: "Special Program", amount: "$3500", deadline: "2025-12-15" },
    { name: "Community Leadership Award", type: "Merit-Based", amount: "$2500", deadline: "2025-10-20" },
  ];

  // Status Overview
  const statusOverview = [
    { status: "Accepted", count: 14 },
    { status: "Rejected", count: 5 },
    { status: "Pending", count: 9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">📊 Scholarship Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">Professional insights into your scholarship applications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-r ${card.color} text-white rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">{card.title}</h3>
              <div className="text-2xl">{card.icon}</div>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
        {/* Stacked Area Chart */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Application Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px", border: "1px solid #E5E7EB" }} />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#4F46E5" fill="url(#colorApps)" />
                <Area type="monotone" dataKey="accepted" stackId="1" stroke="#10B981" fill="url(#colorAccepted)" />
                <Area type="monotone" dataKey="rejected" stackId="1" stroke="#EF4444" fill="url(#colorRejected)" />
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multidimensional Donut Chart */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Application Overview</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDataStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieDataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
                  ))}
                </Pie>

                <Pie
                  data={pieDataPriority}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={45}
                  innerRadius={20}
                  labelLine={false}
                >
                  {pieDataPriority.map((entry, index) => (
                    <Cell key={`inner-${index}`} fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px", border: "1px solid #E5E7EB" }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Monthly Scholarship Amount</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px", border: "1px solid #E5E7EB" }} />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 overflow-x-auto mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Recent Applications 📝</h2>
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
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Recommended Scholarships ✨</h2>
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

      {/* Status Overview Table */}
      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Application Status Overview</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Count</th>
            </tr>
          </thead>
          <tbody>
            {statusOverview.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{item.status}</td>
                <td className="py-3 px-4 text-gray-600">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ScholarTrack — Designed with 💙 for students
      </footer>
    </div>
  );
};
