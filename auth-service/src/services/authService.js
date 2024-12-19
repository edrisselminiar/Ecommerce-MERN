// Defines the schema for the User model.

// Importing required modules
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {

  // Register a new user
  async register(data) {
    const { username, email, password } = data;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user instance
    const user = new User({ username, email, password });
    await user.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return { user, token };
  }

  // Login an existing user
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare provided password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return { user, token };
  }
}

// Exporting an instance of AuthService
module.exports = new AuthService();
