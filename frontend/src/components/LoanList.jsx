import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { BiSad } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; 

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get(
          "http://localhost:5000/api/loans/myloans"
        );
        setLoans(response.data.loans || []);
      } catch (error) {
        console.error("Failed to fetch loans:", error.response?.data?.error);
        setError("Failed to fetch loans");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading loans data...</p>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">My Loans</h2>
      {loans.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-center bg-yellow-100 border border-yellow-300 rounded">
          <BiSad className="w-12 h-12 mb-4 text-yellow-500" />
          <p className="mb-2 text-lg font-semibold">No loans found</p>
          <p className="text-gray-600">
            It looks like you haven’t applied for any loans yet.
          </p>
          <p className="mt-4">
            <a
              href="/apply"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Apply for a Loan
            </a>
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-2">
            {loans.map((loan) => (
              <li
                key={loan._id}
                className="p-4 bg-white border rounded shadow-md"
              >
                <p>
                  <strong>Amount:</strong> ${loan.amount}
                </p>
                <p>
                  <strong>Status:</strong> {loan.status}
                </p>
                <p>
                  <strong>Term:</strong> {loan.term} weeks
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={() => navigate("/repay")} 
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Repay Loan
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoanList;
