// Import jwt module for token handling
const jwt = require('jsonwebtoken');


// Middleware to authenticate user based on JWT
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    // If no token is provided, return an authentication error
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify the token and decode it to extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach user ID to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails, return an invalid token error
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Export the authentication middleware to be used in other parts of the application
module.exports = authMiddleware;
