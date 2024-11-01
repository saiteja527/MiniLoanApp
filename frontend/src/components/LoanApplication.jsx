import React, { useState } from "react";
import api from "../api/axiosInstance";

const LoanApplication = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);
    const numericTerm = Number(term);

    if (
      !numericAmount ||
      !numericTerm ||
      numericAmount <= 0 ||
      numericTerm <= 0
    ) {
      setMessage("Please enter valid positive values for amount and term.");
      setIsError(true);
      return;
    }

    try {
      console.log({ amount: numericAmount, term: numericTerm });

      await api.post("http://localhost:5000/api/loans", {
        amount: numericAmount,
        term: numericTerm,
      });
      setMessage("Loan application submitted successfully!");
      setIsError(false);
      setAmount("");
      setTerm("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(
        "Loan application failed:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        "Loan application failed: " +
          (error.response ? error.response.data.error : error.message)
      );
      setIsError(true);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleApply}
        className="w-full max-w-md p-8 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Apply for a Loan
        </h2>

        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              isError
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {message}
          </div>
        )}

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Term (in weeks)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;
