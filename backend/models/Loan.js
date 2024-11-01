const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true },
  status: { type: String, default: "PENDING" },
  remainingAmount: {
    type: Number,
    default: function () {
      return this.amount;
    },
  }, 
});

module.exports = mongoose.model("Loan", loanSchema);
