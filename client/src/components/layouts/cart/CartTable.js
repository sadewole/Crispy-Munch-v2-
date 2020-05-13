import React, { Fragment, useState, useEffect } from 'react';
import { notification, Form, Input, Modal, Spin, Button } from 'antd';
import {
  fetchUserOrderHistory,
  updateOrderQuantity,
  updateUserOrder,
  deleteOrder,
} from '../../../actions/orderAction';
import { currencyFormatter } from '../../utils/formatter';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../../actions/authAction';
import PaypalButton from '../../utils/PaypalButton';
import ClientCart from './ClientCart';

const CartTable = ({ form }) => {
  let total = 0;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    error,
    order: { userPendingOrders, isLoading },
  } = useSelector((state) => {
    return {
      error: state.error,
      order: state.order,
      auth: state.auth,
    };
  });

  const decreaseQuantity = (id) => {
    let tempCart = [...userPendingOrders];
    let selectedCart = tempCart.find((cart) => cart.id === id);

    let index = tempCart.indexOf(selectedCart);
    let product = tempCart[index];
    product.quantity = product.quantity - 1;
    if (product.quantity === 0) {
      product.quantity = 1;
    }

    dispatch(updateOrderQuantity(product.quantity, id));
  };

  const increaseQuantity = (id) => {
    let tempCart = [...userPendingOrders];
    let selectedCart = tempCart.find((cart) => cart.id === id);
    let index = tempCart.indexOf(selectedCart);
    let product = tempCart[index];
    product.quantity = product.quantity + 1;

    dispatch(updateOrderQuantity(product.quantity, id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await form.validateFields((err, values) => {
      if (!err) {
        dispatch(updateUserOrder(values));
        handleOk();
      }
    });

    await form.resetFields();
  };

  // handing component did mount
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchUserOrderHistory());
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const openNotification = (type) => {
    notification[type]({
      message: 'Item removed from cart',
    });
  };

  const handleDelete = (inp) => {
    if (error.id === null) {
      dispatch(deleteOrder(inp));
      openNotification('success');
    }
  };

  const output = isLoading ? (
    <Fragment>
      <tr className='cart-item'>
        <th colSpan='5' className='text-center bg-dark'>
          <Spin size='large' tip='Loading...' />
        </th>
      </tr>
    </Fragment>
  ) : userPendingOrders.length >= 1 ? (
    userPendingOrders.map((info) => {
      total += info.amount;
      return (
        <tr className='cart-item' key={info.id}>
          <td>
            <span className='orderImg'>
              <img src={info.food.image} alt={info.food.name} />
            </span>
            {info.food.name}
          </td>
          <td className='update-btn'>
            <span
              onClick={() => decreaseQuantity(info.id)}
              className='btn-quantity'
            >
              -
            </span>
            <span>{info.quantity}</span>
            <span
              onClick={() => increaseQuantity(info.id)}
              className='btn-quantity'
            >
              +
            </span>
          </td>
          <td>
            <i
              className='fas fa-trash'
              onClick={() => handleDelete(info.id)}
            ></i>
          </td>
          <td className='price'>{currencyFormatter(info.food.price)}</td>
          <td className='subTotal'>{currencyFormatter(info.amount)}</td>
        </tr>
      );
    })
  ) : (
    <Fragment>
      <tr className='cart-item'>
        <th colSpan='5' className='text-center bg-dark text-white'>
          No Data
        </th>
      </tr>
    </Fragment>
  );

  const { getFieldDecorator } = form;
  return (
    <Fragment>
      <Modal
        title='Add your address. Please, confirm before information before checkout '
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form onSubmit={handleSubmit} className='shipping-form'>
          <Form.Item label='Phone number'>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Address'>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ],
            })(<Input.TextArea />)}
          </Form.Item>
          <div className='d-flex'>
            <Button className='mr-2'>Cancel</Button>
            <PaypalButton handleSubmit={handleSubmit} total={total} />
          </div>

          {/* <Button
            type='primary'
            htmlType='submit'
            onClick={handleSubmit}
            className='btn-secondary btn-block'
          >
            Submit
          </Button> */}
        </Form>
      </Modal>
      {/* send details to cart viewers */}
      <ClientCart total={total} output={output} showModal={showModal} />
    </Fragment>
  );
};

CartTable.propTypes = {
  userPendingOrders: PropTypes.array,
  fetchUserOrderHistory: PropTypes.func,
  updateOrderQuantity: PropTypes.func,
  updateUserOrder: PropTypes.func,
  deleteOrder: PropTypes.func,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  user: PropTypes.array,
};

const WrappedNormalCartForm = Form.create({
  name: 'cartTable',
})(CartTable);

export default WrappedNormalCartForm;
