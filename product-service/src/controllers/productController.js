const Product = require('../models/Product');

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

const productController = {
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
  }
};

module.exports = productController;