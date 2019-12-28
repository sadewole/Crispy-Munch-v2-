import React, { Fragment, useState, useEffect } from 'react';
import { Affix, notification, Form, Input, Modal, Spin, Button } from 'antd';
import {
  getAllOrder,
  updateOrderQuantity,
  updateUserOrder,
  deleteOrder
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';

const CartTable = ({ form }) => {
  const [openAction, setOpenAction] = useState({});
  const [visible, setVisible] = useState(false);
  let [quantity, setQuantity] = useState(1);
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

  // const handleQuantity = e => {
  //   if (e.target.value < 1) {
  //     setQuantity(1);
  //   }
  //   const newQuantity = setQuantity(e.target.value);
  //   dispatch(updateOrderQuantity(newQuantity));
  // };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('This is the form submitted', values);
        dispatch(updateUserOrder(values));
      }
    });
  };

  const handleAction = (value, id) => {
    if (value < 1) {
      setOpenAction({
        [id]: 1
      });
    }

    const newQuantity = setOpenAction({
      [id]: value
    });
    dispatch(updateOrderQuantity(newQuantity));
  };

  useEffect(() => {
    dispatch(getAllOrder());

    // load food id into action. This helps to obtainsdata from handleAction
    // orders.map(i =>
    //   setOpenAction({
    //     ...openAction,
    //     [i.id]: 1
    //   })
    // );
    // return () => {
    //   console.log('clean up ...');
    // };
    // [getAllOrder]
  });

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
      <tr className='cart-item'>
        <td colSpan='5' className='text-center bg-dark'>
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
              value={openAction[info.id]}
              onChange={value => handleAction(value, info.id)}
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
        onCancel={handleOk}
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
          <Button
            type='primary'
            htmlType='submit'
            onClick={handleOk}
            className='btn-secondary btn-block'
          >
            Submit
          </Button>
        </Form>
      </Modal>
      <div className='row'>
        <table className='table table-responsive table-hover col-md-8'>
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
            <button className='btn btn-danger' onClick={showModal}>
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
