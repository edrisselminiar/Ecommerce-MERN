// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

// Create an Express application
const app = express();

// Configures CORS to allow communication with the frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL of the frontend
  credentials: true // Allow credentials
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connects to the MongoDB database.
connectDB();

// Set up authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
