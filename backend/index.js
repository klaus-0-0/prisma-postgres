const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://frontend-7ghn.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect().catch(err => {
  console.error('Connection error:', err.stack);
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received register request:', req.body);

  try {
    const result = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(
      'INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', req.body);

  try {
    const result = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Post Route
app.post('/api/posts', async (req, res) => {
  const { userId, title, content, topic } = req.body;
  console.log('Received post creation request:', req.body);

  try {
    await client.query(
      'INSERT INTO "Post" (title, content, topic, authorId, published, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())',
      [title, content, topic, userId, true]
    );
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Database Check Route
app.get('/api/db-check', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "User" LIMIT 1');
    res.status(200).json({ message: 'Database connection successful', user: result.rows[0] });
  } catch (error) {
    console.error('Database connection error:', error.message, error.stack);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Handle preflight requests for all routes
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

app.get('/api/posts', (req, res) => {
  const topic = req.query.topic;
  // Fetch posts from database with topic filter
  const posts = [
    { id: 1, title: 'Tech Post 1', content: 'Content of tech post 1', topic: 'technology' },
    { id: 2, title: 'Sports Post 1', content: 'Content of sports post 1', topic: 'sports' },
    { id: 3, title: 'Culture Post 1', content: 'Content of culture post 1', topic: 'culture' },
    { id: 4, title: 'Entertainment Post 1', content: 'Content of entertainment post 1', topic: 'entertainment' }
  ];
  const filteredPosts = topic ? posts.filter(post => post.topic === topic) : posts;
  res.json(filteredPosts);
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
