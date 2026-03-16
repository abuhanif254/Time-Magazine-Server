const { verifyToken } = require('../services/authProvider');
const { HttpError } = require('../utils/httpError');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = typeof header === 'string' ? header.split(' ')[1] : undefined;
  if (!token) return next(new HttpError(401, 'Missing Authorization token'));

  const payload = verifyToken(token);
  req.user = payload;
  return next();
}

module.exports = { requireAuth };

