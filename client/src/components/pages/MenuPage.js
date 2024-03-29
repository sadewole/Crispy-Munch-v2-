import React, { Fragment, useEffect } from 'react';
import FoodLayout from '../layouts/FoodLayout';
import Footer from '../layouts/Footer';
import { useSelector } from 'react-redux';

const MenuPage = ({history}) => {
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
  }, [isAuthenticated, history, user]);

  return (
    <Fragment>
      <div className='menu-bg'></div>
      <section className='menu-section'>
        <div className='custom-menu1'>
          <h1 className='menu-cris'>Crispy Munch</h1>
          <img src='img/custom-img/food1.jpg' alt='' className='img-resize' />
          <img src='img/custom-img/food.jpg' alt='' className='img-resize' />
        </div>

        <div className='custom-menu2'>
          <h4>Food Catalog</h4>
          <div className='food-menu'>
            <FoodLayout />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default MenuPage;
