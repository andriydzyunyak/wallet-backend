const { Transaction } = require("../../models/transaction");
const { createError } = require("../../helpers");

const listTransactionsForMonth = async (req, res) => {
  if (!req.body.year || !req.body.month) {
    throw createError(400);
  }
  const { _id } = req.user;
  const transaction = await Transaction.find({ owner: _id }).populate(
    "owner",
    "name"
  );
  const result = transaction.filter((transaction) => {
    const chosenYear = transaction.date.getYear();
    const chosenMonth = transaction.date.getMonth();
    const isChosenDate =
      chosenYear === Number(req.body.year) - 1900 &&
      chosenMonth === Number(req.body.month) - 1;
    return isChosenDate;
  });
  res.json({
    data: {
      result,
    },
  });
};

module.exports = listTransactionsForMonth;
