const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const router = express.Router();
require('dotenv').config();

router.use(express.json());

router.get('/profile', async (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
    const user = await prisma.user.findUnique({ where: { id: decoded.id } }); // Use the user ID from the token

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
 