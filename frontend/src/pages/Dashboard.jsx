
// import React, { useState } from 'react';
// import { Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const tableData = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', role: 'User' },
//     { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', role: 'User' },
//     { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'Inactive', role: 'User' },
//   ];

//   const handleView = (id) => console.log('View user:', id);
//   const handleUpdate = (id) => console.log('Update user:', id);
//   const handleDelete = (id) => console.log('Delete user:', id);

//   return (
//     <main className={`lg:ml-64 p-6 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold">Users Table</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {tableData.map((user) => (
//                 <tr key={user.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                       ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                         user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-red-100 text-red-800'}`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {/* Desktop view - Show all buttons */}
//                     <div className="hidden sm:flex space-x-2">
//                       <button
//                         onClick={() => handleView(user.id)}
//                         className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200"
//                       >
//                         <Eye size={16} className="inline mr-1" />
//                         <span className="hidden md:inline">View</span>
//                       </button>
//                       <button
//                         onClick={() => handleUpdate(user.id)}
//                         className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-md hover:bg-yellow-200 transition-colors duration-200"
//                       >
//                         <Edit2 size={16} className="inline mr-1" />
//                         <span className="hidden md:inline">Edit</span>
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user.id)}
//                         className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
//                       >
//                         <Trash2 size={16} className="inline mr-1" />
//                         <span className="hidden md:inline">Delete</span>
//                       </button>
//                     </div>

//                     {/* Mobile view - Dropdown menu */}
//                     <div className="sm:hidden">
//                       <div className="relative inline-block text-left">
//                         <button
//                           className="p-2 rounded-md hover:bg-gray-100"
//                           onClick={() => console.log('Toggle dropdown')}
//                         >
//                           <MoreVertical size={16} />
//                         </button>
//                         {/* Dropdown menu can be implemented here */}
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Dashboard;





import React, { useState } from 'react';
import { Menu, X, Bell, Search, ChevronDown, Users, Home, Settings, BarChart } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Users, label: 'Users' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' }
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', role: 'User' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'Inactive', role: 'User' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none"
              />
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500" />
              <span className="hidden md:block text-sm font-medium">Admin User</span>
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-bold">Logo</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className={`lg:ml-64 p-6 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Users Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;





// import React, { useState } from 'react';
// import { 
//   Eye, Edit2, Trash2, Plus, Search, Filter,
//   ChevronDown, ChevronLeft, ChevronRight
// } from 'lucide-react';

// const ProductTable = () => {
//   const [products] = useState([
//     {
//       id: 1,
//       description: "Gaming Laptop XPS 15",
//       type: "Electronics",
//       onlyOnLandingPage: true,
//       price: 1299.99,
//       discounts: true,
//       Marke: "Dell",
//       garantie: "2 years",
//       hidden: false,
//       stock: 50
//     },
//     // Add more sample products as needed
//   ]);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   const handleView = (product) => {
//     console.log('Viewing product:', product);
//   };

//   const handleEdit = (product) => {
//     console.log('Editing product:', product);
//   };

//   const handleDelete = (product) => {
//     console.log('Deleting product:', product);
//   };

//   const filteredProducts = products.filter(product =>
//     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h2 className="text-2xl font-semibold text-gray-800">Products Management</h2>
        
//         <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//           {/* Search Bar */}
//           <div className="relative flex-grow sm:max-w-xs">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//           </div>

//           {/* Add Product Button */}
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//           >
//             <Plus size={20} />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentItems.map((product) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{product.description}</div>
//                   <div className="text-sm text-gray-500">{product.Marke}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{product.type}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     ${product.price.toFixed(2)}
//                     {product.discounts && (
//                       <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
//                         Discount
//                       </span>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className={`text-sm ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
//                     {product.stock} units
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                     ${product.hidden ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
//                     {product.hidden ? 'Hidden' : 'Visible'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleView(product)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <Eye size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="text-yellow-600 hover:text-yellow-900"
//                     >
//                       <Edit2 size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-6">
//         <div className="text-sm text-gray-700">
//           Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of{' '}
//           {filteredProducts.length} entries
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => 
//               Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage))
//             )}
//             disabled={currentPage >= Math.ceil(filteredProducts.length / itemsPerPage)}
//             className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;






// import React, { useState } from 'react';
// import { 
//   Home, Users, ShoppingCart, BarChart2, Settings, 
//   HelpCircle, Bell, ChevronDown, ChevronRight, Menu,
//   Boxes, Calendar, MessageSquare, LogOut
// } from 'lucide-react';

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('dashboard');
//   const [openSubmenu, setOpenSubmenu] = useState('');

//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: Home,
//       badge: '3'
//     },
//     {
//       id: 'analytics',
//       label: 'Analytics',
//       icon: BarChart2,
//       submenu: [
//         { id: 'sales', label: 'Sales Analytics' },
//         { id: 'traffic', label: 'Traffic Sources' },
//         { id: 'conversion', label: 'Conversion Rates' }
//       ]
//     },
//     {
//       id: 'products',
//       label: 'Products',
//       icon: Boxes,
//       badge: 'New'
//     },
//     {
//       id: 'customers',
//       label: 'Customers',
//       icon: Users
//     },
//     {
//       id: 'orders',
//       label: 'Orders',
//       icon: ShoppingCart,
//       badge: '25'
//     },
//     {
//       id: 'calendar',
//       label: 'Calendar',
//       icon: Calendar
//     },
//     {
//       id: 'messages',
//       label: 'Messages',
//       icon: MessageSquare,
//       badge: '12'
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings,
//       submenu: [
//         { id: 'profile', label: 'Profile Settings' },
//         { id: 'security', label: 'Security' },
//         { id: 'preferences', label: 'Preferences' }
//       ]
//     }
//   ];

//   const toggleSubmenu = (menuId) => {
//     setOpenSubmenu(openSubmenu === menuId ? '' : menuId);
//   };

//   return (
//     <>
//       {/* Mobile Menu Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg lg:hidden z-50"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Sidebar */}
//       <aside 
//         className={`
//           fixed top-0 left-0 h-full bg-white shadow-xl z-50
//           transition-all duration-300 ease-in-out
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           lg:relative
//         `}
//       >
//         {/* Logo Section */}
//         <div className="h-16 flex items-center justify-between px-4 border-b">
//           <div className="flex items-center">
//             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
//               <span className="text-white font-bold">A</span>
//             </div>
//             {!isCollapsed && (
//               <span className="ml-3 font-semibold text-gray-800">Admin Panel</span>
//             )}
//           </div>
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100"
//           >
//             <ChevronRight 
//               className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
//               size={20}
//             />
//           </button>
//         </div>

//         {/* User Profile Section */}
//         {!isCollapsed && (
//           <div className="p-4 border-b">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-200">
//                 <img
//                   src="/api/placeholder/40/40"
//                   alt="Profile"
//                   className="w-full h-full rounded-full"
//                 />
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-800">John Doe</p>
//                 <p className="text-xs text-gray-500">Administrator</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation Menu */}
//         <nav className="p-2 space-y-1 overflow-y-auto flex-grow">
//           {menuItems.map((item) => (
//             <div key={item.id}>
//               <button
//                 onClick={() => {
//                   setActiveMenu(item.id);
//                   if (item.submenu) toggleSubmenu(item.id);
//                 }}
//                 className={`
//                   w-full flex items-center justify-between p-2 rounded-lg
//                   transition-colors duration-200
//                   ${activeMenu === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
//                   ${isCollapsed ? 'justify-center' : ''}
//                 `}
//               >
//                 <div className="flex items-center">
//                   <item.icon size={20} />
//                   {!isCollapsed && <span className="ml-3">{item.label}</span>}
//                 </div>
//                 {!isCollapsed && (
//                   <div className="flex items-center">
//                     {item.badge && (
//                       <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 mr-2">
//                         {item.badge}
//                       </span>
//                     )}
//                     {item.submenu && (
//                       <ChevronDown
//                         size={16}
//                         className={`transform transition-transform duration-200 
//                           ${openSubmenu === item.id ? 'rotate-180' : ''}`}
//                       />
//                     )}
//                   </div>
//                 )}
//               </button>

//               {/* Submenu */}
//               {!isCollapsed && item.submenu && openSubmenu === item.id && (
//                 <div className="mt-1 ml-8 space-y-1">
//                   {item.submenu.map((subItem) => (
//                     <button
//                       key={subItem.id}
//                       className="w-full flex items-center p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
//                     >
//                       <span className="ml-3">{subItem.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* Footer Section */}
//         <div className={`border-t p-4 ${isCollapsed ? 'text-center' : ''}`}>
//           <button
//             className={`
//               flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200
//               ${isCollapsed ? 'justify-center' : ''}
//             `}
//           >
//             <LogOut size={20} />
//             {!isCollapsed && <span className="ml-3">Logout</span>}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Dashboardd() {
//   const [adminData, setAdminData] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/admin/login');
//   };

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:3002/api/admin/verify', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include'
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setAdminData(data);
//         }
//       } catch (error) {
//         console.error('Error fetching admin data:', error);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//       {adminData && (
//         <div className="bg-white p-4 rounded shadow">
//           <p>Admin Email: {adminData.email}</p>
//           <p>Admin ID: {adminData.adminId}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboardd    