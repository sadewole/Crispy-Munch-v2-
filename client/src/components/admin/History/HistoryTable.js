import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Select, Modal, Button, Spin } from 'antd';
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
<<<<<<< HEAD
    // console.log(true);
=======
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
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
          <Spin size='large' tip='Loading...' />
<<<<<<< HEAD
        </td>{' '}
      </tr>{' '}
=======
        </td>
      </tr>
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
    </Fragment>
  ) : orders !== 'undefined' ? (
    orders.map(info => {
      return (
        <tr key={info.id}>
<<<<<<< HEAD
          <td> {info.id} </td> <td> {info.food.name} </td>{' '}
          <td> {info.food.price} </td> <td> {info.quantity} </td>{' '}
          <td> {info.email} </td> <td> ₦{info.amount} </td>{' '}
          <td> {info.payment} </td>{' '}
=======
          <td>{info.id}</td>
          <td>{info.food.name}</td>
          <td>{info.food.price}</td>
          <td>{info.quantity}</td>
          <td>{info.user_id}</td>
          <td>₦{info.amount}</td>
          <td>{info.payment}</td>
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
          <td>
            <Select
              defaultValue={info.status}
              onChange={value => handleStatus(value, info.id)}
            >
              <OptGroup label='Status'>
<<<<<<< HEAD
                <Option value={info.status}> {info.status} </Option>{' '}
                <Option value='processing'> Processing </Option>{' '}
                <Option value='completed'> Completed </Option>{' '}
              </OptGroup>{' '}
            </Select>{' '}
          </td>{' '}
          <td>
            <Link to='#' onClick={() => showModal(info.id)}>
              Details{' '}
            </Link>{' '}
          </td>{' '}
          <td onClick={() => dispatch(deleteOrder(info.id))}>
            <Link to='#'> Delete </Link>{' '}
          </td>{' '}
=======
                <Option value={info.status}>{info.status}</Option>
                <Option value='processing'>Processing</Option>
                <Option value='completed'>Completed</Option>
              </OptGroup>
            </Select>
          </td>
          <td>
            <Link to='#' onClick={() => showModal(info.id)}>
              Details
            </Link>
          </td>
          <td onClick={() => dispatch(deleteOrder(info.id))}>
            <Link to='#'>Delete</Link>
          </td>
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
        </tr>
      );
    })
  ) : (
    <Fragment>
      <tr>
        <td colSpan='10' className='text-center'>
<<<<<<< HEAD
          No Data{' '}
        </td>{' '}
      </tr>{' '}
=======
          No Data
        </td>
      </tr>
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
    </Fragment>
  );

  return (
    <Fragment>
<<<<<<< HEAD
      {' '}
=======
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
      {singleOrder !== null ? (
        <Modal
          title='More details'
          visible={visible}
          onOk={closeModal}
          onCancel={closeModal}
          footer={[
            <Button type='primary' onClick={closeModal}>
<<<<<<< HEAD
              Ok{' '}
            </Button>
          ]}
        >
          <div> Name: {singleOrder[0].user.name} </div>{' '}
          <div> Email: {singleOrder[0].user.email} </div>{' '}
          <div> Address: {singleOrder[0].address} </div>{' '}
          <div> Phone number: {singleOrder[0].phone} </div>{' '}
          <div> Created date: {singleOrder[0].createdAt} </div>{' '}
          <div> Ordered date: {singleOrder[0].orderedDate} </div>{' '}
          <div> Updated date: {singleOrder[0].updatedAt} </div>{' '}
        </Modal>
      ) : null}
      <table className='table table-responsive table-hover admin-history-table'>
        <thead className='thead thead-dark'>
          <tr>
            <th> Order Id </th> <th> Food </th> <th> Price </th>{' '}
            <th> Quantity </th> <th> User Id </th> <th> Amount </th>{' '}
            <th> Payment </th> <th> Status </th> <th> View more </th>{' '}
            <th> Delete </th>{' '}
          </tr>{' '}
        </thead>{' '}
        <tbody className='tbody'> {output} </tbody>{' '}
      </table>{' '}
=======
              Ok
            </Button>
          ]}
        >
          <div>Name:{singleOrder[0].user.name}</div>
          <div>Email: {singleOrder[0].user.email}</div>
          <div>Address: {singleOrder[0].address}</div>
          <div>Phone number: {singleOrder[0].phone}</div>
          <div>Created date: {singleOrder[0].createdAt}</div>
          <div>Ordered date: {singleOrder[0].orderedDate}</div>
          <div>Updated date: {singleOrder[0].updatedAt}</div>
        </Modal>
      ) : null}

      <table className='table table-responsive table-hover admin-history-table'>
        <thead className='thead thead-dark'>
          <tr>
            <th>Order Id</th>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>View more</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>{output}</tbody>
      </table>
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
    </Fragment>
  );
};

export default AdminHistory;
