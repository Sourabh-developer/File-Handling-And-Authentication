require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'secure_key_placeholder';

// Create data directory if not exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize users file
const USERS_FILE = path.join(__dirname, 'users.json');
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

app.use(bodyParser.json());
app.use(cors());

// Helper functions
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
const getUserFile = (username) => path.join(dataDir, `user_${username}.json`);

// User Registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  const users = readUsers();
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  
  users.push({ username, password });
  writeUsers(users);
  
  // Create user data file
  fs.writeFileSync(getUserFile(username), JSON.stringify({ 
    user: username, 
    createdAt: new Date().toISOString(),
    data: []
  }, null, 2));
  
  res.status(201).json({ message: 'User created successfully' });
});

// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, username });
});

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization header required' });
  }
};

// Save JSON data (Protected)
app.post('/save', authenticateJWT, (req, res) => {
  const { data } = req.body;
  const username = req.user.username;
  
  if (!data) {
    return res.status(400).json({ error: 'Data payload required' });
  }
  
  const userFile = getUserFile(username);
  try {
    const userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
    userData.data.push({
      timestamp: new Date().toISOString(),
      content: data
    });
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Read JSON data (Protected)
app.get('/read', authenticateJWT, (req, res) => {
  const username = req.user.username;
  const userFile = getUserFile(username);
  
  try {
    const userData = JSON.parse(fs.readFileSync(userFile, 'utf8'));
    res.json(userData.data);
  } catch (err) {
    res.status(404).json({ error: 'No data found for user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Data directory: ${dataDir}`);
});