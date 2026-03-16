const { normalize, includesAny } = require('../utils/text');
const storyService = require('./storyService');
const categoryService = require('./categoryService');

function buildHelp() {
  return {
    answer:
      'I can answer questions using this project’s content. Try: "featured story", "trending", "categories", or "technology stories".',
    sources: [],
  };
}

function toSourceFromStory(story) {
  return {
    type: 'story',
    id: story.id,
    title: story.title,
    category: story.category,
  };
}

function answerFromProject(question) {
  const q = normalize(question);
  if (!q) return buildHelp();

  const categories = categoryService.getAllCategories();
  const stories = storyService.getAllStories();

  if (includesAny(q, ['help', 'what can you do', 'commands', 'options'])) {
    return buildHelp();
  }

  if (includesAny(q, ['category', 'categories', 'sections'])) {
    return {
      answer: `Categories: ${categories.map((c) => c.label).join(', ')}`,
      sources: categories.map((c) => ({ type: 'category', label: c.label })),
    };
  }

  if (includesAny(q, ['featured', 'editor', 'editors', 'pick'])) {
    const featured = storyService.getFeatured();
    if (!featured) return { answer: 'No featured story found.', sources: [] };
    return {
      answer: `${featured.title}\n\n${featured.dek}\n\n${featured.author} · ${featured.minutes} min read · ${featured.publishedLabel}`,
      sources: [toSourceFromStory(featured)],
    };
  }

  if (includesAny(q, ['trending', 'top', 'popular'])) {
    const trending = storyService.getTrending();
    if (trending.length === 0) return { answer: 'No trending stories found.', sources: [] };
    return {
      answer: `Trending:\n${trending
        .slice(0, 5)
        .map((s) => `${s.trendingRank}. ${s.title} (${s.category})`)
        .join('\n')}`,
      sources: trending.slice(0, 5).map(toSourceFromStory),
    };
  }

  const categoryMatch = categories.find((c) => q.includes(normalize(c.label)));
  if (categoryMatch) {
    const inCategory = stories.filter(
      (s) => normalize(s.category) === normalize(categoryMatch.label),
    );
    if (inCategory.length === 0) {
      return { answer: `No stories found for ${categoryMatch.label}.`, sources: [] };
    }
    return {
      answer: `${categoryMatch.label} stories:\n${inCategory
        .slice(0, 6)
        .map((s) => `- ${s.title}`)
        .join('\n')}`,
      sources: inCategory.slice(0, 6).map(toSourceFromStory),
    };
  }

  const tokens = q.split(' ').filter((t) => t.length >= 3);
  const scored = stories
    .map((s) => {
      const text = normalize(`${s.title} ${s.dek} ${s.author} ${s.category}`);
      const score = tokens.reduce((acc, t) => (text.includes(t) ? acc + 1 : acc), 0);
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    const top = scored.slice(0, 5).map((x) => x.s);
    return {
      answer: `I found these stories:\n${top.map((s) => `- ${s.title} (${s.category})`).join('\n')}`,
      sources: top.map(toSourceFromStory),
    };
  }

  return {
    answer:
      "I couldn't find that in this project’s content yet. Try asking about: featured, trending, categories, or a topic like politics/technology/health.",
    sources: [],
  };
}

module.exports = { answerFromProject };

