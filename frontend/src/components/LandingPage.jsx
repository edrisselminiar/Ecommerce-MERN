import React from 'react';
import Header from './Header';
import HeroProductSliderr from './HeroProductSliderr';
// import ProductSliderr from './HeroProductSliderr';
import HeroProductSlider from './HeroProductSlider';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroProductSlider />
    </div>
  );
};

export default LandingPage;
