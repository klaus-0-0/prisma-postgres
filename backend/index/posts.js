const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.use(express.json());

// Create a new post
router.post('/posts', async (req, res) => {
  const { authorId, title, content } = req.body;

  if (!authorId) {
    return res.status(400).json({ error: 'authorId is required' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        author: {
          connect: { id: authorId }
        }
      },
    });
    res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Retrieve posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true } // Include author information
    });
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

module.exports = router;
