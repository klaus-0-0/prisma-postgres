const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./posts'); // Import routes from posts.js
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

app.use('/api', postRoutes); // Use the router for all API routes

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

app.options('/api/register', (req, res) => { // Handle preflight requests for /api/register
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
