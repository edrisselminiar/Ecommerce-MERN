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























// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');

// class AuthService {
//   generateToken(userId) {
//     return jwt.sign(
//       { userId },
//       process.env.JWT_SECRET,
//       { 
//         expiresIn: process.env.JWT_EXPIRES_IN || '1h',
//         algorithm: 'HS256'
//       }
//     );
//   }

//   async register(data) {
//     const { username, email, password } = data;

//     // Additional validation
//     if (!username || !email || !password) {
//       throw new Error('All fields are required');
//     }

//     // Check existing user
//     const existingUser = await User.findOne({ 
//       $or: [{ email }, { username }] 
//     });
    
//     if (existingUser) {
//       throw new Error('User with this email or username already exists');
//     }

//     // Create user with default non-admin role
//     const user = new User({ username, email, password });
//     await user.save();

//     const token = this.generateToken(user._id);
//     return { user, token };
//   }

//   async login(email, password) {
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       throw new Error('Invalid credentials');
//     }

//     // Check if account is locked
//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       throw new Error('Account is temporarily locked. Please try again later.');
//     }

//     const isMatch = await user.comparePassword(password);
    
//     if (!isMatch) {
//       await user.incrementLoginAttempts();
//       throw new Error('Invalid credentials');
//     }

//     // Reset login attempts on successful login
//     await user.resetLoginAttempts();

//     const token = this.generateToken(user._id);
//     return { user, token };
//   }

//   // Admin user creation - should only be used internally
//   async createAdmin(data) {
//     const user = await this.register(data);
//     await User.findByIdAndUpdate(user.user._id, { isAdmin: true });
//     return user;
//   }
// }

// module.exports = new AuthService();