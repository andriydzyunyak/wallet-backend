const { Transaction } = require("../../models/transaction");

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const result = await Transaction.create({ ...req.body, owner: _id });
  res.status(201).json({
    data: {
      result,
    },
  });
};

module.exports = addTransaction;
