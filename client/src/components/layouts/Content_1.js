import React, { Fragment } from 'react';

const Content_1 = () => {
  return (
    <Fragment>
      <section className='tops my-3 no-gutters'>
        <div className='top-line my-2'>
          <h1>Food Fun Fact</h1>
        </div>
        <div className='row mt-5 px-3'>
          <div className='col-md-6'>
            <img src='./img/mafe.jpg' alt='mafe' className='img-fluid mafe' />
          </div>
          <div className='col-md-6'>
            <p className='tips-text'>
              <em>
                We give the best of African food from around the continent.
              </em>
            </p>
            <p>
              The African continent has numerous and diverse cultures which have
              translated into its food, so we selected from the vast number to
              take you around the continent with these popular delicious
              delicacies.
            </p>
            <p>
              Mafé, known in English as groundnut stew, is an iconic traditional
              African dish, popular throughout West Africa, especially of the
              Wolof people of Senegal and Gambia with the ingredients and
              flavour varying somewhat by region. This rich stew is thickened
              with ground peanuts, which gives it a wonderful sweet-salty
              flavour. It is often made with lamb or mutton but can be made with
              chicken, fish or in a vegetarian version.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Content_1;
