const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./posts'); // Import routes from posts.js

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:3000', // Ensure this matches your frontend URL
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
