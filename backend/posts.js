const { PrismaClient } = require('@prisma/client/edge');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.json(allPosts);
  } catch (error) {
    console.error('Error retrieving posts:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

module.exports = router;
