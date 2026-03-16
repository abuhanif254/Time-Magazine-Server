const categoryModel = require('../models/categoryModel');

function getAllCategories() {
  return categoryModel.listCategories();
}

module.exports = { getAllCategories };

