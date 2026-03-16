const storyModel = require('../models/storyModel');

function getAllStories() {
  return storyModel.listStories();
}

function getFeatured() {
  return storyModel.getFeaturedStory();
}

function getTrending() {
  return storyModel.listTrendingStories();
}

module.exports = {
  getAllStories,
  getFeatured,
  getTrending,
};

