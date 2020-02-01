import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import SearchInput from '../SearchInput';
import Table from './Table';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMenu,
  deleteMenu,
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

  useEffect(() => {
    dispatch(fetchMenu());
    // load food id into action. This helps to obtains data from handleAction
    cloneData.map(i => setOpenAction({ ...openAction, [i.id]: false }));
  }, []);

  const openNotification = type => {
    notification[type]({
      message: msg
    });
  };

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
  ) : cloneData.length >= 1 ? (
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
            <p className='details dropdown-toggle'>Action</p>
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
          Food menu is empty
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
      <Table output={output} />
    </div>
  );
};

export default FoodTable;
