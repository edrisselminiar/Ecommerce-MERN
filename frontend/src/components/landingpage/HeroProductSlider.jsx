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