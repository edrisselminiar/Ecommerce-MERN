//Uses AuthService to register and log in users.
// Sends appropriate responses based on success or failure
const AuthService = require('../services/authService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');



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



  async updateUser(req, res) {
    try {
      const { fullname, email, password } = req.body;
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
  
      // Prepare update object
      const updateFields = {
        fullname: fullname || user.fullname,
        email: email || user.email
      };
  
      // If password is provided, hash it before updating
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
      }
  
      // Update user with new fields
      user = await User.findByIdAndUpdate(
        userId,
        {
          $set: updateFields
        },
        {
          new: true, // Return updated user
          runValidators: true, // Run schema validators
          select: '-password' // Exclude password from response
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


  async searchUsers(req, res) {
    try {
      const { query } = req.query; // Get the search query from request parameters
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }
  
      // Create a regex search pattern that's case-insensitive
      const searchPattern = new RegExp(query, 'i');
  
      // Search in both fullname and email fields
      const users = await User.find({
        $or: [
          { fullname: searchPattern },
          { email: searchPattern }
        ]
      })
      .select('-password') // Exclude password from results
      .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: users.length,
        users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error searching users'
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
  

  //get number of usesr
  async getUserCount(req, res) {
    try {
      const count = await User.countDocuments();
      
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error retrieving user count'
      });
    }
  }

}

// Export
module.exports = new AuthController();
