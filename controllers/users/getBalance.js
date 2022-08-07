const getBalance = async (req, res) => {
  const { balance } = req.user;
  res.json({
    data: {
      balance,
    },
  });
};

module.exports = getBalance;
