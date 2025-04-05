import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "@fontsource/opendyslexic"; // Import OpenDyslexic font

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token); // Store token
        navigate("/user"); // Redirect to dashboard
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e9c7b2] px-4">
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white border-2 border-white/70 shadow-2xl shadow-gray-500 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md transition-transform transform hover:scale-105 duration-300">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#323232] mb-6 text-center font-[OpenDyslexic]">
          Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base transition-opacity duration-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              className="block mb-1 text-sm sm:text-lg font-medium text-[#323232] font-[OpenDyslexic]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white/40 text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block mb-1 text-sm sm:text-lg font-medium text-[#323232] font-[OpenDyslexic]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white/40 text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#323232] text-white px-6 py-2 rounded-full text-lg font-medium shadow-lg shadow-gray-500 transition-transform transform duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110 hover:bg-gray-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
