import React, { Fragment } from 'react';

const Hero = () => {
  return (
    <Fragment>
      <div className='landPagebg'>
        {/* <img src='./img/landingpagebg.jpg' alt='landing img' className='img' /> */}
        <div className='overlay'>
          <div className='section-a-inner'>
            <img src='./img/logo.png' alt='logo' className='logo' />
            <h3> Welcome to Crispy Munch </h3>{' '}
            <p className='hide-sm'>
              Why eating junk when <span className='cris'> Crispy Munch </span>{' '}
              is capable of enreaching your taste.We’ ve grown to include
              restaurants in many part of Africa.The most exciting part of our
              growth is our talented team that makes it all happen.Our
              development has helped to keep many safe from eating underdone
              food.{' '}
            </p>
          </div>
        </div>
      </div>{' '}
    </Fragment>
  );
};

export default Hero;
