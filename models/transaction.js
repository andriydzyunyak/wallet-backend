const { Schema, model } = require("mongoose");

const Joi = require("joi");

const transactionsSchema = Schema(
  {
    category: {
      type: String,
      required: false,
    },
    type: {
      type: Boolean,
      required: true,
      default: false,
    },
    sum: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const transactionAddSchema = Joi.object({
  type: Joi.bool().required(false),
  category: Joi.string(),
  sum: Joi.number().precision(2).required(),
  date: Joi.date().default(Date.now).max("now").required(),
  comment: Joi.string(),
});

const transactionsDetailsSchema = Joi.object({
  year: Joi.string().required(),
  month: Joi.string(),
});

const Transaction = model("transaction", transactionsSchema);

module.exports = {
  Transaction,
  transactionAddSchema,
  transactionsDetailsSchema,
};
