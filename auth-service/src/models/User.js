// Import mongoose and bcrypt modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with fields and validation rules
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt fields

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // If password is not modified, proceed to the next middleware
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
  next(); // Proceed to save the document
});

// Method to compare provided password with the stored hashed password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password); // Compare and return true or false
};

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
