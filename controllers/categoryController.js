const categoryService = require('../services/categoryService');
const { asyncHandler } = require('../utils/asyncHandler');

const listCategories = asyncHandler(async (req, res) => {
  res.json(categoryService.getAllCategories());
});

module.exports = { listCategories };

