import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export const SearchPage = () => {
  // Initial stable data
  const initialScholarships = [
    { id: 1, name: "National Merit Scholarship", level: "Undergraduate", amount: "$2000", date: "2025-09-14", status: "Under Review" },
    { id: 2, name: "Global Education Fund", level: "Postgraduate", amount: "$5000", date: "2025-09-10", status: "Accepted" },
    { id: 3, name: "Science Olympiad Grant", level: "High School", amount: "$1000", date: "2025-08-28", status: "Rejected" },
    { id: 4, name: "International Excellence Scholarship", level: "Undergraduate", amount: "$4000", date: "2025-10-05", status: "Pending" },
    { id: 5, name: "Women in STEM Grant", level: "Postgraduate", amount: "$3500", date: "2025-12-15", status: "Accepted" },
    { id: 6, name: "Community Leadership Award", level: "Undergraduate", amount: "$2500", date: "2025-10-20", status: "Under Review" },
  ];

  // Persistent state
  const [scholarships, setScholarships] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("scholarships");
    return saved ? JSON.parse(saved) : initialScholarships;
  });

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(scholarships);
  const [selected, setSelected] = useState([]);

  // Save changes to localStorage to persist
  useEffect(() => {
    localStorage.setItem("scholarships", JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    filterData();
  }, [query, statusFilter, scholarships]);

  const filterData = () => {
    let result = scholarships;
    if (query) {
      result = result.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }
    setFilteredData(result);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-yellow-200 text-yellow-800 px-1 rounded">{part}</span> : part
    );
  };

  const getStatusBadge = status => {
    const base = "px-3 py-1 rounded-full text-sm font-semibold";
    switch (status) {
      case "Accepted": return `${base} bg-green-100 text-green-800`;
      case "Rejected": return `${base} bg-red-100 text-red-800`;
      case "Under Review": return `${base} bg-yellow-100 text-yellow-800`;
      case "Pending": return `${base} bg-blue-100 text-blue-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  // Checkbox select/unselect
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const bulkDelete = () => {
    setScholarships(scholarships.filter(sch => !selected.includes(sch.id)));
    setSelected([]);
  };

  const bulkUpdateStatus = (status) => {
    const updated = scholarships.map(sch => selected.includes(sch.id) ? { ...sch, status } : sch);
    setScholarships(updated);
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🔍 Search Scholarships</h1>

      {/* Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <button
          onClick={bulkDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          disabled={selected.length === 0}
        >
          Delete Selected
        </button>
        <select
          onChange={e => bulkUpdateStatus(e.target.value)}
          value=""
          className="p-2 rounded-lg border border-gray-300"
          disabled={selected.length === 0}
        >
          <option value="">Update Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Under Review">Under Review</option>
          <option value="Pending">Pending</option>
        </select>
        <div className="ml-auto flex-1 relative">
          <input
            type="text"
            placeholder="Search by scholarship name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
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

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b bg-gray-100">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  onChange={e => {
                    if (e.target.checked) setSelected(filteredData.map(sch => sch.id));
                    else setSelected([]);
                  }}
                />
              </th>
              <th className="py-3 px-4">Scholarship</th>
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(sch => (
                <tr key={sch.id} className="border-b hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="py-3 px-4">
                    <input type="checkbox" checked={selected.includes(sch.id)} onChange={() => toggleSelect(sch.id)} />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{highlightText(sch.name, query)}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.level || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.amount || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{sch.date || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span className={getStatusBadge(sch.status)}>{sch.status || "Pending"}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No scholarships found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
