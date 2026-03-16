const { categories } = require('../data/content');

function listCategories() {
  return categories;
}

module.exports = { listCategories };

