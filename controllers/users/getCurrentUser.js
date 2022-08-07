const getCurrentUser = async (req, res) => {
  const { name, email, balance } = req.user;
  res.json({
    data: {
      name,
      email,
      balance,
    },
  });
};

module.exports = getCurrentUser;
