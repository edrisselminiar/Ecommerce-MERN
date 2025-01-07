const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Helper function for search queries
const buildSearchQuery = (searchTerm) => {
  return {
    $or: [
      { 'specifications.processor': { $regex: searchTerm, $options: 'i' } },
      { 'specifications.ram': { $regex: searchTerm, $options: 'i' } },
      { 'specifications.storage': { $regex: searchTerm, $options: 'i' } },
      { 'specifications.graphicsCard': { $regex: searchTerm, $options: 'i' } },
      { 'specifications.claver': { $regex: searchTerm, $options: 'i' } },
      { Marke: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { type: { $regex: searchTerm, $options: 'i' } }
    ]
  };
};










// Helper function for price filter
const buildPriceFilter = (minPrice, maxPrice) => {
  let priceFilter = {};
  if (minPrice) priceFilter.$gte = Number(minPrice);
  if (maxPrice) priceFilter.$lte = Number(maxPrice);
  return Object.keys(priceFilter).length ? { price: priceFilter } : {};
};

  // // Configure multer for image upload
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'public/images/products/') // Store in public directory
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, req.body.fileName) // Use the filename we sent from the frontend
  //   }
  // });
  
  // const upload = multer({ storage: storage });
  
  // // Image upload route
  // app.post('/upload', upload.single('image'), (req, res) => {
  //   try {
  //     if (!req.file) {
  //       return res.status(400).json({ error: 'No file uploaded' });
  //     }
  //     res.status(200).json({ 
  //       message: 'File uploaded successfully',
  //       filename: req.file.filename 
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Error uploading file' });
  //   }
  // });



  // Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/products/');
  },
  filename: (req, file, cb) => {
    if (!req.body.fileName) {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.originalname.replace(/\s+/g, '_')}`;
      cb(null, fileName);
    } else {
      cb(null, req.body.fileName);
    }
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});





const productController = {


  async uploadImage(req, res) {
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
          message: 'File upload error',
          error: err.message 
        });
      } else if (err) {
        return res.status(400).json({ 
          message: 'Invalid file',
          error: err.message 
        });
      }
      
      if (!req.file) {
        return res.status(400).json({ 
          message: 'No file uploaded'
        });
      }

      res.status(200).json({
        message: 'File uploaded successfully',
        fileName: req.file.filename
      });
    });
  },






  // Create new product
  async createProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ 
        message: 'Error creating product',
        error: error.message 
      });
    }
  },

  // Get all products with optional filters
  async getProducts(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10,
        minPrice,
        maxPrice,
        search,
        sort = 'createdAt'
      } = req.query;

      let query = {};

      // Apply search if provided
      if (search) {
        query = { ...query, ...buildSearchQuery(search) };
      }

      // Apply price filter if provided
      const priceFilter = buildPriceFilter(minPrice, maxPrice);
      if (Object.keys(priceFilter).length) {
        query = { ...query, ...priceFilter };
      }

      const products = await Product.find(query)
        .sort({ [sort]: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Product.countDocuments(query);

      res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalProducts: count
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching products',
        error: error.message 
      });
    }
  },

  // Get single product by ID
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching product',
        error: error.message 
      });
    }
  },

  // Update product
  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ 
        message: 'Error updating product',
        error: error.message 
      });
    }
  },

  // Delete product
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting product',
        error: error.message 
      });
    }
  },

  // Search products
  async searchProducts(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: 'Search query is required' });
      }

      const products = await Product.find(buildSearchQuery(q));
      res.json(products);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error searching products',
        error: error.message 
      });
    }
  },


  async getLandingPageLaptops(req, res) {
    try {
      const products = await Product.find({
        onlyOnLandingPage: true,
        type: "Laptops",
        // hidden: false,
      })
      .limit(11)
      .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching landing page laptops',
        error: error.message
      });
    }
  },

  async getLandingPageDesktops(req, res) {
    try {
      const products = await Product.find({
        onlyOnLandingPage: true,
        type: "Desktops",
        hidden: false,
      })
      .limit(11)
      .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching landing page desktops', 
        error: error.message
      });
    }
  },

  async getLandingPagePeripherals(req, res) {
    try {
      const products = await Product.find({
        onlyOnLandingPage: true,
        type: "Peripherals",
        hidden: false,
      })
      .limit(11)
      .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching landing page peripherals',
        error: error.message
      });
    }
  },

  async getLandingPageComponents(req, res) {
    try {
      const products = await Product.find({
        onlyOnLandingPage: true,
        type: "Components",
        hidden: false,
      })
      .limit(11)
      .sort({ createdAt: -1 });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching landing page components', // Fixed error message
        error: error.message
      });
    }
  }
};

module.exports = productController;