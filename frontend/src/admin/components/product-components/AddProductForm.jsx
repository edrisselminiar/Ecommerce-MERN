import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import ImageUploadSection from "./ImageUploadSection";


// add new product used in admin/pages/ProductsTable.jsx
const AddProductForm = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [error, setError] = useState(null); // State to handle form errors
  const [isDragging, setIsDragging] = useState(false); // State to handle drag-and-drop for images
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

  // Function to retrieve the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token'); // Retrieve the token stored in localStorage
  };

  // START _ Handle form submission image upload and storage
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Reset any previous errors

    try {
      // Validate that at least one image is upload and storage
      if (!formData.imageNames.length) {
        throw new Error('At least one image is required');
      }

      // START _ Handle image upload first
      const imagePromises = formData.imageNames.map(async (image) => {
        const timestamp = Date.now(); // Generate a unique timestamp for the file name
        const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`; // Create a unique file name
        
        const formDataImage = new FormData(); // Create a new FormData object for the image
        formDataImage.append('image', image); // Append the image file
        formDataImage.append('fileName', fileName); // Append the file name
        
        try {
          // Upload the image to the server
          const uploadResponse = await fetch('http://localhost:3001/api/products/upload', {
            method: 'POST',
            body: formDataImage,
          });

          // Handle upload errors
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.message || `Failed to upload image ${fileName}`);
          }

          // Return the uploaded file name
          const uploadResult = await uploadResponse.json();
          return uploadResult.fileName || fileName;
        } catch (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      });
      // END _ Handle image upload first

      // Wait for all images to be uploaded
      const storedImages = await Promise.all(imagePromises);

      // Prepare the product data to be sent to the server
      const productData = {
        ...formData,
        images: storedImages,
        imageNames: storedImages,
      };

      // Retrieve the authentication token
      const token = getAuthToken();

      // START _ Send the product data to the server storage in product-service/public/images/products
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the auth token in the headers
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData), // Convert the product data to JSON
      });
      // END _ Send the product data to the server

      // Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      // Navigate to the newly created product's page
      const newProduct = await response.json();
      navigate(`/dashboard/products/${newProduct._id}`);
    } catch (err) {
      setError(err.message); // Set the error message
      console.error('Error creating product:', err); // Log the error to the console
    }
  };
  // END _ Handle form submission image upload and storage

  // START _ Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle changes for nested specification fields
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
      // Handle changes for regular fields
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  // END _ Handle input changes for the form fields

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* START _ Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        </div>
        {/* END _ Header */}

        {/* Display error message if any */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* START _ Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <ImageUploadSection formData={formData} setFormData={setFormData} />

          {/* Basic Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Description */}
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
              
              {/* Type */}
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

              {/* Price */}
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

              {/* Stock */}
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

            {/* START _ Checkbox options */}
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
            {/* END _ Checkbox options */}

          </div>

          {/* START _ Additional Information Section */}
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
           {/* END _ Additional Information Section */}

          {/* START _ Specifications Section */}
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
          {/* END _ Specifications Section */}

          {/* START _ Action Buttons */}
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
          {/* END _ Action Buttons */}

        </form>
        {/* END _ Form */}

      </div>
    </div>
  );
};

export default AddProductForm;




