// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Save, Upload, X } from 'lucide-react';

// const AddProductForm = () => {
//     const navigate = useNavigate();
//     const [error, setError] = useState(null);
//     const [isDragging, setIsDragging] = useState(false);
//     const [formData, setFormData] = useState({
//       description: '',
//       type: '',
//       onlyOnLandingPage: false,
//       price: 0,
//       images: [], // Will store both File objects and generated filenames
//       discounts: false,
//       Marke: '',
//       garantie: '',
//       hidden: false,
//       stock: 0,
//       specifications: {
//         processor: '',
//         ram: '',
//         storage: '',
//         graphicsCard: '',
//         display: '',
//         claver: '',
//         systemeDéxploitation: '',
//         boiter: '',
//         alimonation: '',
//       },
//     });
  
//     const generateUniqueFilename = (file) => {
//       const timestamp = Date.now();
//       const randomString = Math.random().toString(36).substring(2, 8);
//       const extension = file.name.split('.').pop().toLowerCase();
//       return `${timestamp}-${randomString}.${extension}`;
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const formDataToSend = new FormData();
        
//         // Generate unique filenames for images and prepare image data
//         const imageData = await Promise.all(formData.images.map(async (image) => {
//           const uniqueFilename = generateUniqueFilename(image);
//           formDataToSend.append('images', image, uniqueFilename);
//           return uniqueFilename;
//         }));
  
//         // Prepare the product data with image filenames
//         const productData = {
//           ...formData,
//           images: imageData, // Only send the filenames to be stored in the database
//         };
  
//         // Append the stringified product data
//         formDataToSend.append('productData', JSON.stringify(productData));
  
//         const response = await fetch('http://localhost:3001/api/products', {
//           method: 'POST',
//           body: formDataToSend,
//         });
//         console.log(response)
  
//         if (!response.ok) throw new Error('Failed to create product');
        
//         navigate('/d/');
//       } catch (err) {
//         setError(err.message);
//       }
//     };
  
//     const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;
      
//       if (name.includes('specifications.')) {
//         const specField = name.split('.')[1];
//         setFormData(prev => ({
//           ...prev,
//           specifications: {
//             ...prev.specifications,
//             [specField]: value
//           }
//         }));
//       } else {
//         setFormData(prev => ({
//           ...prev,
//           [name]: type === 'checkbox' ? checked : value
//         }));
//       }
//     };
  
//     const handleDragEnter = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(true);
//     };
  
//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(false);
//     };
  
//     const handleDrop = useCallback((e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(false);
  
//       const files = Array.from(e.dataTransfer.files);
//       const validFiles = files.filter(file => file.type.startsWith('image/'));
  
//       setFormData(prev => ({
//         ...prev,
//         images: [...prev.images, ...validFiles]
//       }));
//     }, []);
  
//     const handleFileSelect = (e) => {
//       const files = Array.from(e.target.files);
//       setFormData(prev => ({
//         ...prev,
//         images: [...prev.images, ...files]
//       }));
//     };
  
//     const removeImage = (indexToRemove) => {
//       setFormData(prev => ({
//         ...prev,
//         images: prev.images.filter((_, index) => index !== indexToRemove)
//       }));
//     };
  
















// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Save, Upload, X } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';



// const AddProductForm = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [formData, setFormData] = useState({
//     description: '',
//     type: '',
//     onlyOnLandingPage: false,
//     price: 0,
//     images: [],
//     imageNames: [], // Array to store image names
//     discounts: false,
//     Marke: '',
//     garantie: '',
//     hidden: false,
//     stock: 0,
//     specifications: {
//       processor: '',
//       ram: '',
//       storage: '',
//       graphicsCard: '',
//       display: '',
//       claver: '',
//       systemeDéxploitation: '',
//       boiter: '',
//       alimonation: '',
//     },
//   });

//   const saveImageLocally = async (file) => {
//     try {
//       const fileName = `${uuidv4()}-${file.name}`;
//       const newPath = `/src/assets/images/products/${fileName}`;
      
//       // Create a copy of the file with the new name
//       const newFile = new File([file], fileName, { type: file.type });
      
//       // In a real application, you would use a file system API here
//       // For now, we'll just store the file name
//       return fileName;
//     } catch (error) {
//       console.error('Error saving image:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Save images locally and collect their names
//       const imagePromises = formData.images.map(saveImageLocally);
//       const savedImageNames = await Promise.all(imagePromises);

//       // Prepare the data to send to the backend
//       const productData = {
//         ...formData,
//         images: savedImageNames, // Send only the image names to the backend
//       };

//       const response = await fetch('http://localhost:3001/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) throw new Error('Failed to create product');
      
   
//     //   navigate(`/dashboard/products/${product._id}`;
//       navigate('/dashboard/products/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('specifications.')) {
//       const specField = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         specifications: {
//           ...prev.specifications,
//           [specField]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const files = Array.from(e.dataTransfer.files);
//     const validFiles = files.filter(file => file.type.startsWith('image/'));

//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...validFiles]
//     }));
//   }, []);

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const removeImage = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove)
//     }));
//   };


import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    type: '',
    onlyOnLandingPage: false,
    price: 0,
    images: [],
    imageNames: [],
    discounts: false,
    Marke: '',
    garantie: '',
    hidden: false,
    stock: 0,
    specifications: {
      processor: '',
      ram: '',
      storage: '',
      graphicsCard: '',
      display: '',
      claver: '',
      systemeDéxploitation: '',
      boiter: '',
      alimonation: '',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle image upload first
      const imagePromises = formData.imageNames.map(async (image) => {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
        
        // Create FormData for each image
        const formDataImage = new FormData();
        formDataImage.append('image', image);
        formDataImage.append('fileName', fileName); // Send the desired filename to server
        
        // Upload image to server
        const uploadResponse = await fetch('http://localhost:3001/api/products/upload', {
          method: 'POST',
          body: formDataImage,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload image ${fileName}`);
        }

        // Return the filename that was stored
        return fileName;
      });

      // Wait for all images to be uploaded
      const storedimages = await Promise.all(imagePromises);

      // Prepare product data for API
      const productData = {
        ...formData,
        imageNames: storedimages, // Store only the file names in the database
      };

      delete productData.images; // Remove temporary storage array

      // Create product in database
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      navigate('/d/');
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
    }
  };

  // Rest of the component remains the same...
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

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

    setFormData(prev => ({
      ...prev,
      imageNames: [...prev.imageNames, ...validFiles],
    }));
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      imageNames: [...prev.imageNames, ...files],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageNames: prev.imageNames.filter((_, index) => index !== indexToRemove),
    }));
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/d/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Product Images*</h2>
            
            {/* Drag & Drop Zone */}
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
                />
              </label>
            </div>

            {/* Image Preview */}
            {formData.imageNames.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Images ({formData.imageNames.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.imageNames.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
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

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <input
                  required
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter product description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type*
                </label>
                <input
                  required
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter product type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price*
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock*
                </label>
                <input
                  required
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="onlyOnLandingPage"
                  checked={formData.onlyOnLandingPage}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Show on Landing Page
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="discounts"
                  checked={formData.discounts}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Enable Discounts
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hidden"
                  checked={formData.hidden}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Hide Product
                </label>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  name="Marke"
                  value={formData.Marke}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty
                </label>
                <input
                  type="text"
                  name="garantie"
                  value={formData.garantie}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter warranty information"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData.specifications).map((spec) => (
                <div key={spec}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={`specifications.${spec}`}
                    value={formData.specifications[spec]}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder={`Enter ${spec}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/d/')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;











// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Save, Upload } from 'lucide-react';

// const AddProductForm = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     description: '',
//     type: '',
//     onlyOnLandingPage: false,
//     price: 0,
//     images: [],
//     discounts: false,
//     Marke: '',
//     garantie: '',
//     hidden: false,
//     stock: 0,
//     specifications: {
//       processor: '',
//       ram: '',
//       storage: '',
//       graphicsCard: '',
//       display: '',
//       claver: '',
//       systemeDéxploitation: '',
//       boiter: '',
//       alimonation: '',
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3001/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error('Failed to create product');
      
//       navigate('/d/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('specifications.')) {
//       const specField = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         specifications: {
//           ...prev.specifications,
//           [specField]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => navigate('/d/')}
//             className="flex items-center text-gray-600 hover:text-gray-900"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description*
//                 </label>
//                 <input
//                   required
//                   type="text"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   placeholder="Enter product description"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Type*
//                 </label>
//                 <input
//                   required
//                   type="text"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   placeholder="Enter product type"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price*
//                 </label>
//                 <input
//                   required
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   min="0"
//                   step="0.01"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Stock*
//                 </label>
//                 <input
//                   required
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   min="0"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 space-y-2">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="onlyOnLandingPage"
//                   checked={formData.onlyOnLandingPage}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-blue-600 rounded border-gray-300"
//                 />
//                 <label className="ml-2 text-sm text-gray-700">
//                   Show on Landing Page
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="discounts"
//                   checked={formData.discounts}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-blue-600 rounded border-gray-300"
//                 />
//                 <label className="ml-2 text-sm text-gray-700">
//                   Enable Discounts
//                 </label>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="hidden"
//                   checked={formData.hidden}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-blue-600 rounded border-gray-300"
//                 />
//                 <label className="ml-2 text-sm text-gray-700">
//                   Hide Product
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Brand
//                 </label>
//                 <input
//                   type="text"
//                   name="Marke"
//                   value={formData.Marke}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   placeholder="Enter brand name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Warranty
//                 </label>
//                 <input
//                   type="text"
//                   name="garantie"
//                   value={formData.garantie}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                   placeholder="Enter warranty information"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Specifications */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold mb-4">Specifications</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.keys(formData.specifications).map((spec) => (
//                 <div key={spec}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {spec.charAt(0).toUpperCase() + spec.slice(1)}
//                   </label>
//                   <input
//                     type="text"
//                     name={`specifications.${spec}`}
//                     value={formData.specifications[spec]}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2"
//                     placeholder={`Enter ${spec}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={() => navigate('/d/')}
//               className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
//             >
//               <Save className="w-4 h-4 mr-2" />
//               Create Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProductForm;