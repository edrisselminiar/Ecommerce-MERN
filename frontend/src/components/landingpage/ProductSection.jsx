// ProductSection.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductSection = ({ category, endpoint }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Responsive items per page
  const getItemsPerPage = () => {
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 1024) return 3; // Tablet
    return 5; // Desktop
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0); // Reset position on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/products/landing/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < (products.length - itemsPerPage);

  const handlePrevious = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(products.length - itemsPerPage, prev + 1));
    }
  };

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{category}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{category}</h2>
        <div className={`p-4 rounded-lg ${error ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>
          {error ? `Error loading products: ${error}` : 'No products available in this category'}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-20 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-6 w-full mt-4">{category}</h2>
      <div className="relative w-full">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
          <button
            onClick={handlePrevious}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full shadow-lg ${
              canScrollLeft 
                ? 'bg-white hover:bg-gray-100 text-gray-800' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-hidden w-full p-14">
          <div 
            className="flex transition-transform duration-300 ease-in-out gap-1 sm:gap-4"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {products.map((product) => (
              <div 
                key={product._id} 
                className="flex-none w-full sm:w-[29%] lg:w-[18.9%]"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className={`p-2 rounded-full shadow-lg ${
              canScrollRight 
                ? 'bg-white hover:bg-gray-100 text-gray-800' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="text-center w-full">
        <button className=" bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex float-right items-center  mx-auto ">
          See all deals <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default ProductSection;



