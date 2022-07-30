const { Schema, model } = require("mongoose");

const Joi = require("joi");

const transactionsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Boolean,
      default: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: String,
    },
    date: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

// const Transaction = model("transaction", transactionsSchema);

// const transactionAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required(),
//   phone: Joi.number().required(),
//   favorite: Joi.bool(),
// });

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.bool().required(),
// });

// const schemas = {
//   contactsAddSchema,
//   updateFavoriteSchema,
// };

// module.exports = {
//   Contact,
//   schemas,
// };
