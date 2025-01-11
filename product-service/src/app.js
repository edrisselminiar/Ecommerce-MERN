

const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');



const app = express();

// Configures CORS to allow communication with the frontend
app.use(cors({
    origin: 'http://localhost:5173', // URL of the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials
  }));
 

// Middleware to parse JSON bodies
app.use(express.json());


// Database connection
connectDB();


//for images
// se correct path to public folder
const publicPath = path.join(__dirname, '../public');
app.use('/images/products', express.static(path.join(publicPath, 'images/products')));
console.log('Serving images from:', path.join(publicPath, 'images/products'));




// Routes
app.use('/api/products', productRoutes);
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