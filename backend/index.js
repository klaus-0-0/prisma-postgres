const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const postRoutes = require('./posts');

// Use CORS middleware
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

// Define route for posts
app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 