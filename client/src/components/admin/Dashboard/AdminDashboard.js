import React from 'react';
import Title from '../Title';

const AdminDashboard = () => {
  return (
    <div className='m-auto container'>
      <Title
        title='dashboard'
        icon='fas fa-user-alt fa-2x'
        subtitle={'Welcome John Doe'}
      />
    </div>
  );
};

export default AdminDashboard;
