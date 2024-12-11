const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new post
router.post('/posts', async (req, res) => {
  const { topic, message } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title: topic, content: message, topic: topic, published: true },
    });
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack); // Enhanced logging
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Retrieve all posts
router.get('/posts', async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.json(allPosts);
  } catch (error) {
    console.error('Error retrieving posts:', error.message, error.stack); // Enhanced logging
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log('User already exists:', email);
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

    console.log('New user registered:', email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message, error.stack); // Enhanced logging
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log('User logged in:', email);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message, error.stack); // Enhanced logging
    res.status(500).json({ message: 'Server error' });
  }
});

// Database Check Route
router.get('/db-check', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    console.log('Database connection successful.');
    res.status(200).json({ message: 'Database connection successful', user });
  } catch (error) {
    console.error('Database connection error:', error.message, error.stack);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

module.exports = router;
