import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, Input, Modal, Button } from 'antd';
import { adminHistory } from '../../../content_data';

const { Option, OptGroup } = Select;

const AdminHistory = () => {
  const [visible, setVisible] = useState(false);

  const handleStatus = value => {
    console.log(`Selected ${value}`);
  };

  // useEffect(() => {
  //   // load food id into action. This helps to obtainsdata from handleAction
  //   adminHistory.map(i => setUpdateDate({ ...updateDate, [i.id]: false }));
  // }, []);

  const handleDelete = () => {
    console.log('You tried to delete something');
  };

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const output = adminHistory.map(info => {
    return (
      <tr key={info.id}>
        <td>{info.id}</td>
        <td>{info.food}</td>
        <td>{info.quantity}</td>
        <td>{info.user_id}</td>
        <td>₦{info.amount}</td>
        <td>{info.payment}</td>
        <td>
          <Select defaultValue={info.status} onChange={handleStatus}>
            <OptGroup label='Status'>
              <Option value={info.status}>{info.status}</Option>
              <Option value='processing'>Processing</Option>
              <Option value='completed'>Completed</Option>
            </OptGroup>
          </Select>
        </td>
        <td>
          <Link to='#' onClick={showModal}>
            Details
          </Link>
          <Modal
            title='More details'
            visible={visible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={[
              <Button type='primary' onClick={closeModal}>
                Ok
              </Button>
            ]}
          >
            <div>Name: Adewole Samuel</div>
            <div>Email: samueladewole15@gmail.com</div>
            <div>Address: {info.address}</div>
            <div>Phone number: {info.phone}</div>
            <div>Created date: {info.created_date}</div>
            <div>Ordered date: {info.ordered_date}</div>
            <div>Updated date: {info.updated_date}</div>
          </Modal>
        </td>
        <td onClick={handleDelete}>
          <Link to='#'>Delete</Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table className='table table-responsive table-hover admin-history-table'>
        <thead className='thead thead-dark'>
          <tr>
            <th>Order Id</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>View more</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='tbody'>{output}</tbody>
      </table>
    </div>
  );
};

export default AdminHistory;
