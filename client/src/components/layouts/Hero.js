import React, { Fragment } from 'react';

const Hero = () => {
  return (
    <Fragment>
      <div class='landPagebg'>
        {/* <img src='./img/landingpagebg.jpg' alt='landing img' className='img' /> */}
        <div className='overlay'></div>
        <div class='landPagetxt'>
          <img src='./img/logo.png' alt='logo' />
          <h1> Welcome to Crispy Munch </h1>{' '}
          <h3>
            Why eating junk when <span class='cris'> Crispy Munch </span> is
            capable of enreaching your taste.We’ ve grown to include restaurants
            in many part of Africa.The most exciting part of our growth is our
            talented team that makes it all happen.Our development has helped to
            keep many safe from eating underdone food.{' '}
          </h3>
        </div>
      </div>{' '}
    </Fragment>
  );
};

export default Hero;
