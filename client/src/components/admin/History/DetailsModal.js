import React from 'react';
import { Modal, Button } from 'antd';

const DetailsModal = ({ visible, closeModal, singleOrder }) => (
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
    <div> Name: {singleOrder[0].user.name} </div>
    <div> Email: {singleOrder[0].user.email} </div>
    <div> Address: {singleOrder[0].address} </div>
    <div> Phone number: {singleOrder[0].phone} </div>
    <div> Created date: {singleOrder[0].createdAt} </div>
    <div> Ordered date: {singleOrder[0].orderedDate} </div>
    <div> Updated date: {singleOrder[0].updatedAt} </div>
  </Modal>
);

export default DetailsModal;
