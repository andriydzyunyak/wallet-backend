const { Transaction } = require("../../models/transaction");

const transactionsDetails = async (req, res) => {
  const { _id } = req.user;
  const transactions = await Transaction.find({ owner: _id }).populate(
    "owner",
    "name"
  );

  if (!req.body.month) {
    const result = transactions.filter((transaction) => {
      const isChosenYear =
        transaction.date.getYear() === Number(req.body.year) - 1900;
      return isChosenYear;
    });

    res.json({
      data: {
        result,
      },
    });
  }

  const result = transactions.filter((transaction) => {
    const isChosenYear =
      transaction.date.getYear() === Number(req.body.year) - 1900;
    const isChosenMonth =
      transaction.date.getMonth() === Number(req.body.month) - 1;
    return isChosenYear && isChosenMonth;
  });
  res.json({
    data: {
      result,
    },
  });
};

module.exports = transactionsDetails;
