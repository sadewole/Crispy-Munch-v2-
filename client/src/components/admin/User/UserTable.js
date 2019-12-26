import React, { useEffect, useState } from 'react';
import SearchInput from '../SearchInput';
import { userData } from '../../../content_data';
import { Link } from 'react-router-dom';

const UserTable = () => {
  let output;
  const [openAction, setOpenAction] = useState({});
  let [cloneData, setCloneData] = useState([]);

  useEffect(() => {
    setCloneData(userData);
    // load food id into action. This helps to obtainsdata from handleAction
    cloneData.map(i => setOpenAction({ ...openAction, [i.id]: false }));
  }, []);

  const handleAction = id => {
    setOpenAction({ [id]: !openAction[id] });
  };

  const handleUpgrade = () => {
    console.log('Are you sure you want to upgrade user');
  };

  const handleDelete = () => {
    console.log('You want to delete user');
  };

  if (cloneData !== undefined) {
    output = cloneData.map((i, index) => {
      return (
        <tr key={index}>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.email}</td>
          <td>{i.role}</td>
          <td className='action' onClick={() => handleAction(i.id)}>
            <Link className='dropdown-toggle'>Action</Link>
            <div
              className={`dropdown-action ${openAction[i.id] ? 'show' : ''}`}
            >
              <a href='#' onClick={handleUpgrade} className='dropdown-item'>
                Make admin
              </a>
              <a href='#' onClick={handleDelete} className='dropdown-item'>
                Delete
              </a>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <SearchInput
        cloneData={cloneData}
        setCloneData={setCloneData}
        originalData={userData}
      />
      <table className='table table-responsive table-hover text-white'>
        <thead className='thead thead-dark'>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='tbody bg-secondary'>{output}</tbody>
      </table>
    </div>
  );
};

export default UserTable;
