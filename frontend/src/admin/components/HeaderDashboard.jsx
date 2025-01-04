import React, { useState } from 'react';
import { 
  Bell, Search, Mail, Calendar, Settings, HelpCircle, 
  ChevronDown, Sun, Moon, Menu, X
} from 'lucide-react';

const HeaderDashboard = ({ onMenuClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', type: 'order' },
    { id: 2, title: 'Meeting at 3 PM', time: '1 hour ago', type: 'calendar' },
    { id: 3, title: 'Server update completed', time: '2 hours ago', type: 'system' }
  ];

  const profileMenu = [
    { label: 'My Profile', icon: Settings },
    { label: 'Calendar', icon: Calendar },
    { label: 'Help', icon: HelpCircle },
    { label: 'Settings', icon: Settings }
  ];

  return (  
    <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-50    ">
      <div className="px-4 lg:px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex justify-between">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 lg:w-96 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Search Button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button className="p-2 rounded-lg hover:bg-gray-100 relative hidden sm:block">
              <Mail size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-800">John Doe</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <ChevronDown size={16} className="hidden md:block text-gray-500" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  {profileMenu.map((item, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50"
                    >
                      <item.icon size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </button>
                  ))}
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderDashboard;



// import React, { useState } from 'react';

// import { Menu, X, Bell, Search, ChevronDown, Users, Home, Settings, BarChart } from 'lucide-react';


// export default function () {
//       const [sidebarOpen, setSidebarOpen] = useState(false);
    
//   return (
//     <header className="bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
//               <Search size={20} className="text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent border-none outline-none"
//               />
//             </div>
//             <button className="p-2 rounded-lg hover:bg-gray-100">
//               <Bell size={24} className="text-gray-600" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-blue-500" />
//               <span className="hidden md:block text-sm font-medium">Admin User</span>
//               <ChevronDown size={20} className="text-gray-500" />
//             </div>
//           </div>
//         </div>
//       </header>
//   )
// }
