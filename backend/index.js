const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://frontend-7ghn.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

client.connect().catch(err => {
  console.error('Connection error:', err.stack);
});

// Create "User" table if it doesn't exist
const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );
`;

// Create "Post" table if it doesn't exist
const createPostTableQuery = `
  CREATE TABLE IF NOT EXISTS "Post" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    authorId INT REFERENCES "User"(id)
  );
`;

// Execute table creation queries
client.query(createUserTableQuery).then(() => {
  console.log('Table "User" created or already exists.');
}).catch(err => {
  console.error('Error creating User table:', err.message, err.stack);
});

client.query(createPostTableQuery).then(() => {
  console.log('Table "Post" created or already exists.');
}).catch(err => {
  console.error('Error creating Post table:', err.message, err.stack);
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await client.query(`SELECT * FROM "User" WHERE email = '${email}'`);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(`INSERT INTO "User" (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.query(`SELECT * FROM "User" WHERE email = '${email}'`);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Post Route
app.post('/api/posts', async (req, res) => {
  const { title, content, topic, authorId } = req.body;
  console.log('Received post request body:', req.body); // Log the request body

  if (!title || !content || !topic || !authorId) {
    console.error('Missing required fields:', { title, content, topic, authorId });
    return res.status(400).json({ message: 'Title, content, topic, and authorId are required' });
  }

  try {
    console.log('Inserting post:', { title, content, topic, authorId });
    const queryString = `INSERT INTO "Post" (title, content, topic, authorId) VALUES ('${title}', '${content}', '${topic}', ${authorId})`;
    await client.query(queryString);
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Retrieve All Posts Route
app.get('/api/posts', async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM "Post"`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Database Check Route
app.get('/api/db-check', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "User" LIMIT 1');
    res.status(200).json({ message: 'Database connection successful', user: result.rows[0] });
  } catch (error) {
    console.error('Database connection error:', error.message, error.stack);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Handle preflight requests for all routes
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
