import React from 'react';

const Table = ({ output }) => (
  <table className='table table-responsive table-hover text-white'>
    <thead className='thead thead-dark'>
      <tr>
        <th> User id </th>
        <th> Name </th>
        <th> Email </th>
        <th> Role </th>
        <th> Action </th>
      </tr>
    </thead>
    <tbody className='tbody bg-secondary'>{output}</tbody>
  </table>
);

export default Table;
