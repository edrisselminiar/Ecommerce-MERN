import React, { useState } from 'react';
import { Sun, Moon, LogOut, Eye, Trash2, Edit, Plus } from 'lucide-react';

// Layout Component
const Dashboard = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b">
              <span className="text-xl font-bold text-gray-800">Dashboard</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                    Users
                  </a>
                </li>
              </ul>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t">
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center justify-center w-full p-2 mb-2 text-gray-700 rounded hover:bg-gray-100"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="ml-2">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button className="flex items-center justify-center w-full p-2 text-red-600 rounded hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="h-16 bg-white shadow-sm">
            <div className="flex items-center justify-between h-full px-6">
              <h1 className="text-xl font-semibold text-gray-800">Products</h1>
              <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </button>
            </div>
          </header>

          {/* Product List */}
          <div className="p-6">
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hidden</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discounts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Landing Page</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">Gaming Laptop</td>
                    <td className="px-6 py-4">$999</td>
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Visible</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">Yes</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded-full">Yes</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-green-600">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;