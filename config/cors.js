const { env } = require('./env');

function corsOptions() {
  if (env.corsOrigin === '*') return { origin: '*' };

  const allowed = env.corsOrigin
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
  };
}

module.exports = { corsOptions };

