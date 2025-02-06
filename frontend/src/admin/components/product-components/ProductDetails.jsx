import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import { 
  ArrowLeft, Package, Clock, Tag, Box, 
  Shield, Heart, Share2, Eye, Edit2
} from 'lucide-react';

// product Detils used in admin/pages/ProductsTable.jsx
const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Hook to navigate between routes
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors
  const [activeImage, setActiveImage] = useState(0); // State to track the active image in the gallery
  const [isWishlist, setIsWishlist] = useState(false); // State to handle wishlist status
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

  // START _ Function to retrieve the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token'); // Retrieve the token stored in localStorage
  };
  // END _ Function to retrieve the authentication token from localStorage


  // START _ Fetch product details when the component mounts or the ID changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = getAuthToken(); // Get the authentication token
        
        // Fetch product details from the server
        const response = await fetch(`http://localhost:3001/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the auth token in the headers
            'Content-Type': 'application/json'
          }
        });
        
        // Handle response errors
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json(); // Parse the response data
        setProduct(data); // Set the product data in state
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set the error message
        setLoading(false); // Set loading to false
      }
    };
    
    if (id) fetchProductDetails(); // Fetch product details if the ID is available
  }, [id]); // Dependency array to re-run the effect when the ID changes
  // END _ Fetch product details when the component mounts or the ID changes


  // Display a loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Display an error message if there's an error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }
  
  // Display a message if the product is not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-gray-600 font-medium">Product not found</p>
        </div>
      </div>
    );
  }

  // STRAT _ Function to get the full URL of a product image
  const getImageUrl = (images) => {
    if (!images) return ''; // Return an empty string if the image is not defined
    return `http://localhost:3001/images/products/${images}`; // Return the full image URL
  };
  // END _ Function to get the full URL of a product image

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">

        {/* START _ Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            {/* Edit Button */}
            <button
              onClick={() => navigate(`/dashboard/products/edit/${product._id}`)} // Navigate to the edit page
              className="inline-flex items-center px-3 py-2 text-black hover:text-yellow-900 transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setIsWishlist(!isWishlist)} // Toggle wishlist status
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart 
                className={`w-6 h-6 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>

            {/* Share Button */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        {/* END _ Navigation Bar */}

        {/* START _ Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* START _ Product Gallery */}
            <ProductGallery product={product} getImageUrl={getImageUrl} />
            {/* END _ Product Gallery */}
        
            {/* START _ Product Information */}
            <div className="p-6 lg:border-l border-gray-100">
              <div className="space-y-6">

                {/* Product Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-600 font-medium">{product.type}</span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {product.description}
                  </h1>
                  <div className="flex flex-wrap gap-2">

                    {/* Visibility Badge */}
                    <StatusBadge
                      icon={Eye}
                      label="Visibility"
                      value={product.hidden ? 'Hidden' : 'Visible'}
                      positive={!product.hidden}
                    />

                    {/* Landing Page Badge */}
                    <StatusBadge
                      icon={Tag}
                      label="Landing Page"
                      value={product.onlyOnLandingPage ? 'Featured' : 'Standard'}
                      positive={product.onlyOnLandingPage}
                    />
                  </div>
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-600 mb-1">Price</p>
                    <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-600 mb-1">Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                  </div>
                </div>

                {/* Specifications */}
                {Object.values(product.specifications).some(value => value) && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-gray-700" />
                      Specifications
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        value && (
                          <div key={key} className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-gray-600 text-sm mb-1">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </p>
                            <p className="font-medium text-gray-900">{value}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                <div className="grid grid-cols-2 gap-4">
                  {product.Marke && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center">
                        <Box className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-gray-600 text-sm">Brand</p>
                          <p className="font-medium text-gray-900">{product.Marke}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {product.garantie && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-3 text-gray-600" />
                        <div>
                          <p className="text-gray-600 text-sm">Warranty</p>
                          <p className="font-medium text-gray-900">{product.garantie}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* END _ Product Information */}


          </div>

          {/* SATRt _  Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div className="flex items-center mb-2 sm:mb-0">
                <Clock className="w-4 h-4 mr-2" />
                <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <p>Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          {/* SATRt _  Footer */}

        </div>
        {/* END _ Main Content */}


      </div>
    </div>
  );
};

// Enhanced StatusBadge component
const StatusBadge = ({ icon: Icon, label, value, positive }) => (
  <div className={`
    px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
    ${positive 
      ? 'bg-green-50 text-green-700 border border-green-200' 
      : 'bg-red-50 text-red-700 border border-red-200'
    }
  `}>
    <Icon className="w-4 h-4" />
    {value}
  </div>
);

export default ProductDetails;



