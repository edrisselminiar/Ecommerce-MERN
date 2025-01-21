// Import required modules
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

//start_Give admin the right to some root users
const verifyAdmin = require('../middleware/verifyAdmin');
router.get('/users',verifyAdmin, AuthController.getAllUsers);
router.get('/users/count', AuthController.getUserCount);
// router.get('/users/:id', AuthController.getUser);     //dont used
router.put('/users/:id',verifyAdmin, AuthController.updateUser);
router.delete('/users/:id',verifyAdmin, AuthController.deleteUser);
// router.get('/users/search', AuthController.searchUsers);    //dont used


//END_Give admin the right to some root users



// Defines routes for registering and logging in users.
router.post('/register', AuthController.register);

// Define route for user login
router.post('/login', AuthController.login);





module.exports = router;
