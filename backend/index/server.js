const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./auth');
const postRouter = require('./posts');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Import routes
app.use('/api/auth', authRouter);
app.use('/api', postRouter);

const createTables = async () => {
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;
    console.log('Table "User" created or already exists.');

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Post" (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        topic VARCHAR(255) NOT NULL,
        authorId INT REFERENCES "User"(id)
      )
    `;
    console.log('Table "Post" created or already exists.');
  } catch (error) {
    console.error('Error creating tables:', error.message, error.stack);
  }
};

createTables();

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
