const storyService = require('./storyService');

function buildTickerItems() {
  const stories = storyService.getAllStories();
  return stories
    .filter((s) => !s.featured)
    .slice(0, 10)
    .map((s) => ({
      id: s.id,
      label: s.trendingRank ? `#${s.trendingRank} Trending` : s.category,
      title: s.title,
      ts: Date.now(),
    }));
}

function rotate(items, step) {
  if (items.length === 0) return items;
  const k = ((step % items.length) + items.length) % items.length;
  return [...items.slice(k), ...items.slice(0, k)];
}

module.exports = { buildTickerItems, rotate };

