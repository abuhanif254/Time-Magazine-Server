function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(haystack, needles) {
  return needles.some((n) => haystack.includes(n));
}

module.exports = { normalize, includesAny };

