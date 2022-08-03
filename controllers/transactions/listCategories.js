const categories = require("../../models/categories");

const listCategories = async (req, res) => {
  const result = await categories.listCategories();

  res.json(result);
};

module.exports = listCategories;
