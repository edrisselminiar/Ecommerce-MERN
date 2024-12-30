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










// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const adminAuth = require('../middleware/adminAuth');
// //START_this for comminication with  2 mecroservice adminAuth-service and auth-service
// const proxy = require('express-http-proxy');
// //END_this for comminication with  2 mecroservice adminAuth-service and auth-service


// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const admin = await Admin.findOne({ email });

//         if (!admin || !(await admin.comparePassword(password))) {
//             return res.status(401).json({ error: 'Invalid login credentials' });
//         }

//         const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
//             expiresIn: '24h'
//         });

//         res.json({ token });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Protected admin route example
// router.get('/admin-only', adminAuth, (req, res) => {
//     res.json({ message: 'Welcome admin!', adminData: req.admin });
// });




// //start_this for comminication with  2 mecroservice adminAuth-service and auth-service

// // Auth service URL
// const AUTH_SERVICE_URL = 'http://localhost:3000';

// // Proxy middleware configuration
// const proxyOptions = {
//   proxyReqPathResolver: (req) => {
//     // Remove /admin from the path when forwarding
//     return req.url.replace('/admin', '');
//   },
//   proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
//     // Forward the admin token to the auth service
//     proxyReqOpts.headers['x-auth-token'] = srcReq.header('x-auth-token');
//     return proxyReqOpts;
//   }
// };

// // Route all admin auth requests through the middleware and proxy
// // router.get('/auth/users', adminAuth, proxy(AUTH_SERVICE_URL, proxyOptions));
// router.get('/auth/users', adminAuth, proxy(AUTH_SERVICE_URL));//process.env.AUTH_MONGODB_URI
// router.get('/auth/users/:id', adminAuth, proxy(AUTH_SERVICE_URL, proxyOptions));
// router.put('/auth/users/:id', adminAuth, proxy(AUTH_SERVICE_URL, proxyOptions));
// router.delete('/auth/users/:id', adminAuth, proxy(AUTH_SERVICE_URL, proxyOptions));

// module.exports = router;























// const AUTH_SERVICE_URL = 'http://localhost:3000';

// // Proxy middleware to forward requests to auth-service
// const proxyMiddleware = proxy(AUTH_SERVICE_URL, {
//   proxyReqPathResolver: (req) => {
//     // Remove '/admin' from the path when forwarding
//     return req.url.replace('/admin', '');
//   },
//   // Forward the admin user info to the auth service
//   proxyReqBodyDecorator: (bodyContent, srcReq) => {
//     if (bodyContent) {
//       const parsedBody = JSON.parse(bodyContent.toString());
//       parsedBody.adminId = srcReq.admin.id; // Add admin ID to the request
//       return JSON.stringify(parsedBody);
//     }
//     return bodyContent;
//   },
//   // Preserve headers when forwarding
//   proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//     proxyReqOpts.headers['x-admin-id'] = srcReq.admin.id;
//     return proxyReqOpts;
//   }
// });

// // Protected admin routes that forward to auth-service
// router.get('/auth/users', adminAuth, proxyMiddleware);
// router.get('/auth/users/:id', adminAuth, proxyMiddleware);
// router.put('/auth/users/:id', adminAuth, proxyMiddleware);
// router.delete('/auth/users/:id', adminAuth, proxyMiddleware);
//END_this for comminication with  2 mecroservice adminAuth-service and auth-service





