import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Select, Spin } from 'antd';
import DetailsModal from './DetailsModal';
import Table from './Table';
import {
  getAllOrder,
  getSingleOrder,
  deleteOrder,
  updateOrderStatus
} from '../../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';

const { Option, OptGroup } = Select;

const AdminHistory = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    order: { orders, isLoading, singleOrder }
  } = useSelector(state => {
    return {
      error: state.error,
      order: state.order
    };
  });

  const handleStatus = (value, id) => {
    // dispatch status to API
    dispatch(updateOrderStatus(value, id));
  };

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  const showModal = id => {
    setVisible(true);
    dispatch(getSingleOrder(id));
  };

  const closeModal = () => {
    setVisible(false);
  };

  const output = isLoading ? (
    <Fragment>
      <tr>
        <td colSpan='10' className='text-center'>
          <Spin size='large' tip='Loading....' />
        </td>
      </tr>
    </Fragment>
  ) : orders !== undefined ? (
    orders.map(info => {
      return (
        <tr key={info.id}>
          <td> {info.id} </td> <td> {info.food.name} </td>
          <td> {info.food.price} </td> <td> {info.quantity} </td>
          <td> {info.email} </td> <td> ₦{info.amount} </td>
          <td> {info.payment} </td>
          <td>
            <Select
              defaultValue={info.status}
              onChange={value => handleStatus(value, info.id)}
            >
              <OptGroup label='Status'>
                <Option value={info.status}> {info.status} </Option>
                <Option value='processing'> Processing </Option>
                <Option value='completed'> Completed </Option>
              </OptGroup>
            </Select>
          </td>
          <td>
            <p className='details' onClick={() => showModal(info.id)}>
              Details
            </p>
          </td>
          <td onClick={() => dispatch(deleteOrder(info.id))}>
            <Link to='#'> Delete </Link>
          </td>
        </tr>
      );
    })
  ) : (
    <Fragment>
      <tr>
        <td colSpan='10' className='text-center'>
          No food has been ordered
        </td>
      </tr>
    </Fragment>
  );

  return (
    <Fragment>
      {singleOrder !== null ? (
        <DetailsModal
          visible={visible}
          closeModal={closeModal}
          singleOrder={singleOrder}
        />
      ) : null}
      <Table output={output} />
    </Fragment>
  );
};

export default AdminHistory;
