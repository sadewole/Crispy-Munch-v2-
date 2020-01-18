import React from 'react';
import Title from '../Title';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const {
    auth: { user },
    order: {total}
  } = useSelector(state => {
    return {
      auth: state.auth,
      order: state.order
    };
  });
  return (
    <div className='m-auto container'>
      <Title
        title='dashboard'
        icon='fas fa-user-alt fa-2x'
        subtitle={`Welcome ${user !== null ? user.name : ''}`}
      />
    </div>
  );
};

export default AdminDashboard;
