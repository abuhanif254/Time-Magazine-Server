const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin initialization
const serviceAccount = require('./config/firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Example public route
app.get('/api/articles', (req, res) => {
  res.json([
    { id: 1, title: 'Politics Today', category: 'Politics', summary: 'Latest news in politics.' },
    { id: 2, title: 'Science Breakthroughs', category: 'Science', summary: 'New discoveries in science.' },
    { id: 3, title: 'Culture Trends', category: 'Culture', summary: 'What’s trending in culture.' },
  ]);
});

// Example protected route
app.get('/api/profile', authenticateJWT, (req, res) => {
  res.json({ user: req.user });
});

// Firebase authentication endpoint
app.post('/api/login', async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const token = jwt.sign({ uid: decodedToken.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Firebase authentication failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
