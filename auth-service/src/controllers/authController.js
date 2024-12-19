//Uses AuthService to register and log in users.
// Sends appropriate responses based on success or failure
const AuthService = require('../services/authService');

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
}

// Export
module.exports = new AuthController();
