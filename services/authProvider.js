const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { HttpError } = require('../utils/httpError');

// Demo-only auth provider:
// - accepts any email/password (or fixed demo credentials)
// - returns a JWT
function login({ email, password }) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = {
    id: 'demo-user',
    email,
    name: 'Demo User',
  };

  const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, {
    expiresIn: '1h',
  });

  return { user, token };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch {
    throw new HttpError(401, 'Invalid token');
  }
}

module.exports = { login, verifyToken };

