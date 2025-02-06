import React, { useState, useCallback } from 'react';
import { Upload, X, Loader } from 'lucide-react';

// components upmoad image to abckend used in AddProductForm.jsx
const ImageUploadSection = ({ formData = { imageNames: [] }, setFormData }) => {


  // State variables for drag-and-drop functionality and loading states
  const [isDragging, setIsDragging] = useState(false); // Tracks if a file is being dragged over the drop zone
  const [isLoading, setIsLoading] = useState(false); // Tracks if images are currently being loaded
  const [loadingStates, setLoadingStates] = useState({}); // Tracks loading state for individual images

  // Handles the drag enter event to update the drag state
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Set dragging state to true
  };

  // Handles the drag leave event to update the drag state
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Set dragging state to false
  };

  // Handles the drop event to process dropped files
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Reset dragging state

    const files = Array.from(e.dataTransfer.files); // Convert FileList to an array
    const validFiles = files.filter(file => file.type.startsWith('image/')); // Filter only image files

    if (validFiles.length > 0) {
      setIsLoading(true); // Start loading state

      // Set loading states for each new image
      const newLoadingStates = {};
      validFiles.forEach((file) => {
        newLoadingStates[file.name] = true; // Mark each file as loading
      });
      setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));

      // Simulate loading with a delay
      setTimeout(() => {
        // Update form data with the new images
        setFormData(prev => ({
          ...prev,
          imageNames: [...(prev?.imageNames || []), ...validFiles],
        }));
        setIsLoading(false); // End loading state

        // Clear loading states after a brief delay
        setTimeout(() => {
          const clearedStates = {};
          validFiles.forEach((file) => {
            clearedStates[file.name] = false; // Mark each file as no longer loading
          });
          setLoadingStates(prev => ({ ...prev, ...clearedStates }));
        }, 500);
      }, 1500); // Simulate a 1.5-second loading delay
    }
  }, [setFormData]);


  // Handles file selection via the file input
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    if (files.length > 0) {
      setIsLoading(true); // Start loading state

      // Set loading states for each new image
      const newLoadingStates = {};
      files.forEach((file) => {
        newLoadingStates[file.name] = true; // Mark each file as loading
      });
      setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));

      // Simulate loading with a delay
      setTimeout(() => {
        // Update form data with the new images
        setFormData(prev => ({
          ...prev,
          imageNames: [...(prev?.imageNames || []), ...files],
        }));
        setIsLoading(false); // End loading state

        // Clear loading states after a brief delay
        setTimeout(() => {
          const clearedStates = {};
          files.forEach((file) => {
            clearedStates[file.name] = false; // Mark each file as no longer loading
          });
          setLoadingStates(prev => ({ ...prev, ...clearedStates }));
        }, 500);
      }, 1500); // Simulate a 1.5-second loading delay
    }
  };

  // Removes an image from the list
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageNames: prev.imageNames.filter((_, index) => index !== indexToRemove), // Filter out the image to remove
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Section Title */}
      <h2 className="text-lg font-semibold mb-4">Product Images*</h2>
      
      {/* Drag-and-Drop Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' // Highlight when dragging
            : 'border-gray-300 hover:border-gray-400' // Default and hover states
        }`}
      >
        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your images here, or
        </p>
        <label className="inline-block">
          <span className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
            Browse Files
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading}
          />
        </label>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-6 flex items-center justify-center">
          <Loader className="w-6 h-6 text-blue-600 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Loading images...</span>
        </div>
      )}

      {/* START _ Image Preview Section */}
      {formData.imageNames.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Selected Images ({formData.imageNames.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.imageNames.map((image, index) => (
              <div key={index} className="relative group">

                {/* START _ imges selected */}
                <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                  {loadingStates[image.name] ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(image)} // Create a preview URL for the image
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* START _ imges selected */}

                {/*START _  Remove Image Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
                {/*END _  Remove Image Button */}


              </div>
            ))}
          </div>
        </div>
      )}
       {/* END _ Image Preview Section */}
    </div>
  );
};

export default ImageUploadSection;








