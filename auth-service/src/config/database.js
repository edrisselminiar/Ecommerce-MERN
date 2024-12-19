



// Connects to MongoDB using the URI from the environment variables.
const mongoose = require('mongoose');

// Function Logs success or error messages.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully'); // Log success message
  } catch (error) {// Log any connection errors
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// // Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
