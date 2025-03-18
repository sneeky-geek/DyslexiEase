import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/auth/signup", {
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[#e9c7b2]">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#323232] mb-6 text-center">
          Sign Up
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <label className="block mb-1 text-sm sm:text-lg font-medium text-[#323232]" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Field */}
          <label className="block mt-4 mb-1 text-sm sm:text-lg font-medium text-[#323232]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <label className="block mt-4 mb-1 text-sm sm:text-lg font-medium text-[#323232]" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-[#323232] text-white text-lg py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
