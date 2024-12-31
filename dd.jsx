// src/utils/adminAuth.js
import axios from 'axios';

const ADMIN_API_URL = 'http://localhost:3002/api/admin';

export const adminAuth = {
    // Login admin and store token
    login: async (email, password) => {
        try {
            const response = await axios.post(`${ADMIN_API_URL}/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Verify admin status
    verifyAdmin: async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) return false;

            const response = await axios.get(`${ADMIN_API_URL}/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data.isAdmin;
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        }
    },

    // Logout admin
    logout: () => {
        localStorage.removeItem('adminToken');
    },

    // Get admin token
    getToken: () => {
        return localStorage.getItem('adminToken');
    }
};

// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { adminAuth } from '../utils/adminAuth';

const ProtectedRoute = ({ children }) => {
    const [isVerified, setIsVerified] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const verified = await adminAuth.verifyAdmin();
            setIsVerified(verified);
            setIsLoading(false);
        };
        verifyAdmin();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isVerified ? children : <Navigate to="/admin/login" />;
};

// src/pages/AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuth } from '../utils/adminAuth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await adminAuth.login(email, password);
            navigate('/admin/dashboard');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;