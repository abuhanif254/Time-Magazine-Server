const { asyncHandler } = require('../utils/asyncHandler');
const authProvider = require('../services/authProvider');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};
  res.json(authProvider.login({ email, password }));
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

module.exports = { login, me };

