import React from 'react';

const Table = ({ output }) => (
  <table className='table table-responsive table-hover admin-history-table'>
    <thead className='thead thead-dark'>
      <tr>
        <th> Order Id </th> <th> Food </th> <th> Price </th>
        <th> Quantity </th> <th> User Email </th> <th> Amount </th>
        <th> Payment </th> <th> Status </th> <th> View more </th>
        <th> Delete </th>
      </tr>
    </thead>
    <tbody className='tbody'> {output} </tbody>
  </table>
);

export default Table;
