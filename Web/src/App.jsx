import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { MainLogin } from "./MainLogin";
import { StudentSignUp } from "./login&signup/StudentSignUp";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";
import { Home } from "./Home";
import { useState, useEffect } from "react";

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      console.log("Token loaded:", token);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
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

        <Routes>
          {/* Protected Home route */}
          <Route
            path="/"
            element={
              userToken ? (
                <Home userToken={userToken} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Login route */}
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

          {/* Student signup route */}
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
