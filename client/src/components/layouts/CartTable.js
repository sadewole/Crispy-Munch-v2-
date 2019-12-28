import React, { Fragment, useState, useEffect } from 'react';
import { Affix, notification, Form, Input, Modal, Spin, Button } from 'antd';
import {
  fetchUserOrderHistory,
  updateOrderQuantity,
  updateUserOrder,
  deleteOrder
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';

const CartTable = ({ form }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    error,
    order: { orders, isLoading },
    auth: { user }
  } = useSelector(state => {
    return {
      error: state.error,
      order: state.order,
      auth: state.auth
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('This is the form submitted', values);
        dispatch(updateUserOrder(values));
      }
    });
  };

  useEffect(() => {
    dispatch(fetchUserOrderHistory());
    return () => {
      console.log('clean up ...');
    };
  }, [fetchUserOrderHistory]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  // const handleCancel = e => {
  //   setVisible(false);
  // };

  const openNotification = type => {
    notification[type]({
      message: 'Item removed from cart'
    });
  };

  const handleDelete = inp => {
    if (error.id === null) {
      dispatch(deleteOrder(inp));
      openNotification('success');
    }
  };

  const output = isLoading ? (
    <Fragment>
      <tr>
        <td colSpan='5'>
          <Spin size='large' tip='Loading...' />
        </td>
      </tr>
    </Fragment>
  ) : (
    orders !== undefined &&
    orders.map(info => {
      return info.user_id === user.id && info.payment === 'pending' ? (
        <tr className='cart-item' key={info.id}>
          <td>
            <span className='orderImg'>
              <img src={info.img} alt={info.name} />
            </span>
            {info.name}
          </td>
          <td>
            <input
              type='number'
              className='quantity'
              name='quantity'
              value={info.quantity}
              onChange={value => updateOrderQuantity(Number(value))}
            />
          </td>
          <td>
            <i
              className='fas fa-trash'
              onClick={() => handleDelete(info.id)}
            ></i>
          </td>
          <td className='price'>₦{info.price}</td>
          <td className='subTotal'>₦{info.amount}</td>
        </tr>
      ) : (
        <Fragment>
          <tr>
            <td colSpan='5' className='text-center'>
              No Data
            </td>
          </tr>
        </Fragment>
      );
    })
  );

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <Modal
        title="Add your address. Please, confirm before clicking 'ok' "
        visible={visible}
        onOk={handleOk}
        footer={[]}
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
          <Button type='default' onClick={handleOk} className='btn-secondary'>
            Submit
          </Button>
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
