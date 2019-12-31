import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import SearchInput from '../SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMenu,
  deleteMenu,
  updateMenu,
  getSingleMenu
} from '../../../actions/catalogAction';
import { Spin, notification } from 'antd';

const FoodTable = () => {
  const [openAction, setOpenAction] = useState({});
  let [cloneData, setCloneData] = useState([]);
  const dispatch = useDispatch();
  const {
    menu: { data, isLoading, msg }
  } = useSelector(state => {
    return {
      error: state.error,
      menu: state.menu
    };
  });

  const openNotification = type => {
    notification[type]({
      message: msg
    });
  };

  useEffect(() => {
    dispatch(fetchMenu());
    // load food id into action. This helps to obtainsdata from handleAction
    cloneData.map(i => setOpenAction({ ...openAction, [i.id]: false }));
  }, [fetchMenu]);

  const handleAction = id => {
    setOpenAction({ [id]: !openAction[id] });
  };

  const handleEdit = id => {
    dispatch(getSingleMenu(id));
    // openNotification('success');
  };

  const handleDelete = id => {
    dispatch(deleteMenu(id));
    openNotification('success');
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
          <td>
            <Moment format='YYYY/MM/DD'>{i.updatedAt}</Moment>
          </td>
          <td className='action' onClick={() => handleAction(i.id)}>
            <p className='dropdown-toggle'>Action</p>
            <div
              className={`dropdown-action ${openAction[i.id] ? 'show' : ''}`}
            >
              <a
                href='#'
                onClick={() => handleEdit(i.id)}
                className='dropdown-item'
              >
                Edit
              </a>
              <a
                href='#'
                onClick={() => handleDelete(i.id)}
                className='dropdown-item'
              >
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
        <td colSpan='5' className='text-center'>
          No Data
        </td>
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
