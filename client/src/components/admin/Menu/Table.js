import React from 'react';

const Table = ({ output }) => (
  <table className='table table-responsive table-hover foodTable'>
    <thead className='thead thead-dark'>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Created Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className='tbody'>{output}</tbody>
  </table>
);

export default Table;
