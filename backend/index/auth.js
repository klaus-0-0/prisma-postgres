const express = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
require('dotenv').config();

router.use(express.json());

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

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
    console.error('Error registering user:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log('User logged in:', email);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user details by email
router.get('/user', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
