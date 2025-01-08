import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


import { 
  ArrowLeft, Package, Clock, Tag, Box, 
  Shield, Heart, Share2, Eye, Edit2
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  //console.log(id)

   // Get auth token function
   const getAuthToken = () => {
    return localStorage.getItem('token'); // or however you store your token
  };

 // Utility function to handle image paths
// const getImageUrl = (imagePath) => {
//   try {
//     // Check if the image path is already a full URL
//     if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
//       return imagePath;
//     }

//     // Handle relative paths from assets directory
//     return new URL(`/src/assets/images/products/${imagePath}`, import.meta.url).href;
//   } catch (error) {
//     console.error('Error loading image:', error);
//     return '/src/assets/images/products/placeholder.png'; // Fallback image
//   }
// };


const getImageUrl = (imagePath) => {
  try {
    // Check if the image path is already a full URL
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }

    // Use backend URL for images
    return `http://localhost:3001/images/products/${imagePath}`;
  } catch (error) {
    console.error('Error loading image:', error);
    return '/placeholder.png'; // Fallback image
  }
};




  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch(`http://localhost:3001/api/products/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
        );

        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-gray-600 font-medium">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
            className="inline-flex items-center px-3 py-2 text-black hover:text-yellow-900 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>

            <button 
              onClick={() => setIsWishlist(!isWishlist)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart 
                className={`w-6 h-6 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Gallery */}
            {/* Left Column - Image Gallery with Fixed Paths */}
            <div className="p-6 space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src={getImageUrl(product.images[activeImage])}
                  alt={product.description}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/src/assets/images/products/placeholder.png';
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all
                      ${activeImage === index 
                        ? 'border-blue-500 shadow-md' 
                        : 'border-gray-100 hover:border-gray-200'
                      }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/src/assets/images/products/placeholder.png';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

        
            {/* Right Column - Product Information */}
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
                    <StatusBadge
                      icon={Eye}
                      label="Visibility"
                      value={product.hidden ? 'Hidden' : 'Visible'}
                      positive={!product.hidden}
                    />
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
          </div>

          {/* Footer */}
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
        </div>
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






