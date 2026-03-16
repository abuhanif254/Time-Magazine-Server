const { asyncHandler } = require('../utils/asyncHandler');
const tickerService = require('../services/tickerService');

const getTicker = asyncHandler(async (req, res) => {
  res.json({ items: tickerService.buildTickerItems() });
});

const streamTicker = asyncHandler(async (req, res) => {
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  // Helps behind some proxies
  res.flushHeaders?.();

  let step = 0;
  let closed = false;

  const send = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // initial payload
  send('ticker', { items: tickerService.buildTickerItems() });

  const intervalMs = 5000;
  const timer = setInterval(() => {
    if (closed) return;
    const items = tickerService.rotate(tickerService.buildTickerItems(), step++);
    send('ticker', { items });
  }, intervalMs);

  req.on('close', () => {
    closed = true;
    clearInterval(timer);
  });
});

module.exports = { getTicker, streamTicker };

