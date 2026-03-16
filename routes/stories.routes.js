const express = require('express');
const storyController = require('../controllers/storyController');

const router = express.Router();

router.get('/', storyController.listStories);
router.get('/featured', storyController.getFeatured);
router.get('/trending', storyController.listTrending);

module.exports = router;

