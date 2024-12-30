//Uses AuthService to register and log in users.
// Sends appropriate responses based on success or failure
const AuthService = require('../services/authService');
const User = require('../models/User');


class AuthController {
  async register(req, res) {
    try {
      const { user, token } = await AuthService.register(req.body);
      // Send successful response with user and token
      res.status(201).json({ user, token });
    } catch (error) {
      // Send error response if registration fails
      res.status(400).json({ error: error.message });
    }
  }

  // Method to handle user login
  async login(req, res) {
    try {
      const { email, password } = req.body; 
      // Call login method from AuthService and get user and token
      const { user, token } = await AuthService.login(email, password);
      // Send successful response with user and token
      res.json({ user, token });
    } catch (error) {
      // Send error response if login fails
      res.status(401).json({ error: error.message });
    }
  }

  // New method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        //.select('-password') // Exclude password from results
        .sort({ createdAt: -1 }); // Sort by newest first

      res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error retrieving users'
      });
    }
  }

  // New method to update user
  async updateUser(req, res) {
    try {
      const { username, email } = req.body;
      const userId = req.params.id;

      // Check if user exists
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check if email is already in use by another user
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({
            success: false,
            error: 'Email already in use'
          });
        }
      }

      // Update user
      user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: username || user.username,
            email: email || user.email
          }
        },
        {
          new: true, // Return updated user
          runValidators: true, // Run schema validators
          select: '-password' // Exclude password
        }
      );

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message || 'Error updating user'
      });
    }
  }

  // New method to delete user
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      await User.findByIdAndDelete(userId);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error deleting user'
      });
    }
  }

  // New method to get single user
  async getUser(req, res) {
    try {
      const userId = req.params.id;
      
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error retrieving user'
      });
    }
  }

  

}

// Export
module.exports = new AuthController();
