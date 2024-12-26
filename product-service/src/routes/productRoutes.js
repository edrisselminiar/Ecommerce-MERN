const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/landing/laptops', productController.getLandingPageLaptops);
router.get('/landing/desktops', productController.getLandingPageDesktops);
router.get('/landing/peripherals', productController.getLandingPagePeripherals);
router.get('/landing/components', productController.getLandingPageComponents);

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
