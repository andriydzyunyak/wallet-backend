const { Transaction } = require("../../models/transaction");
const { createError } = require("../../helpers");

const listTransactionsForYear = async (req, res) => {
  if (!req.body.year) {
    throw createError(400);
  }
  const { _id } = req.user;
  const transaction = await Transaction.find({ owner: _id }).populate(
    "owner",
    "name"
  );
  const result = transaction.filter((transaction) => {
    const chosenYear = transaction.date.getYear();
    const isChosenDate = chosenYear === Number(req.body.year) - 1900;

    return isChosenDate;
  });
  res.json({
    data: {
      result,
    },
  });
};

module.exports = listTransactionsForYear;
