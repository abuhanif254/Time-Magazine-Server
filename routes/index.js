const express = require('express');

const storiesRoutes = require('./stories.routes');
const categoriesRoutes = require('./categories.routes');
const authRoutes = require('./auth.routes');
const chatRoutes = require('./chat.routes');
const tickerRoutes = require('./ticker.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/stories', storiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/ticker', tickerRoutes);

module.exports = router;

