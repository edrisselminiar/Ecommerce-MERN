const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


const multer = require('multer');

router.get('/landing/laptops', productController.getLandingPageLaptops);
router.get('/landing/desktops', productController.getLandingPageDesktops);
router.get('/landing/peripherals', productController.getLandingPagePeripherals);
router.get('/landing/components', productController.getLandingPageComponents);


//start_Give admin the right to some root users
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/upload', productController.uploadImage);

// Create new product
router.post('/',verifyAdmin, productController.createProduct);

// Get all products with optional filters
router.get('/',verifyAdmin, productController.getProducts);

// Search products
router.get('/search',verifyAdmin, productController.searchProducts);

// get number of  product
router.get('/count',verifyAdmin, productController.getProductCount);

// Get single product
router.get('/:id',verifyAdmin, productController.getProductById);

// Update product
router.put('/:id',verifyAdmin, productController.updateProduct);

// Delete product
router.delete('/:id',verifyAdmin, productController.deleteProduct);


//END_Give admin the right to some root users






module.exports = router;
