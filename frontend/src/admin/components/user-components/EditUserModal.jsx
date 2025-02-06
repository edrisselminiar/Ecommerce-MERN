import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

// EditUserModal component for editing user details in a modal popup Used in admin/pages/UsersTable.jsx

// Props:
// - isOpen: Boolean to control modal visibility
// - onClose: Function to close the modal
// - onSubmit: Function to handle form submission
// - user: User data to be edited
// - formData: State object containing form data
// - setFormData: Function to update form data

const EditUserModal = ({ isOpen, onClose, onSubmit, user, formData, setFormData }) => {
  // State for managing validation errors
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to validate email format using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate the entire form
  const validateForm = () => {
    const newErrors = {
      fullname: '',
      email: '',
      password: ''
    };
    let isValid = true;

    // Validate fullname: Must be at least 3 characters long
    if (formData.fullname.trim().length < 3) {
      newErrors.fullname = 'Full name must be at least 3 characters long';
      isValid = false;
    }

    // Validate email: Must be a valid email format
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password: Must be at least 8 characters long (if provided)
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    // Update errors state and return validation status
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form before submitting
    if (validateForm()) {
      onSubmit(e);
    }
  };

  // Function to handle input changes and clear errors
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for the field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // If modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop: Clicking outside the modal closes it */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
          
          {/* Modal header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form for editing user details */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) => handleInputChange('fullname', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.fullname ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter full name"
              />

              {/* Display full name validation error */}
              {errors.fullname && (
                <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter email address"
              />

              {/* Display email validation error */}
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                New Password
              </label>
              <div className='flex'>
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter new password (optional)"
                />
                
                {/* Button to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" -ml-8"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Display password validation error or hint */}
              {errors.password ? (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              ) : (
                <p className="text-xs text-gray-500">
                  Leave blank to keep current password. Minimum 8 characters if changing.
                </p>
              )}
            </div>

            {/* Modal footer with Cancel and Save buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                Save Changes
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;






// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';

// //componets popup udit users export to admin/pages/UsersTable.jsx
// const EditUserModal = ({ isOpen, onClose, onSubmit, user, formData, setFormData }) => {
//   const [errors, setErrors] = useState({
//     fullname: '',
//     email: '',
//     password: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       fullname: '',
//       email: '',
//       password: ''
//     };
//     let isValid = true;

//     // Validate fullname
//     if (formData.fullname.trim().length < 3) {
//       newErrors.fullname = 'Full name must be at least 3 characters long';
//       isValid = false;
//     }

//     // Validate email
//     if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//       isValid = false;
//     }

//     // Validate password only if it's being changed
//     if (formData.password && formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSubmit(e);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: '' });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

//       {/* Modal */}
//       <div className="relative min-h-screen flex items-center justify-center p-4">
//         <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-gray-900">Edit User</h3>
//             <button
//               onClick={onClose}
//               className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X size={20} className="text-gray-500" />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-900">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={formData.fullname}
//                 onChange={(e) => handleInputChange('fullname', e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                   errors.fullname ? 'border-red-500' : 'border-gray-200'
//                 }`}
//                 placeholder="Enter full name"
//               />
//               {errors.fullname && (
//                 <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-900">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                   errors.email ? 'border-red-500' : 'border-gray-200'
//                 }`}
//                 placeholder="Enter email address"
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-900">
//                 New Password
//               </label>
              

//               <div className='flex'>

//                 <input
//                   // type="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
//                     errors.password ? 'border-red-500' : 'border-gray-200'
//                   }`}
//                   placeholder="Enter new password (optional)"
//                 />
//                 <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className=" -ml-8"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-5 w-5 text-gray-400" />
//                         ) : (
//                           <Eye className="h-5 w-5 text-gray-400" />
//                         )}
//                 </button>
//               </div>

//               {errors.password ? (
//                 <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//               ) : (
//                 <p className="text-xs text-gray-500">
//                   Leave blank to keep current password. Minimum 8 characters if changing.
//                 </p>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;