import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      onLogin(response.data.role); 
      setMessage("Login successful!");
      setTimeout(() => {
        navigate(response.data.role === "admin" ? "/dashboard" : "/apply");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Login failed: ${error.response.data.error}`);
      } else {
        setMessage("Login failed: Server error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("failed") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="ml-2 text-xl text-blue-500">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
