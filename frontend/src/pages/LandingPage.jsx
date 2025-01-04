import React from 'react';

import Header from '../components/layout/Header';
import HeroProductSlider from '../components/landingpage/HeroProductSlider';

const LandingPage = () => {
  
  return (
    <div className="min-h-screen">
      <Header />
      <HeroProductSlider />
    </div>
  );
};

export default LandingPage;
