import React, { useEffect } from 'react';
import Hero from '../layouts/Hero';
import Content1 from '../layouts/Content_1';
import Content2 from '../layouts/Content_2';
import Footer from '../layouts/Footer';
import { useSelector } from 'react-redux';

const LandingPage = ({ history }) => {
  const {
    auth: { isAuthenticated, user }
  } = useSelector(state => {
    return {
      auth: state.auth
    };
  });

  useEffect(() => {
    // redirected if auth admin
    if (isAuthenticated && user.role === 'ADMIN') {
      history.push('/admin');
    }
  }, [isAuthenticated]);

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
