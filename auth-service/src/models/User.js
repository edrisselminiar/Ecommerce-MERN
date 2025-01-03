
// Import mongoose and bcrypt modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with fields and validation rules
const userSchema = new mongoose.Schema({

  // update shima ___________
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function(v) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
          },
          message: 'Please enter a valid email address'
        }
      },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: {
  //     validator: function(v) {
  //       return v && v.length > 6;
  //     },
  //     message: 'Email cannot be empty'
  //   }

  // },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
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
