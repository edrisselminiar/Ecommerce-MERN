import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

// Product Gallery for images used in ProductDetails.jsx
const ProductGallery = ({ product, getImageUrl }) => {

  // State management for image handling
  const [activeImage, setActiveImage] = useState(0); // Index of currently displayed main image
  const [loadedImages, setLoadedImages] = useState({}); // Tracks loaded images to prevent flickering
  const [imageErrors, setImageErrors] = useState({}); // Tracks failed image loads

  // START _ Handle successful image load
  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
    setImageErrors(prev => ({ ...prev, [index]: false }));
  };
  // END _ Handle successful image load


  // Handle image loading errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setLoadedImages(prev => ({ ...prev, [index]: true })); // Stop loading state
  };

  // Validation checks
  const hasValidImages = product?.images?.length > 0;
  const isMainImageLoaded = loadedImages[activeImage];
  const allThumbnailsLoaded = hasValidImages && 
    product.images.every((_, index) => loadedImages[index]);

  // Show placeholder if no images available
  if (!hasValidImages) {
    return (
      <div className="p-6">
        <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
          <ImageOff className="w-12 h-12 mb-2" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">

      {/* Main Image Container */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">

        {/* Loading skeleton */}
        {!isMainImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* START _ Error state */}
        {imageErrors[activeImage] ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageOff className="w-8 h-8 mb-2" />
            <p className="text-sm">Failed to load image</p>
          </div>
        ) : (
        /* END _ Error state */

          
          /* START _ Main image display */
          <img
            src={getImageUrl(product.images[activeImage])}
            alt={product.description || `Product view ${activeImage + 1}`}
            className={`w-full h-full object-cover transition-transform hover:scale-105 ${
              isMainImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(activeImage)}
            onError={() => handleImageError(activeImage)}
          />
          /* END _ Main image display */

        )}
      </div>

      {/* STARt _ Thumbnail Grid - Only show if multiple images */}
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative
                ${activeImage === index 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-100 hover:border-gray-200'
                }`}
              aria-label={`View image ${index + 1}`}
            >
              {/* Loading state for thumbnails */}
              {!loadedImages[index] && (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              )}

              {/* START _ Thumbnail error state */}
              {imageErrors[index] ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                  <ImageOff className="w-4 h-4" />
                </div>
              ) : (
              /* END _ Thumbnail error state */


                /* STARt _ Thumbnail image display */
                <img
                  src={getImageUrl(image)}
                  alt={`Product view ${index + 1}`}
                  className={`w-full h-full object-cover ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
                /* END _ Thumbnail image display */

              )}
            </button>
          ))}
        </div>
      )}
      {/* END _ Thumbnail Grid - Only show if multiple images */}

    </div>
  );
};

export default ProductGallery;














// import React, { useState } from 'react';
// import { ImageOff } from 'lucide-react';

// const ProductGallery = ({ product, getImageUrl }) => {
//   const [activeImage, setActiveImage] = useState(0);
//   const [loadedImages, setLoadedImages] = useState({});
//   const [imageErrors, setImageErrors] = useState({});

//   const handleImageLoad = (index) => {
//     setLoadedImages(prev => ({ ...prev, [index]: true }));
//     setImageErrors(prev => ({ ...prev, [index]: false }));
//   };

//   const handleImageError = (index) => {
//     setImageErrors(prev => ({ ...prev, [index]: true }));
//     setLoadedImages(prev => ({ ...prev, [index]: true })); // Stop loading state
//   };

//   // Check if we have any valid images
//   const hasValidImages = product?.images?.length > 0;
//   const isMainImageLoaded = loadedImages[activeImage];
//   const allThumbnailsLoaded = hasValidImages && 
//     product.images.every((_, index) => loadedImages[index]);

//   if (!hasValidImages) {
//     return (
//       <div className="p-6">
//         <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
//           <ImageOff className="w-12 h-12 mb-2" />
//           <p className="text-sm">No images available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-4">
//       {/* Main Image */}
//       <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
//         {!isMainImageLoaded && (
//           <div className="absolute inset-0 animate-pulse bg-gray-200" />
//         )}
//         {imageErrors[activeImage] ? (
//           <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
//             <ImageOff className="w-8 h-8 mb-2" />
//             <p className="text-sm">Failed to load image</p>
//           </div>
//         ) : (
//           <img
//             src={getImageUrl(product.images[activeImage])}
//             alt={product.description || `Product view ${activeImage + 1}`}
//             className={`w-full h-full object-cover transition-transform hover:scale-105 ${
//               isMainImageLoaded ? 'opacity-100' : 'opacity-0'
//             }`}
//             onLoad={() => handleImageLoad(activeImage)}
//             onError={() => handleImageError(activeImage)}
//           />
//         )}
//       </div>

//       {/* Thumbnail Grid */}
//       {product.images.length > 1 && (
//         <div className="grid grid-cols-4 gap-3">
//           {product.images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveImage(index)}
//               className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative
//                 ${activeImage === index 
//                   ? 'border-blue-500 shadow-md' 
//                   : 'border-gray-100 hover:border-gray-200'
//                 }`}
//             >
//               {!loadedImages[index] && (
//                 <div className="absolute inset-0 animate-pulse bg-gray-200" />
//               )}
//               {imageErrors[index] ? (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
//                   <ImageOff className="w-4 h-4" />
//                 </div>
//               ) : (
//                 <img
//                   src={getImageUrl(image)}
//                   alt={`Product view ${index + 1}`}
//                   className={`w-full h-full object-cover ${
//                     loadedImages[index] ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   onLoad={() => handleImageLoad(index)}
//                   onError={() => handleImageError(index)}
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGallery;


