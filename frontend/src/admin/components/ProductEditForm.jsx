import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';

const ProductEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    type: '',
    onlyOnLandingPage: false,
    price: 0,
    images: [],
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

  // Get auth token function
  const getAuthToken = () => {
    return localStorage.getItem('token'); // or however you store your token
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:3001/api/products/${id}`,{
            method: 'PUT',
        
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

  console.log(response)
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'PUT',        
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body: JSON.stringify(formData),
        }
        
      );

      if (!response.ok) throw new Error('Failed to update product');
      
      const newProduct = await response.json();
      navigate(`/dashboard/products/${newProduct._id}`);
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
    } 
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm;