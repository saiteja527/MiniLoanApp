import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import LoanApplication from "./components/LoanApplication";
import LoanList from "./components/LoanList";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import RepayLoan from './components/RepayLoan';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    setUser(role === "customer");
  }, []);

  const handleLogin = (role) => {
    setUser(role === "customer");
    setIsAdmin(role === "admin");
  };

  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-100">
        <Navbar isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/apply"
            element={
              user && localStorage.getItem("token") && <LoanApplication />
            }
          />
          <Route
            path="/loans"
            element={user && localStorage.getItem("token") && <LoanList />}
          />
          <Route
            path="/repay"
            element={user && localStorage.getItem("token") && <RepayLoan/>}
          />
          <Route
            path="/dashboard"
            element={isAdmin && localStorage.getItem("token") && <Dashboard />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
