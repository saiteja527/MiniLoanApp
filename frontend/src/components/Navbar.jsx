import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 text-xl bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-white">Mini Loan App</h1>
        <div className="space-x-4">
          {!isLoggedIn && (
            <Link to="/" className="text-white">
              Home
            </Link>
          )}
          {isLoggedIn && (
            <>
              {!isAdmin ? (
                <>
                  <Link to="/apply" className="text-white">
                    Apply for a Loan
                  </Link>
                  <Link to="/loans" className="text-white">
                    My Loans
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-white">
                    Dashboard
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
