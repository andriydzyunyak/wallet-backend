const { Transaction } = require("../../models/transaction");
const { User } = require("../../models");

const addTransaction = async (req, res) => {
  const { _id } = req.user;

  if (req.body.type === true) {
    const balance = Number(req.body.sum) + Number(req.user.balance);

    await User.findByIdAndUpdate(_id, { balance });

    const result = await Transaction.create({
      ...req.body,
      owner: _id,
      balance,
    });
    res.status(201).json({
      data: {
        result,
      },
    });
    return;
  }

  const balance = Number(req.user.balance) - Number(req.body.sum);

  await User.findByIdAndUpdate(_id, { balance });

  const result = await Transaction.create({ ...req.body, owner: _id, balance });
  res.status(201).json({
    data: {
      result,
    },
  });
};

module.exports = addTransaction;
