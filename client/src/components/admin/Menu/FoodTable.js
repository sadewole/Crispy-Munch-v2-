import React, { Fragment, useState, useEffect } from 'react';
import SearchInput from '../SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../../../actions/catalogAction';
import { Spin } from 'antd';

const FoodTable = () => {
  const [openAction, setOpenAction] = useState({});
  let [cloneData, setCloneData] = useState([]);
  const dispatch = useDispatch();
  const {
    error,
    menu: { data, isLoading }
  } = useSelector(state => {
    return {
      error: state.error,
      menu: state.menu
    };
  });
  // access data to clone
  if(data){
    setCloneData(data)
 // load food id into action. This helps to obtainsdata from handleAction
 cloneData.map(i => setOpenAction({ ...openAction, [i.id]: false }));
  }
  useEffect(() => {
    dispatch(fetchMenu());
   
  }, [fetchMenu]);

  const handleAction = id => {
    setOpenAction({ [id]: !openAction[id] });
  };

  const handleEdit = () => {
    console.log('edit handler');
  };

  const handleDelete = () => {
    console.log('delete handler');
  };

  // return table body
 const output = isLoading ? (
    <Fragment>
      <tr>
        <td colSpan='5' className='text-center'>
          <Spin size='large' tip='Loading' />
        </td>
      </tr>
    </Fragment>
  ) : cloneData !== undefined ? (
    cloneData.map(i => {
      return (
        <tr key={i.id}>
          <td>
            <img
              src={i.image}
              alt='default image'
              style={{ width: '50px', height: '50px' }}
            />
          </td>
          <td>{i.name}</td>
          <td>{i.price}</td>
          <td>{i.updatedAt}</td>
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
    })
  ) : (
    <Fragment>
      <tr>
        <td colSpan='5' className="text-center">No Data</td>
      </tr>
    </Fragment>
  );

  return (
    <div>
      <SearchInput
        cloneData={cloneData}
        setCloneData={setCloneData}
        originalData={data}
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
