


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Import all product images
const productImages = import.meta.glob('/src/assets/images/products/*.{png,jpg,jpeg,gif}', {
  eager: true,
  as: 'url'
});

const getImageUrl = (imagePath) => {
  try {
    // Try to get local image first
    return productImages[`/src/assets/images/products/${imagePath}`] || imagePath;
  } catch (error) {
    // Fallback to the original path if local image not found
    return imagePath;
  }
};

const ProductCard = ({ images, title, price, specifications, discounts, stock }) => {
  // Calculate rating based on specifications completeness
  const rating = Object.values(specifications || {}).filter(Boolean).length / 9 * 5;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-12/12 my-3">
      <div className="relative">
        {discounts && (
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-medium">
            Sale
          </div>
        )}
        <img 
          src={getImageUrl(images[0])} 
          alt={title} 
          className="w-full h-48 object-contain mb-4"
          onError={(e) => {
            e.target.src = '/api/placeholder/200/200'; // Fallback image
          }}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
            />
          ))}
        </div>
        <h3 className="font-medium text-sm h-10 line-clamp-2">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">${price.toFixed(2)}</span>
        </div>
        {stock < 11 && (
          <p className="text-red-600 text-sm">Only {stock} left in stock!</p>
        )}
        {specifications?.processor && (
          <p className="text-gray-600 text-sm line-clamp-1">
            {specifications.processor}
          </p>
        )}
      </div>
    </div>
  );
};

const ProductSection = ({ category, endpoint }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

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
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1/5 animate-pulse">
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

  if (error) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{category}</h2>
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{category}</h2>
        <div className="bg-yellow-50 p-4 rounded-lg text-yellow-600">
          No products available in this category
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 w-11/12 mx-auto bg-slate-300">
      <h2 className="text-2xl font-bold mb-6">{category}</h2>
      <div className="relative w-full">
        <div className="absolute left-0  top-1/2 -translate-y-1/2 -ml-4 z-10">
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
            className="flex transition-transform duration-300 ease-in-out gap-4 "
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {products.map((product) => (
              <div key={product._id} className="flex-none w-[18.9%]">
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

      <div className="text-center mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto">
          See all deals <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const HeroProductSlider = () => {
  const categories = [
    { name: 'Laptops', endpoint: 'laptops' },
    { name: 'Desktops', endpoint: 'desktops' },
    { name: 'Components', endpoint: 'components' },
    { name: 'Peripherals', endpoint: 'peripherals' }
  ];

  return (
    <div className="max-w-full mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold text-navy-900 mb-8">Today's Best Deals</h1>
      {categories.map((category) => (
        <ProductSection
          key={category.endpoint}
          category={category.name}
          endpoint={category.endpoint}
        />
      ))}
    </div>
  );
};

export default HeroProductSlider;

















// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// const ProductCard = ({ 
//   images, 
//   description, 
//   price, 
//   discounts,
//   Marke,
//   stock,
//   specifications 
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full">
//       <div className="relative">
//         {discounts && (
//           <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-medium">
//             Sale
//           </div>
//         )}
//         <img 
//           src={images[0] || "/api/placeholder/200/200"} 
//           alt={description} 
//           className="w-full h-48 object-contain mb-4"
//         />
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center">
//           <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//           <span className="text-gray-600 text-sm ml-2">In Stock: {stock}</span>
//         </div>
//         <h3 className="font-medium text-sm h-10 line-clamp-2">{description}</h3>
//         <div className="flex items-baseline space-x-2">
//           <span className="text-xl font-bold">${price}</span>
//         </div>
//         {Marke && (
//           <p className="text-green-600 text-sm">Brand: {Marke}</p>
//         )}
//         {specifications?.processor && (
//           <p className="text-gray-600 text-sm line-clamp-1">
//             {specifications.processor}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const ProductSection = ({ category, apiEndpoint }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:3001/api/products/landing/${apiEndpoint}`);
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         setProducts(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [apiEndpoint]);

//   const canScrollLeft = currentIndex > 0;
//   const canScrollRight = products.length > itemsPerPage && currentIndex < products.length - itemsPerPage;

//   const handlePrevious = () => {
//     if (canScrollLeft) {
//       setCurrentIndex(prev => Math.max(0, prev - 1));
//     }
//   };

//   const handleNext = () => {
//     if (canScrollRight) {
//       setCurrentIndex(prev => Math.min(products.length - itemsPerPage, prev + 1));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">{category}</h2>
//         <div className="grid grid-cols-5 gap-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">{category}</h2>
//         <div className="bg-red-50 p-4 rounded-lg">
//           <p className="text-red-600">Error loading products: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">{category}</h2>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-600">No products available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">{category}</h2>
//       <div className="relative">
//         <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
//           <button
//             onClick={handlePrevious}
//             disabled={!canScrollLeft}
//             className={`p-2 rounded-full shadow-lg ${
//               canScrollLeft 
//                 ? 'bg-white hover:bg-gray-100 text-gray-800' 
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="overflow-hidden">
//           <div 
//             className="flex transition-transform duration-300 ease-in-out gap-4"
//             style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
//           >
//             {products.map((product) => (
//               <div key={product._id} className="flex-none w-1/5">
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
//           <button
//             onClick={handleNext}
//             disabled={!canScrollRight}
//             className={`p-2 rounded-full shadow-lg ${
//               canScrollRight 
//                 ? 'bg-white hover:bg-gray-100 text-gray-800' 
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       <div className="text-center mt-6">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto">
//           See all deals <ChevronRight className="ml-2 h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const HeroProductSlider = () => {
//   const sections = [
//     { category: 'Laptops', endpoint: 'laptops' },
//     { category: 'Desktops', endpoint: 'desktops' },
//     { category: 'Components', endpoint: 'components' },
//     { category: 'Peripherals', endpoint: 'peripherals' }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-8">
//       <h1 className="text-3xl font-bold text-navy-900 mb-8">Today's Best Deals</h1>
//       {sections.map(({ category, endpoint }) => (
//         <ProductSection
//           key={category}
//           category={category}
//           apiEndpoint={endpoint}
//         />
//       ))}
//     </div>
//   );
// };

// export default HeroProductSlider;




























// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// const ProductCard = ({ image, title, price, rating, reviews, discount, originalPrice, offer }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full ">
//       <div className="relative">
//         {discount && (
//           <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-medium">
//             {discount}% off
//           </div>
//         )}
//         <img 
//           src={image} 
//           alt={title} 
//           className="w-full h-48 object-contain mb-4"
//         />
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
//             />
//           ))}
//           <span className="text-gray-600 text-sm ml-2">({reviews})</span>
//         </div>
//         <h3 className="font-medium text-sm h-10 line-clamp-2">{title}</h3>
//         <div className="flex items-baseline space-x-2">
//           <span className="text-xl font-bold">${price}</span>
//           {originalPrice && (
//             <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
//           )}
//         </div>
//         {offer && (
//           <p className="text-green-600 text-sm">{offer}</p>
//         )}
//       </div>
//     </div>
//   );
// };


// const ProductSection = ({ category, products }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 5;

//   const canScrollLeft = currentIndex > 0;
//   const canScrollRight = currentIndex < products.length - itemsPerPage;

//   const handlePrevious = () => {
//     if (canScrollLeft) {
//       setCurrentIndex(prev => Math.max(0, prev - 1));
//     }
//   };

//   const handleNext = () => {
//     if (canScrollRight) {
//       setCurrentIndex(prev => Math.min(products.length - itemsPerPage, prev + 1));
//     }
//   };

//   return (
//     <div className="mb-12">
//       <h2 className="text-2xl font-bold mb-6">{category}</h2>
//       <div className="relative">
//         <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
//           <button
//             onClick={handlePrevious}
//             disabled={!canScrollLeft}
//             className={`p-2 rounded-full shadow-lg ${
//               canScrollLeft 
//                 ? 'bg-white hover:bg-gray-100 text-gray-800' 
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="overflow-hidden">
//           <div 
//             className="flex transition-transform duration-300 ease-in-out gap-4"
//             style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
//           >
//             {products.map((product, index) => (
//               <div key={index} className="flex-none w-1/5">
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
//           <button
//             onClick={handleNext}
//             disabled={!canScrollRight}
//             className={`p-2 rounded-full shadow-lg ${
//               canScrollRight 
//                 ? 'bg-white hover:bg-gray-100 text-gray-800' 
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       <div className="text-center mt-6">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mx-auto">
//           See all deals <ChevronRight className="ml-2 h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// };




// const HeroProductSlider = () => {
//   const categories = ['Laptops', 'Desktops', 'Components', 'Peripherals'];
  
//   // Sample products data
//   const sampleProducts = [
//     {
//       image: "/api/placeholder/200/200",
//       title: "ABS Eurus Aqua Gaming PC - Intel i7 14700KF - GeForce RTX 4070",
//       price: 1799.99,
//       originalPrice: 2299.99,
//       rating: 4.5,
//       reviews: 34,
//       discount: 21,
//       offer: "Get Intel Holiday Bundle w/ purchase"
//     },
//     {
//       image: "/api/placeholder/200/200",
//       title: "Lenovo IdeaPad Flex 5 16IAU7 2-in-1 Laptop Intel Core i7-1255U",
//       price: 649.99,
//       originalPrice: 899.99,
//       rating: 4,
//       reviews: 78,
//       discount: 27,
//       offer: "12% off ($75 max) paying w/ Zip"
//     },
//     {
//       image: "/api/placeholder/200/200",
//       title: "GIGABYTE X870E AORUS PRO AM5 LGA 1718, ATX, DDR5",
//       price: 359.99,
//       originalPrice: 399.99,
//       rating: 4.5,
//       reviews: 107,
//       discount: null,
//       offer: "Free 32GB Corsair memory w/ purchase"
//     },
//     {
//       image: "/api/placeholder/200/200",
//       title: "GIGABYTE Z790 S WIFI DDR4 LGA 1700 Intel Z790 ATX",
//       price: 129.99,
//       originalPrice: 179.99,
//       rating: 3.5,
//       reviews: 5,
//       discount: 27,
//       offer: "Free DDR4 16G RGB Kit with purchase"
//     }
//   ];

//   // Create 10 items for each category by duplicating and modifying sample products
//   const products = Array.from({ length: 10 }, (_, i) => ({
//     ...sampleProducts[i % sampleProducts.length],
//     id: i,  // Add unique id
//   }));

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-8">
//       <h1 className="text-3xl font-bold text-navy-900 mb-8">Today's Best Deals</h1>
//       {categories.map((category) => (
//         <ProductSection
//           key={category}
//           category={category}
//           products={products}
//         />
//       ))}
//     </div>
//   );
// };

// export default HeroProductSlider;