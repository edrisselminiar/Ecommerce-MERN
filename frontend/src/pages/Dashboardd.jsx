import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboardd() {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {adminData && (
        <div className="bg-white p-4 rounded shadow">
          <p>Admin Email: {adminData.email}</p>
          <p>Admin ID: {adminData.adminId}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboardd    