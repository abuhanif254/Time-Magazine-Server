const { stories } = require('../data/content');

function listStories() {
  return stories;
}

function getFeaturedStory() {
  return stories.find((s) => s.featured) ?? null;
}

function listTrendingStories() {
  return stories
    .filter((s) => typeof s.trendingRank === 'number')
    .slice()
    .sort((a, b) => (a.trendingRank ?? 999) - (b.trendingRank ?? 999));
}

module.exports = {
  listStories,
  getFeaturedStory,
  listTrendingStories,
};

