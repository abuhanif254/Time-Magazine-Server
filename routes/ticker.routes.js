const express = require('express');
const tickerController = require('../controllers/tickerController');

const router = express.Router();

router.get('/', tickerController.getTicker);
router.get('/stream', tickerController.streamTicker);

module.exports = router;

