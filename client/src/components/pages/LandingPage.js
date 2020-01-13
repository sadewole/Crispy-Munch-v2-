<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React from 'react';
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
import Hero from '../layouts/Hero';
import Content1 from '../layouts/Content_1';
import Content2 from '../layouts/Content_2';
import Footer from '../layouts/Footer';
<<<<<<< HEAD
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

=======

const LandingPage = () => {
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
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
