const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from the root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const connectDB = async () => {
  try {
    if (!process.env.AUTH_MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const connection = await mongoose.connect(process.env.AUTH_MONGODB_URI);
    //  {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;




