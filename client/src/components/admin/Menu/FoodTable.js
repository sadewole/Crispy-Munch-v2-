import React, { Fragment, useState, useEffect, useCallback } from 'react';
import SearchInput from '../SearchInput';
import { catalogData } from '../../../content_data';

const FoodTable = () => {
  let output;
  const [openAction, setOpenAction] = useState({});
  let [cloneData, setCloneData] = useState([]);

  useEffect(() => {
    setCloneData(catalogData);
    // load food id into action. This helps to obtainsdata from handleAction
    cloneData.map(i => setOpenAction({ ...openAction, [i.id]: false }));
  }, []);

  const handleAction = id => {
    setOpenAction({ [id]: !openAction[id] });
  };

  const handleEdit = () => {
    console.log('edit handler');
  };

  const handleDelete = () => {
    console.log('delete handler');
  };

  if (cloneData !== undefined) {
    output = cloneData.map(i => {
      return (
        <tr key={i.id}>
          <td>
            <img
              src=''
              alt='default image'
              style={{ width: '50px', height: '50px' }}
            />
          </td>
          <td>{i.name}</td>
          <td>{i.price}</td>
          <td>{i.date}</td>
          <td className='action' onClick={() => handleAction(i.id)}>
            <a href='#' className='dropdown-toggle'>
              Action
            </a>
            <div
              className={`dropdown-action ${openAction[i.id] ? 'show' : ''}`}
            >
              <a href='#' onClick={handleEdit} className='dropdown-item'>
                Edit
              </a>
              <a href='#' onClick={handleDelete} className='dropdown-item'>
                Delete
              </a>
            </div>
          </td>
        </tr>
      );
    });
  } else {
    output = <>Stay</>;
  }

  return (
    <div>
      <SearchInput
        cloneData={cloneData}
        setCloneData={setCloneData}
        originalData={catalogData}
      />
      {/* Table */}
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
    </div>
  );
};

export default FoodTable;
