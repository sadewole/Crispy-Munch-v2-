import React from 'react';
import { Modal, Button } from 'antd';

const VerifyModal = ({ msg, closeModal, visible }) => (
  <Modal
    title={msg}
    visible={visible}
    onOk={closeModal}
    onCancel={closeModal}
    footer={[
      <Button type='primary' key='1' onClick={closeModal}>
        Ok
      </Button>
    ]}
  >
    <div>
      <p className='lead'>Kindly, check your email.</p>
      <p>A verfication token has been sent to you.</p>
    </div>
  </Modal>
);

export default VerifyModal;
