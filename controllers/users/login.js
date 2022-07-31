const { createError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = await bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw createError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  const { name } = user;
  res.json({
    data: {
      token,
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = login;
