const { Schema, model } = require("mongoose");
const Joi = require("joi");

const validateEmail = function (email) {
  const re =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,30}[0-9A-Za-z]?))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/; //eslint-disable-line
  return re.test(email);
};

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,30}[0-9A-Za-z]?))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/, //eslint-disable-line
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      match: [
        /^[a-zа-яA-ZА-Я0-9-]+$/,
        "Name must contain only letters or numbers.",
      ],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const userRegisterSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      allowFullyQualified: true,
    })
    .min(10)
    .max(63)
    .required(),
  password: Joi.string().min(6).max(12).required(),
  name: Joi.string()
    .pattern(/^[a-zа-яA-ZА-Я0-9-]+$/)
    .min(1)
    .max(12)
    .required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userRegisterSchema,
  userLoginSchema,
};
