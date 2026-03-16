const storyService = require('../services/storyService');
const { asyncHandler } = require('../utils/asyncHandler');

const listStories = asyncHandler(async (req, res) => {
  res.json(storyService.getAllStories());
});

const getFeatured = asyncHandler(async (req, res) => {
  res.json({ story: storyService.getFeatured() });
});

const listTrending = asyncHandler(async (req, res) => {
  res.json(storyService.getTrending());
});

module.exports = {
  listStories,
  getFeatured,
  listTrending,
};

