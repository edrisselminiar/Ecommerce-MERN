import React, { useState, useCallback } from 'react';
import { Upload, X, Loader } from 'lucide-react';

const ImageUploadSection = ({ formData = { imageNames: [] }, setFormData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length > 0) {
      setIsLoading(true);
      
      // Set initial loading states for new images
      const newLoadingStates = {};
      validFiles.forEach((file) => {
        newLoadingStates[file.name] = true;
      });
      setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));

      // Simulate unified loading for all images
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          imageNames: [...(prev?.imageNames || []), ...validFiles],
        }));
        setIsLoading(false);
        
        // Clear loading states after a brief delay
        setTimeout(() => {
          const clearedStates = {};
          validFiles.forEach((file) => {
            clearedStates[file.name] = false;
          });
          setLoadingStates(prev => ({ ...prev, ...clearedStates }));
        }, 500);
      }, 1500);
    }
  }, [setFormData]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      setIsLoading(true);
      
      // Set initial loading states for new images
      const newLoadingStates = {};
      files.forEach((file) => {
        newLoadingStates[file.name] = true;
      });
      setLoadingStates(prev => ({ ...prev, ...newLoadingStates }));

      // Simulate unified loading for all images
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          imageNames: [...(prev?.imageNames || []), ...files],
        }));
        setIsLoading(false);
        
        // Clear loading states after a brief delay
        setTimeout(() => {
          const clearedStates = {};
          files.forEach((file) => {
            clearedStates[file.name] = false;
          });
          setLoadingStates(prev => ({ ...prev, ...clearedStates }));
        }, 500);
      }, 1500);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageNames: prev.imageNames.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Product Images*</h2>
      
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
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

      {/* Image Preview */}
      {formData.imageNames.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Selected Images ({formData.imageNames.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.imageNames.map((image, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                  {loadingStates[image.name] ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;




