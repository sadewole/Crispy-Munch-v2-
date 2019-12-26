import React from 'react';
import PostFood from './PostFood';
import SearchInput from '../SearchInput';
import FoodTable from './FoodTable';

const AdminMenu = () => {
  return (
    <div className='container'>
      <PostFood />
      <div className='m-auto'>
        {/* <SearchInput /> */}
        <FoodTable />
      </div>
    </div>
  );
};

export default AdminMenu;
