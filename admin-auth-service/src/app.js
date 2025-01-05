const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
// const adminAuth = require('../middleware/adminAuth');


const app = express();

// Configures CORS to allow communication with the frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL of the frontend
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
 
}));




// Middleware
app.use(express.json());

// Connects to the MongoDB database.
connectDB();

// Routes
app.use('/api/admin', authRoutes);//admin/auth

// Start the server
const PORT = process.env.AUTH_ADMIN_MONGODB_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




