const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    data: {
      name,
      email,
    },
  });
};

module.exports = getCurrentUser;
