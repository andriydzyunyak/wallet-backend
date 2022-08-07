const { Transaction } = require("../../models/transaction");

const transactionsDetails = async (req, res) => {
  const { _id } = req.user;

  if (req.body.month) {
    const chosenMonth = new Date(
      Number(req.body.year),
      Number(req.body.month) - 1
    );
    const afterChosenMonth = new Date(
      Number(req.body.year),
      Number(req.body.month)
    );

    const result = await Transaction.aggregate([
      {
        $match: {
          owner: Object(_id),
          date: {
            $gte: chosenMonth,
            $lt: afterChosenMonth,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalSum: { $sum: "$sum" },
        },
      },
      {
        $project: {
          category: "$_id",
          totalSum: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      data: {
        result,
      },
    });
    return;
  }

  const chosenYear = new Date(Number(req.body.year), 0);
  const afterChosenYear = new Date(Number(req.body.year) + 1, 0);

  const result = await Transaction.aggregate([
    {
      $match: {
        owner: Object(_id),
        date: {
          $gte: chosenYear,
          $lt: afterChosenYear,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalSum: { $sum: "$sum" },
      },
    },
    {
      $project: {
        category: "$_id",
        totalSum: 1,
        _id: 0,
      },
    },
  ]);

  res.json({
    data: {
      result,
    },
  });
};

module.exports = transactionsDetails;
