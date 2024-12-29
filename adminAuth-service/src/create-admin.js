const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Replace with your MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://driss0:driss0@cluster0.lntgn.mongodb.net/"

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        
        // First, delete any existing admin
        await Admin.deleteMany({});

        // Create plain password
        const plainPassword = "Admin123!@#";
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        
        // Create new admin
        const admin = new Admin({
            email: "admin@example.com",
            password: hashedPassword,
            isAdmin: true
        });
        
        await admin.save();
        
        console.log('Admin created successfully');
        console.log('Email:', admin.email);
        console.log('Password (plain):', plainPassword);
        console.log('Password (hashed):', hashedPassword);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();