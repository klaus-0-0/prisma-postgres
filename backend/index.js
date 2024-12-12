const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://frontend-7ghn.onrender.com', // Allow requests from your deployed frontend domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

console.log(`Database URL: ${process.env.DATABASE_URL}`);

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received register request:', req.body); // Log request payload

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message, error.stack); // Log error details
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', req.body); // Log request payload

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message, error.stack); // Log error details
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Post Route
app.post('/api/posts', async (req, res) => {
  const { userId, title, content, topic } = req.body;
  console.log('Received post creation request:', req.body); // Log request payload

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        topic,
        authorId: userId,
        published: true
      },
    });
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack); // Log error details
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Database Check Route
app.get('/api/db-check', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    console.log('Database connection successful.');
    res.status(200).json({ message: 'Database connection successful', user });
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
