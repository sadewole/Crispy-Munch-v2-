import React from 'react';
import Title from '../Title';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const {
    auth: { user }
  } = useSelector(state => {
    return {
      auth: state.auth
    };
  });
  return (
    <div className='m-auto container'>
      <Title
        title='dashboard'
        icon='fas fa-user-alt fa-2x'
        subtitle={`Welcome ${user !== null ? user : ''}`}
      />
    </div>
  );
};

export default AdminDashboard;
