const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const cors = require('cors'); // Import cors for enabling CORS
const app = express(); // Create Express app
const router = express.Router();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(cors()); // Enable CORS for all routes

// Create a new post
router.post('/posts', async (req, res) => { // Updated route to /posts for clarity
  const { topic, message } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title: topic, content: message, topic: topic, published: true },
    });
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Retrieve all posts
router.get('/posts', async (req, res) => { // Updated route to /posts for clarity
  try {
    const allPosts = await prisma.post.findMany();
    res.json(allPosts);
  } catch (error) {
    console.error('Error retrieving posts:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error during login:', error); // Log the error for debugging
    res.status(500).send('Server error');
  }
});

// Use the router for API routes
app.use('/api', router);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
