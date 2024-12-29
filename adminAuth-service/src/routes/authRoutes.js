const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Protected admin route example
router.get('/admin-only', adminAuth, (req, res) => {
    res.json({ message: 'Welcome admin!', adminData: req.admin });
});

module.exports = router;
