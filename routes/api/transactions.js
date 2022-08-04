const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const { transactions: ctrl } = require("../../controllers");
const { transactionAddSchema } = require("../../models/transaction");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listTransactions));

router.post(
  "/",
  auth,
  validation(transactionAddSchema),
  ctrlWrapper(ctrl.addTransaction)
);

router.post("/month", auth, ctrlWrapper(ctrl.listTransactionsForMonth));

router.post("/year", auth, ctrlWrapper(ctrl.listTransactionsForYear));

router.get("/categories", auth, ctrlWrapper(ctrl.listCategories));

module.exports = router;
