const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./posts');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({ 
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
