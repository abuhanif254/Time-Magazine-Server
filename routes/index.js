const express = require('express');

const storiesRoutes = require('./stories.routes');
const categoriesRoutes = require('./categories.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/stories', storiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/auth', authRoutes);

module.exports = router;

