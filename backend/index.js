const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./posts'); // Import routes from posts.js

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://frontend-7ghn.onrender.com', // Allow requests from your deployed frontend domain
  credentials: true
}));
app.use(express.json());

console.log(`Database URL: ${process.env.DATABASE_URL}`);

app.use('/api', postRoutes); // Use the router for all API routes

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
