import React from 'react';
import UserTable from './UserTable';
import Title from '../Title';

const AdminViewUser = () => {
  return (
    <div className='m-auto container'>
      <Title title={'Crispy Munch Users'} />
      <UserTable />
    </div>
  );
};

export default AdminViewUser;
