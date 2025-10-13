import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fontsource/opendyslexic"; // Import OpenDyslexic font

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9c7b2] px-4 sm:px-6">
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white border-2 border-white/60 shadow-2xl shadow-gray-500 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md transition-transform transform hover:scale-105 duration-300">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#323232] mb-6 text-center font-[OpenDyslexic]">
          Sign Up
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base transition-opacity duration-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              className="block mb-1 text-sm sm:text-lg font-medium text-[#323232] font-[OpenDyslexic]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/40 text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/40 text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/40 text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#323232] text-white px-6 py-2 rounded-full text-lg font-medium shadow-lg shadow-gray-500 transition-transform transform hover:scale-110 hover:bg-gray-700 duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
