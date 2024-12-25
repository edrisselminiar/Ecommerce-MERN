const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create new product
router.post('/', productController.createProduct);

// Get all products with optional filters
router.get('/', productController.getProducts);

// Search products
router.get('/search', productController.searchProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
