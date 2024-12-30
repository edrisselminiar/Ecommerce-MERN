const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
    try {
        // Support both Bearer token and x-auth-token header
        const token = req.header('Authorization')?.replace('Bearer ', '') || 
                     req.header('x-auth-token');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ _id: decoded._id });

        if (!admin || !admin.isAdmin) {
            return res.status(403).json({ error: 'Not authorized as admin' });
        }

        req.token = token;
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate as admin' });
    }
};

module.exports = adminAuth;













// const jwt = require('jsonwebtoken');
// const config = require('../config/database');
// const Admin = require('../models/Admin');

// const adminAuth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
        
//         if (!token) {
//             throw new Error();
//         }
//         //const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);//process.env.JWT_SECRET
//         const admin = await Admin.findOne({ _id: decoded._id });

//         if (!admin || !admin.isAdmin) {
//             throw new Error();
//         }

//         req.token = token;
//         req.admin = admin;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Please authenticate as admin' });
//     }
// };

// module.exports = adminAuth;
