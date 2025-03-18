import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

      console.log("Login Response:", response.data);

      if (response.data.token) {
        sessionStorage.setItem("authToken", response.data.token);
        console.log("Token Stored:", sessionStorage.getItem("authToken"));

        window.location.reload(); // Force UI update after login
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err.response);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e9c7b2] px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#323232] mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-lg font-medium text-[#323232]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border rounded-md text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-lg font-medium text-[#323232]" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 mb-6 border rounded-md text-[#323232] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-lg text-white py-2 px-4 rounded-md transition duration-300 ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#323232] hover:bg-gray-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
