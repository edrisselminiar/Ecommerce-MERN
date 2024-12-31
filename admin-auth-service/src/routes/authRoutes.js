const express = require('express');
const jwt = require('jsonwebtoken');
const proxy = require('express-http-proxy');
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


//--> START_Give admin the right to some root users(get_put_delet)_if want to use url3002
// // Proxy configuration
// const proxyConfig = {
//     proxyReqPathResolver: (req) => {
//         // Forward to the correct path in auth-service
//         return `/api/auth${req.url}`;
//     },
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//         // Forward the admin token
//         if (srcReq.token) {
//             proxyReqOpts.headers['x-auth-token'] = srcReq.token;
//         }
//         return proxyReqOpts;
//     }
// };

// // Proxy routes to auth-service
// router.get('/users', adminAuth, proxy('http://localhost:3000', proxyConfig));
// router.get('/users/:id', adminAuth, proxy('http://localhost:3000', proxyConfig));
// router.put('/users/:id', adminAuth, proxy('http://localhost:3000', proxyConfig));
// router.delete('/users/:id', adminAuth, proxy('http://localhost:3000', proxyConfig));
//--> END_Give admin the right to some root users(get_put_delet)_if want to use url3002

//start_Give admin the right to some root users(get_put_delet)_if want to use url3000
//thid rout use in MECROSERVICE auth-service (middlwire/verifyAdmin.js)
router.get('/verify', adminAuth, (req, res) => {
  if (req.admin && req.admin.isAdmin) {
      res.json({
          isAdmin: true,
          adminId: req.admin._id,
          email: req.admin.email
      });
  } else {
      res.status(403).json({ 
          isAdmin: false,
          error: 'Not authorized as admin' 
      });
  }
});
//start_Give admin the right to some root users(get_put_delet)_if want to use url3000



module.exports = router;






