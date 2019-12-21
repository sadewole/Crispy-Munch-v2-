import React from 'react';
import Hero from '../layouts/Hero';
import Content1 from '../layouts/Content_1';
import Content2 from '../layouts/Content_2';
import Footer from '../layouts/Footer';

const LandingPage = () => {
  return (
    <div className='container-fluid no-gutters overflow-landing'>
      <Hero />
      <div className='container'>
        <Content2 />
      </div>
      <Content1 />
      <Footer />
    </div>
  );
};

export default LandingPage;
