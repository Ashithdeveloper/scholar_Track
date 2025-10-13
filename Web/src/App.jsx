import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { MainLogin } from "./MainLogin";
import { StudentSignUp } from "./login&signup/StudentSignUp";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";
import { Home } from "./Home";
import Profilepage from "./screen/Profilepage";
import { Navbar } from "./layouts/Navbar";
import { ScholarshipDetail } from "./screen/ScholarshipDetails";
import { Dashboard } from "./screen/Dashboard";
import { Notification } from "./screen/Notification";
import { Chatbot } from "./Chatbot"; // Import chatbot component
import { useState, useEffect } from "react";
import client from "./api/client";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
  }, []);

  // Fetch scholarships
  const getScholarships = async () => {
    if (!userToken) return;
    try {
      setLoading(true);
      const res = await client.apiGet("/api/scholarship/", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setScholarships(res.scholarships || []);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) getScholarships();
  }, [userToken]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  // Private route wrapper
  const PrivateRoute = ({ children }) => {
    return userToken ? children : <Navigate to="/login" replace />;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Toast notifications */}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          toastClassName={({ type }) =>
            `backdrop-blur-md border rounded-md p-3 m-2 shadow-lg max-w-lg w-full ` +
            (type === "error"
              ? "bg-red-600/40 border-red-400"
              : type === "success"
              ? "bg-green-600/40 border-green-400"
              : "bg-blue-600/40 border-gray-200")
          }
          bodyClassName={({ type }) =>
            type === "error" || type === "success"
              ? "text-white p-3"
              : "text-black p-3"
          }
        />

        {/* Navbar */}
        {userToken && <Navbar handleLogout={handleLogout} />}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home
                  userToken={userToken}
                  scholarships={scholarships}
                  setScholarships={setScholarships}
                  loading={loading}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notification />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profilepage userToken={userToken} />
              </PrivateRoute>
            }
          />
          <Route
            path="/scholarship/:id"
            element={
              <PrivateRoute>
                <ScholarshipDetail scholarships={scholarships} />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              userToken ? <Navigate to="/" replace /> : <MainLogin setUserToken={setUserToken} />
            }
          />
          <Route
            path="/studentsignup"
            element={
              userToken ? <Navigate to="/" replace /> : <StudentSignUp setUserToken={setUserToken} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Chatbot (floating) */}
        {userToken && <Chatbot />}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
