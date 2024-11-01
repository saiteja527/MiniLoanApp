const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema(
  {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["DUE", "PAID"], default: "DUE" },
    paymentMethod: {
      type: String,
      enum: ["CASH", "BANK_TRANSFER", "CARD"],
      default: "BANK_TRANSFER",
    },
    notes: { type: String },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Repayment", repaymentSchema);
