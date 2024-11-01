import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegSadCry } from "react-icons/fa";

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/loans`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoans(response.data.loans);
      } catch (err) {
        setError("Failed to load loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleApprove = async (loanId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/loans/${loanId}/approve`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoans(
        loans.map((loan) =>
          loan._id === loanId ? { ...loan, status: "APPROVED" } : loan
        )
      );
    } catch (err) {
      setError("Failed to approve the loan");
    }
  };

  const handleReject = async (loanId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/loans/${loanId}/reject`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoans(
        loans.map((loan) =>
          loan._id === loanId ? { ...loan, status: "REJECTED" } : loan
        )
      );
    } catch (err) {
      setError("Failed to reject the loan");
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your loans...</p>
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">Loan ID</th>
            <th className="p-2 border-b">User ID</th>
            <th className="p-2 border-b">Amount</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td colSpan="5">
                <div className="flex flex-col items-center justify-center h-64 p-6 text-center transition-all duration-300 ease-in-out transform bg-gray-100 border border-gray-300 rounded-lg shadow-lg hover:scale-105">
                  <FaRegSadCry className="mb-4 text-5xl text-gray-500" />
                  <p className="text-xl font-semibold text-gray-700">
                    No loan applications found
                  </p>
                  <p className="text-sm text-gray-500">
                    It seems there are currently no pending loan applications.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
              <tr key={loan._id} className="text-center hover:bg-gray-100">
                <td className="p-2 border-b">{parseInt(loan._id, 10)}</td>
                <td className="p-2 border-b">{parseInt(loan.userId, 10)}</td>
                <td className="p-2 border-b">{loan.amount}</td>
                <td className="p-2 border-b">{loan.status}</td>
                <td className="p-2 border-b">
                  {loan.status !== "APPROVED" && (
                    <button
                      className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                      onClick={() => handleApprove(loan._id)}
                    >
                      Approve
                    </button>
                  )}
                  {loan.status !== "REJECTED" && (
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      onClick={() => handleReject(loan._id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
