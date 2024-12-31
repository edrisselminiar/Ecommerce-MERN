import React from 'react';
import ProductSection from './ProductSection';

const HeroProductSlider = () => {
  const categories = [
    { name: 'Laptops', endpoint: 'laptops' },
    { name: 'Desktops', endpoint: 'desktops' },
    { name: 'Components', endpoint: 'components' },
    { name: 'Peripherals', endpoint: 'peripherals' }
  ];

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
// import ProductSection from './ProductSection';
// import { fetchLandingPageProducts } from '../services/productService';

// const ProductSlider = () => {
//   const categories = ['Laptops', 'Desktops', 'Components', 'Peripherals'];
//   const [productsData, setProductsData] = useState({});
//   const [loading, setLoading] = useState({});
//   const [error, setError] = useState({});

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       for (const category of categories) {
//         setLoading(prev => ({ ...prev, [category]: true }));
//         try {
//           const products = await fetchLandingPageProducts(category);
//           setProductsData(prev => ({ ...prev, [category]: products }));
//         } catch (err) {
//           setError(prev => ({ ...prev, [category]: err.message }));
//         } finally {
//           setLoading(prev => ({ ...prev, [category]: false }));
//         }
//       }
//     };

//     fetchAllProducts();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-8">
//       <h1 className="text-3xl font-bold text-navy-900 mb-8">Today's Best Deals</h1>
//       {categories.map((category) => (
//         <ProductSection
//           key={category}
//           category={category}
//           products={productsData[category] || []}
//           loading={loading[category]}
//           error={error[category]}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductSlider;