import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">
        Welcome to the Loan Application System
      </h1>
      <p className="mb-4 text-lg">
        Your trusted platform for applying and managing loans.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 text-white bg-blue-500 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 text-white bg-green-500 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
