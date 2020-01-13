import React from 'react';
import Title from '../Title';
<<<<<<< HEAD
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const {
    auth: { user }
  } = useSelector(state => {
    return {
      auth: state.auth
    };
  });
=======

const AdminDashboard = () => {
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
  return (
    <div className='m-auto container'>
      <Title
        title='dashboard'
        icon='fas fa-user-alt fa-2x'
<<<<<<< HEAD
        subtitle={`Welcome ${user !== null ? user : ''}`}
=======
        subtitle={'Welcome John Doe'}
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
      />
    </div>
  );
};

export default AdminDashboard;
