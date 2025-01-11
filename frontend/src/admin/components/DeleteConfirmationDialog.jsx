import React, { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

const DeleteConfirmationDialog = ({ productId, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = async () => {
    await onDelete(productId);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-600 hover:text-red-900 transition-colors duration-200"
      >
        <Trash2 size={20} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmationDialog;






// import React from 'react';
// import { X } from 'lucide-react';

// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName = 'item' }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <X size={20} />
//         </button>

//         {/* Content */}
//         <div className="mt-3 text-center sm:mt-0 sm:text-left">
//           <h3 className="text-lg font-medium leading-6 text-gray-900">
//             Delete {itemName}
//           </h3>
//           <div className="mt-2">
//             <p className="text-sm text-gray-500">
//               Are you sure you want to delete this {itemName}? This action cannot be undone.
//             </p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onConfirm}
//             className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmationModal;