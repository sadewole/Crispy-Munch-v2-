import React from 'react';
import PostFood from './PostFood';
import FoodTable from './FoodTable';
import Title from '../Title';

const AdminMenu = () => {
  return (
    <div className='container'>
      <Title title={'Food Catalog'} />
      <PostFood />
      <div className='m-auto'>
        <FoodTable />
      </div>
    </div>
  );
};

export default AdminMenu;
