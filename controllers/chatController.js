const { asyncHandler } = require('../utils/asyncHandler');
const chatService = require('../services/chatService');

const chat = asyncHandler(async (req, res) => {
  const { message } = req.body ?? {};
  const result = chatService.answerFromProject(message);
  res.json(result);
});

module.exports = { chat };

