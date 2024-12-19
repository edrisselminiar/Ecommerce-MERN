// Import required modules
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Defines routes for registering and logging in users.
router.post('/register', AuthController.register);

// Define route for user login
router.post('/login', AuthController.login);



// Adds a protected route that requires authentication.
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', userId: req.userId });
});

// Export the router to be used in other parts of the application
module.exports = router;
