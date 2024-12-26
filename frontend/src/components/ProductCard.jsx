import React from 'react';
import { Star } from 'lucide-react';


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
  const rating = Object.values(specifications || {}).filter(Boolean).length / 9 * 5;
  
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full ">
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
            e.target.src = '/api/placeholder/200/200';
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

export default ProductCard;









// import React from 'react';
// import { Star } from 'lucide-react';

// const ProductCard = ({ 
//   images, 
//   description, 
//   price, 
//   rating = 4, 
//   reviews = 0, 
//   discounts, 
//   originalPrice, 
//   offer 
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full">
//       <div className="relative">
//         {discounts && (
//           <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-medium">
//             {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
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
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
//             />
//           ))}
//           <span className="text-gray-600 text-sm ml-2">({reviews})</span>
//         </div>
//         <h3 className="font-medium text-sm h-10 line-clamp-2">{description}</h3>
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

