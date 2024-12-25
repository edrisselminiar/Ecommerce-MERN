const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  description: { type: String, required: true }, // necessary
  type: { type: String, required: true }, // necessary
  onlyOnLandingPage: { type: Boolean, required: true }, // necessary (true or false)
  price: { type: Number, required: true }, // necessary
  images: { type: [String], required: true }, // necessary
  discounts: { type: Boolean, required: true }, // necessary (true or false)
  Marke: { type: String }, // not necessary, can be empty
  garantie: { type: String }, // not necessary, can be empty
  hidden: { type: Boolean, required: true }, // necessary (true or false)
  stock: { type: Number, required: true }, // necessary
  specifications: { // all not necessary, can be empty
    processor: { type: String },
    ram: { type: String },
    storage: { type: String },
    graphicsCard: { type: String },
    display: { type: String },
    claver: { type: String },
    systemeDéxploitation: { type: String },
    boiter: { type: String },
    alimonation: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
