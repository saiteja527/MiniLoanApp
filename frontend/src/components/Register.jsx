import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      setMessage("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Registration failed: ${error.response.data.error}`);
      } else {
        setMessage("Registration failed: Server error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm p-8 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
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
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="ml-2 text-xl text-blue-500">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
