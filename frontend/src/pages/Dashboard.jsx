import React from 'react';
import HeaderDashboard from './../admin/components/HeaderDashboard';
import Sidebar from './../admin/components/Sidebar';
import MainContent from './../admin/components/navigation/MainContent';

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-gray-100">
        <HeaderDashboard />
        <div className="flex mt-16">
          <Sidebar />
          <div className="flex-1 p-6">
            <MainContent />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;