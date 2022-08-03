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

router.get("/categories", auth, ctrlWrapper(ctrl.listCategories));

module.exports = router;
