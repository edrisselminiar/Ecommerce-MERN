// Import required modules
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

//start_Give admin the right to some root users
const verifyAdmin = require('../middleware/verifyAdmin');
router.get('/users', AuthController.getAllUsers);
router.get('/users/:id', AuthController.getUser);
router.put('/users/:id', AuthController.updateUser);
router.delete('/users/:id', AuthController.deleteUser);
// router.get('/search', AuthController.searchUser);
router.get('/users/search', AuthController.searchUsers);


//END_Give admin the right to some root users



// Defines routes for registering and logging in users.
router.post('/register', AuthController.register);

// Define route for user login
router.post('/login', AuthController.login);





// Adds a protected route that requires authentication.
// router.get('/protected', authMiddleware, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully', userId: req.userId });
// });

// Export the router to be used in other parts of the application
module.exports = router;
