import React, { Fragment, useState } from 'react';
import { menuData } from '../../content_data';
import { Affix, notification, Form, Input, Modal } from 'antd';

const CartTable = ({ form }) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('This is the form submitted', values);
      }
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const openNotification = type => {
    notification[type]({
      message: 'Item removed from cart'
    });
  };

  const output = menuData.map((info, index) => {
    return (
      <tr class='cart-item' key={index}>
        <td>
          <span class='orderImg'>
            <img src={info.img} alt={info.name} />
          </span>
          {info.name}
        </td>
        <td>
          <input
            type='number'
            class='quantity'
            data-id={info.id}
            name='quantity'
            value='5'
          />
        </td>
        <td>
          <i
            class='fas fa-trash'
            data-id={index}
            onClick={() => openNotification('success')}
          ></i>
        </td>
        <td class='price'>₦{info.price}</td>
        <td class='subTotal'>₦900</td>
      </tr>
    );
  });

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <Modal
        title="Add your address. Please, confirm before clicking 'ok' "
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onSubmit={handleSubmit} className='login-form'>
          <Form.Item label='Email'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Phone number'>
            {getFieldDecorator('phone no', {
              rules: [
                {
                  required: true,
                  message: 'Please input your phone number!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Address'>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Please input your address!'
                }
              ]
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
      <div className='row'>
        <table class='table table-responsive table-hover col-md-8'>
          <thead className='thead-dark'>
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Remove</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>{output}</tbody>
        </table>
        <div className='checkoutBox col-md-4'>
          <Affix offsetTop={50}>
            <h1>Total: ₦7800</h1>
            <button class='btn btn-danger' onClick={showModal}>
              Proceed to checkout
            </button>
          </Affix>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedNormalCartForm = Form.create({
  name: 'cartTable'
})(CartTable);

export default WrappedNormalCartForm;
