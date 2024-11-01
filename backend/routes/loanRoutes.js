const express = require("express");
const {
  applyLoan,
  approveLoan,
  getOneLoan,
  getAllLoans,
  rejectLoan,
  repayLoan, 
} = require("../controllers/loanController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, applyLoan);
router.patch("/:id/approve", authMiddleware, approveLoan);
router.patch("/:id/reject", authMiddleware, rejectLoan);
router.patch("/:id/repay", authMiddleware, repayLoan);
router.get("/myloans", authMiddleware, getOneLoan);
router.get("/", authMiddleware, getAllLoans);

module.exports = router;
