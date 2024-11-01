const Loan = require("../models/Loan");

exports.applyLoan = async (req, res) => {
  try {
    console.log("Received loan application data:", req.body);
    const { amount, term } = req.body;
    const loan = new Loan({ userId: req.user.id, amount, term });
    await loan.save();
    res.status(201).json({ message: "Loan application submitted", loan });
  } catch (error) {
    console.error("Error applying for loan:", error); 
    res.status(400).json({ error: "Failed to apply for loan" });
  }
};


exports.approveLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndUpdate(
      id,
      { status: "APPROVED" },
      { new: true }
    );
    res.json({ message: "Loan approved", loan });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve loan" });
  }
};

exports.rejectLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndUpdate(
      id,
      { status: "REJECTED" },
      { new: true }
    );
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.json({ message: "Loan rejected", loan });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject loan" });
  }
};

exports.getOneLoan = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.json({ loans });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json({ loans });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch loans" });
  }
};

exports.repayLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    loan.remainingAmount -= amount;
    if (loan.remainingAmount < 0) {
      return res
        .status(400)
        .json({ error: "Repayment amount exceeds remaining loan amount" });
    }

    if (loan.remainingAmount === 0) {
      loan.status = "PAID"; 
    }

    await loan.save();
    res.json({ message: "Loan repaid successfully", loan });
  } catch (error) {
    res.status(500).json({ error: "Failed to process repayment" });
  }
};
