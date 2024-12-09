const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log(`Database URL: ${process.env.DATABASE_URL}`);


const postRoutes = require('./posts');

const app = express(); 
const port = process.env.PORT || 8080;

// Middleware 
app.use(cors({
  origin: 'https://frontend-7ghn.onrender.com', // Update with your actual frontend domain
  credentials: true
}));
app.use(express.json());

// Log database URL
console.log(`Database URL: ${process.env.DATABASE_URL}`);

// Routes
app.use('/api/posts', postRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
