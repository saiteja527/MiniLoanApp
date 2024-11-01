import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const RepayLoan = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get(
          "http://localhost:5000/api/loans/myloans"
        );
        console.log("API Response:", response.data);
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

  const handleRepayment = async () => {
    if (!selectedLoan || repaymentAmount <= 0) {
      setMessage("Please select a loan and enter a valid repayment amount.");
      return;
    }
    if (repaymentAmount > selectedLoan.remainingAmount) {
      setMessage("Repayment amount exceeds remaining loan amount.");
      return;
    }

    try {
      const response = await api.patch(
        `http://localhost:5000/api/loans/${selectedLoan._id}/repay`,
        { amount: repaymentAmount }
      );
      setMessage(response.data.message);
      setRepaymentAmount(0);

      const updatedLoans = loans.map((loan) =>
        loan._id === selectedLoan._id
          ? {
              ...loan,
              remainingAmount: loan.remainingAmount - repaymentAmount,
            }
          : loan
      );

      setLoans(updatedLoans);
      if (updatedLoans.find((loan) => loan.remainingAmount <= 0)) {
        setMessage("You have fully paid off this loan.");
      }
    } catch (error) {
      console.error("Failed to repay loan:", error.response?.data?.error);
      setError("Failed to repay loan.");
    }
  };

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
      <h2 className="mb-4 text-2xl font-bold">Repay Loan</h2>
      {message && <p className="text-green-600">{message}</p>}
      <div className="mb-4">
        <label htmlFor="loan-select" className="block mb-2">
          Select Loan:
        </label>
        <select
          id="loan-select"
          className="p-2 border rounded"
          value={selectedLoan ? selectedLoan._id : ""}
          onChange={(e) => {
            const loan = loans.find((loan) => loan._id === e.target.value);
            setSelectedLoan(loan);
          }}
        >
          <option value="">-- Select a loan --</option>
          {loans.map((loan) => (
            <option key={loan._id} value={loan._id}>
              {`Loan Amount: $${loan.amount || 0}, Remaining Amount: $${
                loan.remainingAmount || 0
              }`}
            </option>
          ))}
        </select>
      </div>
      {selectedLoan && (
        <div>
          <label htmlFor="repayment-amount" className="block mb-2">
            Repayment Amount:
          </label>
          <input
            type="number"
            id="repayment-amount"
            className="p-2 border rounded"
            value={repaymentAmount}
            onChange={(e) => setRepaymentAmount(Number(e.target.value))}
          />
          <button
            onClick={handleRepayment}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Repay
          </button>
        </div>
      )}
    </div>
  );
};

export default RepayLoan;
