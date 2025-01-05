const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/landing/laptops', productController.getLandingPageLaptops);
router.get('/landing/desktops', productController.getLandingPageDesktops);
router.get('/landing/peripherals', productController.getLandingPagePeripherals);
router.get('/landing/components', productController.getLandingPageComponents);


//start_Give admin the right to some root users
const verifyAdmin = require('../middleware/verifyAdmin');
// Create new product
router.post('/', productController.createProduct);

// Get all products with optional filters
router.get('/',verifyAdmin, productController.getProducts);

// Search products
router.get('/search',verifyAdmin, productController.searchProducts);

// Get single product
router.get('/:id',verifyAdmin, productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id',verifyAdmin, productController.deleteProduct);
//END_Give admin the right to some root users





const express = require('express');
const multer = require('multer');
const path = require('path');



  // Configure multer for image upload
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products/') // Store in public directory
    },
    filename: function (req, file, cb) {
      cb(null, req.body.fileName) // Use the filename we sent from the frontend
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Image upload route
  router.post('/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      res.status(200).json({ 
        message: 'File uploaded successfully',
        filename: req.file.filename 
      });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading file' });
    }
  });






module.exports = router;
