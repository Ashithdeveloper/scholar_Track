import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import client from "../api/client"; // Axios wrapper

export const StudentLogin = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");

    try {
      const res = await client.apiPost('/api/user/login', { email, password })
      toast.success(res.message || 'Login successful', {
        onClose: () => navigate('/')
      })

      if (res.token) {
        localStorage.setItem("token", res.token);
        setUserToken(res.token); // Update App state
      }

      toast.success(res.message || "Login successful", {
        onClose: () => navigate("/"),
      });
    } catch (err) {
      const resp = err.response?.data || err.original?.response?.data;
      console.error("Login error:", resp || err);
      toast.error(resp?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-blue-100/50 backdrop-blur-md rounded-lg shadow-lg font-serif">
      <h3 className="text-2xl font-semibold text-center mb-6">Student Login</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@student.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign in
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          className="text-blue-600 underline text-sm hover:text-blue-700"
          onClick={() => navigate("/studentsignup")}
        >
          New Student Registration?
        </button>
      </div>
    </div>
  );
};
