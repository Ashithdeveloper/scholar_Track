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
    try {
      setLoading(true);
      const res = await client.apiGet("/api/scholarship/", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setScholarships(res.scholarships || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) getScholarships();
  }, [userToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
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
        <Navbar handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              userToken ? (
                <Home
                  userToken={userToken}
                  scholarships={scholarships}
                  setScholarships={setScholarships}
                  loading={loading}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              userToken ? (
                <Navigate to="/" replace />
              ) : (
                <MainLogin setUserToken={setUserToken} />
              )
            }
          />
          <Route
            path="/studentsignup"
            element={
              userToken ? (
                <Navigate to="/" replace />
              ) : (
                <StudentSignUp setUserToken={setUserToken} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              userToken ? (
                <Profilepage userToken={userToken} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/scholarship/:id"
            element={<ScholarshipDetail scholarships={scholarships} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
