const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const postRoutes = require('./posts'); // Import the router

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Use the post routes
app.use('/api/posts', postRoutes); // Prefix API routes with /api/posts

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
