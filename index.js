const { createApp } = require('./config/app');
const { env } = require('./config/env');

const app = createApp();

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${env.port}`);
});
