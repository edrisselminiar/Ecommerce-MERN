const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configures CORS to allow communication with the frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL of the frontend
  credentials: true // Allow credentials
}));



// Middleware
app.use(express.json());

// Connects to the MongoDB database.
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.AUTH_ADMIN_MONGODB_PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});













// const express = require('express');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const cors = require('cors');
// const authRoutes = require('./routes/auth.routes');
// const connectDB = require('./config/database');


// const app = express();

// // Security middleware
// app.use(helmet());

// // app.use(express.json({ limit: '10kb' }));
// app.use(express.json());


// // Configures CORS to allow communication with the frontend
// app.use(cors({
//   origin: 'http://localhost:5173', // URL of the frontend
//   credentials: true // Allow credentials
// }));

// // Database connection
// connectDB();

// // Rate limiting
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 100 // limit each IP to 100 requests per windowMs
// // });
// // app.use('/api', limiter);

// // Routes
// app.use('/api/auth', authRoutes);

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });




// // Start the server
// const AUTH_ADMIN_MONGODB_PORT = process.env.AUTH_ADMIN_MONGODB_PORT || 3002;
// app.listen(AUTH_ADMIN_MONGODB_PORT, () => {
//   console.log(`Server running on port ${AUTH_ADMIN_MONGODB_PORT}`);
// });
