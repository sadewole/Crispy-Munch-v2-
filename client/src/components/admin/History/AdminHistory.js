import React from 'react';
import HistoryTable from './HistoryTable';
import Title from '../Title';

const AdminHistory = () => {
  return (
    <div className='m-auto container'>
      <Title title={'Food Catalog'} />
      <HistoryTable />
    </div>
  );
};

export default AdminHistory;
