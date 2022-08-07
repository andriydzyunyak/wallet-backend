const { Transaction } = require("../../models/transaction");

const listTransactions = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Transaction.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  })
    .sort({ date: -1 })
    .populate("owner", "name");
  res.json({
    data: {
      result,
    },
  });
};

module.exports = listTransactions;
