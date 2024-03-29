import React, { Fragment } from 'react';

const NotFound = ({ location }) => {
  const { pathname } = location;
  return (
    <Fragment>
      <div className='not-found'>
        <div className='pt-5 mt-5 container text-center text-capitalize'>
          <h1 className='mb-4'>Error, Page not Found</h1>
          <h3>
            The requested url<span className='text-danger'>{pathname}</span> is
            not available
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
