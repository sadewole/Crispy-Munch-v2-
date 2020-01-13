import React from 'react';

const Title = ({ title, icon, subtitle }) => {
  return (
    <div>
      <h1 className='title text-capitalize cris'>{title}</h1>
      <p className='lead muted text-capitalize text-white'>
        <span className='mr-2'>
          <i className={icon}></i>
        </span>
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
