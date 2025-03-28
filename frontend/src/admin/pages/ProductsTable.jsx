import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from "../components/product-components/DeleteConfirmationDialog";
import { 
  Eye, Edit2, Trash2, Plus, Search, X,
  ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ProductsTable = () => {

//start _Variable

  // State variables for managing products, loading, and error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');

  // State variables for modal and editing
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // State variables for price and stock range filters
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [displayPriceRange, setDisplayPriceRange] = useState([0, 20000]); // For visual feedback
  const [stockRange, setStockRange] = useState([0, 100]);
  const [displayStockRange, setDisplayStockRange] = useState([0, 100]); // For visual feedback

  // Function to get the authentication token from local storage
  const getAuthToken = () => {
    return localStorage.getItem('token'); // or however you store your token
  };
//END _Variable

  // Fetch products from the API whenever the current page, search term, or filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, priceRange, stockRange]);


  // START _ Function to fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);  // Trigger loading state
    try { 
      const token = getAuthToken();
      const response = await fetch(
        `http://localhost:3001/api/products?page=${currentPage}&limit=10${
          searchTerm ? `&search=${searchTerm}` : ''
        }&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&minStock=${stockRange[0]}&maxStock=${stockRange[1]}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 401) {
        throw new Error('Unauthorized: Please log in as admin');
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(Number(data.currentPage));
      setTotalProducts(data.totalProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
      
      // Redirect to login if unauthorized
      if (err.message.includes('Unauthorized')) {
        navigate('/admin/login'); // Adjust the route as needed
      }
    } finally {
      setLoading(false);  // Ensure loading is always false when done
    }
  };
  // END _ Function to fetch products from the API

  
  // START _ Sync display ranges when actual ranges change externally
  useEffect(() => {
    setDisplayPriceRange(priceRange);
  }, [priceRange]);

  useEffect(() => {
    setDisplayStockRange(stockRange);
  }, [stockRange]);
  // END _ Sync display ranges when actual ranges change externally


  // START _ Update handlers to use onAfterChange for price and stock range sliders
  const handlePriceChange = (value) => {
    setDisplayPriceRange(value); // Update display during drag
  };

  const handlePriceChangeComplete = (value) => {
    setPriceRange(value); // Final update after drag
  };

  const handleStockChange = (value) => {
    setDisplayStockRange(value); // Update display during drag
  };

  const handleStockChangeComplete = (value) => {
    setStockRange(value); // Final update after drag
  };
  // END _ Update handlers to use onAfterChange for price and stock range sliders


  // START _ Function to handle search
  const handleSearch = () => {
    setSearchTerm(tempSearchTerm);
    setCurrentPage(1); // Reset to the first page when searching
  };
  // END _ Function to handle search

  // START _ Function to reset search
  const resetSearch = () => {
    setTempSearchTerm(''); // Clear the temporary search term
    setSearchTerm(''); // Clear the search term
    setCurrentPage(1); // Reset to the first page
  };
  // END _ Function to reset search

  // START _ Function to reset all filters
  const resetAllFilters = () => {
    setTempSearchTerm('');
    setSearchTerm('');
    setPriceRange([0, 20000]);
    setStockRange([0, 100]);
    setCurrentPage(1);
  };
 // END _ Function to reset all filters

  // STARt _ Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // END _ Function to handle page change

  // START _ Function to handle product deletion
  const handleDelete = async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        throw new Error('Unauthorized: Please log in as admin');
      }
      if (response.ok) {
        fetchProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        navigate('/admin/login');
      }
    }
  };
  // END _ Function to handle product deletion

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Display error message if there is an error
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Main component rendering
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* START _ Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 bg-white shadow-sm rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-900">Products Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

          {/* START _ search bar */}
          <div className="relative flex-1 sm:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
              />

              {/* START _ rest searche */}
              {tempSearchTerm && (
                <button
                  onClick={resetSearch}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              {/* END _ rest searche */}

              {/* START _ searche submit */}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Search size={18} />
              </button>
              {/* END _ searche submit */}

            </div>
          </div>
          {/* END _ search bar */}

          <div className="flex flex-col sm:flex-row gap-4">

            {/* START _ button add product  */}
            <button
              onClick={() => navigate('/dashboard/products/add')}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-sm font-medium text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </button>
            {/* END _ button add product  */}
   
            {/* START _ rest all filter */}
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-100 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Reset Filters
            </button>
            {/* END _ rest all filter */}
          </div>
         


        </div>
      </div>
      {/* START _ Header Section */}


      {/* START _ Range Sliders for Price and Stock */}
      <div className="mb-6 w-full bg-gray-50 ">

        {/* START _ Range  Price*/}
        <div className="mb-4 w-full ml-6">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className=' w-6/12'>
            <Slider
              range
              min={0}
              max={20000}
              value={displayPriceRange}
              onChange={handlePriceChange}
              onChangeComplete={handlePriceChangeComplete} // Updated prop
              trackStyle={[{ backgroundColor: '#3b82f6' }]}
              handleStyle={[
                { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
                { backgroundColor: '#3b82f6', borderColor: '#3b82f6' }
              ]}
            />
          </div>
          <div className="text-sm text-gray-500">
            MAD{displayPriceRange[0]} - MAD{displayPriceRange[1]}
          </div>
        </div>
        {/* END _ Range  Price*/}

        {/* START _ Range  Stock*/}
        <div className=' w-full ml-6'>
          <label className="block text-sm font-medium text-gray-700">Stock Range</label>
          <div className=' w-6/12'>
            <Slider
              range
              min={0}
              max={100}
              value={displayStockRange}
              onChange={handleStockChange}
              onChangeComplete={handleStockChangeComplete} // Updated prop
              trackStyle={[{ backgroundColor: '#3b82f6' }]}
              handleStyle={[
                { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
                { backgroundColor: '#3b82f6', borderColor: '#3b82f6' }
              ]}
            />
          </div>
          <div className="text-sm text-gray-500">
            {displayStockRange[0]} - {displayStockRange[1]}
          </div>
        </div>
        {/* END _ Range  Stoxk*/}

      </div>
      {/* END _ Range Sliders for Price and Stock */}

      {/* START _ Products Table */}
      <div className="overflow-x-auto relative">
        {loading && (
          <div className="loading-overlay mt-11">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
     
        <table className="min-w-full bg-white rounded-lg">
          {/* STRAT _ head */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Landing Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discounts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Garantie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          {/* END _ head */}

          {/* STRAT _ body */}
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.hidden
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {product.hidden ? 'Hidden' : 'Visible'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.onlyOnLandingPage
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                    {product.onlyOnLandingPage ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.discounts
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                    {product.discounts ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.garantie}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">

                    {/* see detail all into for product  */}
                    <button
                      onClick={() => navigate(`/dashboard/products/${product._id}`)} 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={20} />
                    </button>
                   
                    {/* go to anther fiel to edit product */}
                    <button
                      onClick={() => navigate(`/dashboard/products/edit/${product._id}`)}
                      className="inline-flex items-center px-3 py-2 text-yellow-600 hover:text-yellow-900 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    {/* popup delete product */}
                    <DeleteConfirmationDialog 
                      productId={product._id}
                      onDelete={handleDelete}
                    />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* END _ body */}

        </table>
      </div>
      {/* END _ Products Table */}

      {/* START _ Pagination Controls */}
      <div className="mt-4 flex items-center justify-between px-4">
        <div className="text-sm text-gray-700">
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalProducts)} of {totalProducts} products
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Page Numbers */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* END _ Pagination Controls */}

    </div>
  );
};

export default ProductsTable;
















