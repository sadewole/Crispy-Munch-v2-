import React, { useEffect, useState, Fragment } from 'react';
import SearchInput from '../SearchInput';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadAllUser,
  deleteUser,
  upgradeUser
} from '../../../actions/userAction';

const UserTable = () => {
  const [openAction, setOpenAction] = useState({});
  let [cloneData, setCloneData] = useState([]);

  const {
    user: { msg, allUser, isLoading }
  } = useSelector(state => {
    return {
      error: state.error,
      user: state.user
    };
  });

  const dispatch = useDispatch();

  const openNotification = type => {
    notification[type]({
      message: msg
    });
  };

  useEffect(() => {
    dispatch(loadAllUser());

    // load food id into action. This helps to obtainsdata from handleAction
    cloneData.map(i =>
      setOpenAction({
        ...openAction,
        [i.id]: false
      })
    );
  }, [loadAllUser]);

  const handleAction = id => {
    setOpenAction({
      [id]: !openAction[id]
    });
  };

  const handleUpgrade = id => {
    dispatch(upgradeUser(id));
    openNotification('success');
  };

  const handleDelete = id => {
    dispatch(deleteUser(id));
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
          <td> {i.id} </td> <td> {i.name} </td> <td> {i.email} </td>
          <td> {i.role} </td>
          <td className='action' onClick={() => handleAction(i.id)}>
            <Link to='#' className='dropdown-toggle'>
              {' '}
              Action{' '}
            </Link>
            <div
              className={`dropdown-action ${openAction[i.id] ? 'show' : ''}`}
            >
              <a
                href='#'
                onClick={() => handleUpgrade(i.id)}
                className='dropdown-item'
              >
                Make admin
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
        originalData={allUser}
      />
      <table className='table table-responsive table-hover text-white'>
        <thead className='thead thead-dark'>
          <tr>
            <th> User id </th> <th> Name </th> <th> Email </th>
            <th> Role </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody className='tbody bg-secondary'>{output}</tbody>
      </table>
    </div>
  );
};

export default UserTable;
