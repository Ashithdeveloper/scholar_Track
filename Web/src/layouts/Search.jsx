import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchPage = ({ scholarships }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [query, statusFilter, scholarships]);

  const filterData = () => {
    let result = scholarships;

    if (query) {
      result = result.filter(item =>
        item.name?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }

    setFilteredData(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🔍 Search Scholarships
      </h1>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by scholarship name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        >
          <option value="">All Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Under Review">Under Review</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Filtered Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-x-auto">
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
            {filteredData.length > 0 ? (
              filteredData.map((sch, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{sch.name}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.level || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.amount || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.date || "N/A"}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      sch.status === "Accepted"
                        ? "text-green-600"
                        : sch.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {sch.status || "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
