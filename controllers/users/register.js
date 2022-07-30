const { createError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const verificationToken = uuidv4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    name,
    verificationToken,
  });

  res.status(201).json({
    data: {
      user: {
        email,
        name,
        verificationToken,
      },
    },
  });
};

module.exports = register;
