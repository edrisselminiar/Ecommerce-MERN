import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

// compopent popup model delete users -> used in /admin/pages/UsersTable.jsx
const DeleteConfirmationModalUsers = ({ isOpen, onClose, onConfirm, userName }) => {

  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">

      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
          
          {/* Close button*/}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Modal content*/}
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            
            {/* Modal title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete User
            </h3>
            
            {/* Modal description: Displays the user's name and a warning message */}
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete {userName}? This action cannot be undone.
            </p>

            {/* Cancel and Delete buttons */}
            <div className="flex gap-3">
              {/* Cancel button */}
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
              >
                Cancel
              </button>
              {/* Delete button*/}
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModalUsers;



