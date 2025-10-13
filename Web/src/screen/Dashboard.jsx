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
  const chartData = [
    { month: "Jan", applications: 4, accepted: 2, rejected: 1, amount: 2000 },
    { month: "Feb", applications: 8, accepted: 5, rejected: 2, amount: 5000 },
    { month: "Mar", applications: 3, accepted: 1, rejected: 1, amount: 1000 },
    { month: "Apr", applications: 6, accepted: 3, rejected: 2, amount: 3000 },
    { month: "May", applications: 10, accepted: 6, rejected: 2, amount: 7000 },
  ];

  // Multidimensional Pie chart data
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

  const summaryCards = [
    { title: "Total Scholarships", value: 52, icon: <FaUniversity />, color: "from-blue-500 to-indigo-600" },
    { title: "Applied", value: 18, icon: <MdOutlineSchool />, color: "from-green-500 to-emerald-600" },
    { title: "Saved", value: 12, icon: <FiBookmark />, color: "from-yellow-400 to-amber-500" },
    { title: "Pending Reviews", value: 5, icon: <FiClock />, color: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">📊 Scholarship Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Professional insights into your scholarship applications
        </p>
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

      {/* Charts Section */}
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
                {/* Outer Pie - Status */}
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

                {/* Inner Pie - Priority */}
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
                    <Cell key={`cell-inner-${index}`} fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]} />
                  ))}
                </Pie>

                <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "10px", border: "1px solid #E5E7EB" }} />
                <Legend verticalAlign="bottom" height={36} />
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
    </div>
  );
};
