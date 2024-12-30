const axios = require('axios');
//start_Give admin the right to some root users(get_put_delet)
//comminicated with mecroservice adminAuth-service(routes/authRoutes.js->verify)

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || 
                     req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const response = await axios.get('http://localhost:3002/api/admin/verify', {
            headers: { 'x-auth-token': token }
        });

        if (response.data.isAdmin) {
            req.admin = response.data;
            next();
        } else {
            res.status(403).json({ error: 'Not authorized as admin' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate as admin' });
    }
};

module.exports = verifyAdmin;