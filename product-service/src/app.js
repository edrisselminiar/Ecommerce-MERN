

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');



const app = express();

// Configures CORS to allow communication with the frontend
app.use(cors({
    origin: 'http://localhost:5173', // URL of the frontend
    credentials: true // Allow credentials
  }));

// Middleware to parse JSON bodies
app.use(express.json());


// Database connection
connectDB();



// Routes
app.use('/api/products', productRoutes);

// In your Express app setup
// app.use('/images/products', express.static('public/images/products'));
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
// Error handling
// app.use(errorHandler);

// Start the server
const PORT = process.env.PRODUCT_SERVICE_PORT || 3001;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Product service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();