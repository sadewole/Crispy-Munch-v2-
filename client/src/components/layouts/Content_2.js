import React from 'react';
import { data } from '../../content_data';

const Content_2 = () => {
  const content = data.map((data, index) => {
    return (
      <div className='col-md-4 text-center px-4' key={index}>
        <div className='card-head card-header'>
          <img
            src={data.img}
            alt={data.img}
            className='img-fluid card-img-top'
            //   style={{ width: '250px', height: '250px' }}
          />
        </div>
        <div className='card-body'>
          <h4 className='card-title'>{data.text}</h4>
          <p className='card-text'>{data.content}</p>
        </div>
      </div>
    );
  });
  return (
    <section className='tops m-auto my-5 no-gutters'>
      <div className='top-line mt-2 mb-4'>
        <h1>Fact about Crispy Munch</h1>
      </div>
      <div className='row'>{content}</div>
    </section>
  );
};

export default Content_2;
