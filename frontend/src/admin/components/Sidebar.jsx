// import React, { useState } from 'react';
// import { 
//   Users, BarChart2, Settings, 
//   Menu, ChevronRight, ChevronDown, LogOut, FolderKanban
// } from 'lucide-react';

// const Sidebar = ({ onNavigate, currentView }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [openSubmenu, setOpenSubmenu] = useState('');

//   const menuItems = [
//     {
//       id: 'products',
//       label: 'Products',
//       icon: FolderKanban,
//       badge: '3',
//       onClick: () => onNavigate('products')
//     },
//     {
//       id: 'users',
//       label: 'Users',
//       icon: Users,
//       badge: '3',
//       onClick: () => onNavigate('users')
//     },
//     {
//       id: 'analytics',
//       label: 'Analytics',
//       icon: BarChart2,
//       submenu: [
//         { id: 'sales', label: 'Sales Analytics' },
//         { id: 'traffic', label: 'Traffic Sources' }
//       ]
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings,
//       submenu: [
//         { id: 'profile', label: 'Profile Settings' },
//         { id: 'security', label: 'Security' }
//       ]
//     }
//   ];

//   const toggleSubmenu = (menuId) => {
//     setOpenSubmenu(openSubmenu === menuId ? '' : menuId);
//   };

//   return (
//     <div className="">
//       {/* Mobile overlay */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Mobile menu button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg lg:hidden z-40"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Sidebar */}
//       <aside 
//         className={`
//           fixed top-0 left-0 h-full bg-white shadow-xl lg:mt-6 z-40
//           transition-all duration-300 ease-in-out
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           lg:relative
//         `}
//       >
//         {/* Logo section */}
//         <div className="h-16 flex items-center justify-between px-4 border-b">
//           <div className="flex items-center">
//             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
//               <span className="text-white font-bold">A</span>
//             </div>
//             {!isCollapsed && <span className="ml-3 font-semibold">Admin Panel</span>}
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

//         {/* Navigation Menu */}
//         <nav className="p-2 space-y-1 overflow-y-auto">
//           {menuItems.map((item) => (
//             <div key={item.id}>
//               <button
//                 onClick={() => {
//                   if (item.onClick) {
//                     item.onClick();
//                     setIsMobileOpen(false);
//                   }
//                   if (item.submenu) toggleSubmenu(item.id);
//                 }}
//                 className={`
//                   w-full flex items-center justify-between p-2 rounded-lg
//                   transition-colors duration-200
//                   ${currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
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
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;







import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, BarChart2, Settings, 
  Menu, ChevronDown, ChevronRight, LogOut, FolderKanban,
  Boxes, Calendar, MessageSquare, ShoppingCart
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState('');
  const location = useLocation();

  // Simplified menuItems to focus on Products and Users
  const menuItems = [
    {
      id: 'products',
      label: 'Products',
      link: '/dashboard/products',
      icon: FolderKanban,
      badge: '3'
    },
    {
      id: 'users',
      label: 'Users',
      link: '/dashboard/users',
      icon: Users,
      badge: '3'
    }
  ];

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu(openSubmenu === menuId ? '' : menuId);
  };

  return (
    <div className="">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg lg:hidden z-40"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl lg:mt-6 z-40
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          lg:relative
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            {!isCollapsed && <span className="ml-3 font-semibold">Admin Panel</span>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ChevronRight 
              className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Link
                to={item.link}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  w-full flex items-center justify-between p-2 rounded-lg
                  transition-colors duration-200
                  ${location.pathname === item.link ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <div className="flex items-center">
                  <item.icon size={20} />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                    {item.badge}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </nav>

        {/* Footer Section */}
        <div className={`border-t p-4 ${isCollapsed ? 'text-center' : ''}`}>
          <button
            className={`
              flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;


