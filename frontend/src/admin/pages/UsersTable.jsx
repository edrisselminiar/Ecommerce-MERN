import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight, Table, X } from 'lucide-react'; // Added X icon for reset button
import EditUserModal from "../components/user-components/EditUserModal";
import DeleteConfirmationModalUsers from '../components/user-components/DeleteConfirmationModalUsers';

const UsersTable = () => {

  // State variables
  const [users, setUsers] = useState([]); // Stores the list of users
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls the visibility of the edit modal
  const [selectedUser, setSelectedUser] = useState(null); // Stores the user selected for editing
  const [formData, setFormData] = useState({ // Stores form data for editing a user
    fullname: '',
    email: '',
    password: ''
  });
  const [searchQuery, setSearchQuery] = useState(''); // Stores the search query for filtering users
  const itemsPerPage = 10; // Number of users to display per page

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controls the visibility of the delete modal
  const [userToDelete, setUserToDelete] = useState(null); // Stores the user selected for deletion

  // Function to retrieve the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token'); // or however you store your token
  };

  // Fetch users when the component mounts or when the current page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  //start _Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = getAuthToken();
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/users',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      const usersArray = Array.isArray(data) ? data : data.users || [];
      setUsers(usersArray);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  //END _Function to fetch users from the API


  //START _Function to open popup modal delete Users 
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  //END _Function to open popup modal delete Users 

  

  //START _Function to handle user deletion
  const handleDelete = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchUsers(); // Refresh the user list after deletion
        setIsDeleteModalOpen(false); // Close the delete modal
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  //END _Function to handle user deletion

  
  //start _Function to handle user updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/auth/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsEditModalOpen(false); // Close the edit modal
        fetchUsers(); // Refresh the user list after update
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
 //END _Function to handle user updates


  //START _Function to open popup modal edit Users 
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      password: ''
    });
    setIsEditModalOpen(true);
  };
  //START _Function to open popup modal edit Users 


  //START _Function to search to users
  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //END _Function to search to users

  
  //START _Function to reset search bar
  const resetSearch = () => {
    setSearchQuery('');
  };
  //END _Function to reset search bar


  //START _Function Pagination calculations
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, endIndex) || [];
  //END _Function Pagination calculations


  //START _ Display loading spinner while data is being fetched*
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  //END _ Display loading spinner while data is being fetched*


  //START _ Display error message if there's an error fetching users
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }
  //END _ Display error message if there's an error fetching users


  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {/* START _ Header section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Users Management</h2>

          {/* START _ Search Bar and Reset Button */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={resetSearch}
                className="p-2 text-red-500 hover:text-gray-700 focus:outline-none -ml-12 "
              >
                <X size={20} /> {/* Reset icon */}
              </button>
            )}
          </div>
          {/* END _ Search Bar and Reset Button  */}

        </div>
        {/* END _ Header section */}

        {/* START _ Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* STARt _ head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {/* END _ head */}

            {/* START _ body */}
            <tbody className="bg-white divide-y divide-gray-200">

              {/* START _ if user not found */}
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (

                //  START _ fetche Uesrs
                currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.fullname}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">

                      {/* popup Edit model */}
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* popup delet model */}
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* END _ body */}

          </table>
        </div>
        {/* END _ table */}

        {/* START _ Pagination */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="mx-4 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* END _ Pagination */}

      {/* START _ Edit User Modal popup*/}
      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        user={selectedUser}
        formData={formData}
        setFormData={setFormData}
      />
      {/* END _ Edit User Modal popup*/}

      {/* START _ Delete Confirmation Modal popup */}
      <DeleteConfirmationModalUsers 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(userToDelete?._id)}
        userName={userToDelete?.fullname}
      />
      {/* END _ Delete Confirmation Modal popup */}

    </div>
  );
};

export default UsersTable;



