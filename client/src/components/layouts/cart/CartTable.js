import React, { Fragment, useState, useEffect } from 'react';
import { notification, Form, Input, Modal, Spin, Button } from 'antd';
import {
  fetchUserOrderHistory,
  updateOrderQuantity,
  updateUserOrder,
  deleteOrder
} from '../../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../../actions/authAction';
import PaypalButton from '../../utils/PaypalButton';
import ClientCart from './ClientCart';

const CartTable = ({ form }) => {
  let total = 0;
  const [openAction, setOpenAction] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    error,
    order: { userPendingOrders, isLoading }
  } = useSelector(state => {
    return {
      error: state.error,
      order: state.order,
      auth: state.auth
    };
  });

  const handleQuantity = (e, id) => {
    if (e.target.value <= 0) {
      e.target.value = 1;
    }
    setOpenAction({ [id]: e.target.value });
    dispatch(updateOrderQuantity(e.target.value, id));
  };

  const handleSubmit = async e => {
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
  // component did update
  useEffect(() => {
    const newObj = {};
    userPendingOrders.map(i => {
      Object.assign(newObj, { [i.id]: [i.quantity] });
    });
    setOpenAction(newObj);
  }, [userPendingOrders]);

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

  const handleDelete = inp => {
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
    userPendingOrders.map(info => {
      total += info.amount;
      return (
        <tr className='cart-item' key={info.id}>
          <td>
            <span className='orderImg'>
              <img src={info.food.image} alt={info.food.name} />
            </span>
            {info.food.name}
          </td>
          <td>
            <input
              type='number'
              className='quantity'
              name='quantity'
              value={openAction[info.id]}
              onChange={value => handleQuantity(value, info.id)}
            />
          </td>
          <td>
            <i
              className='fas fa-trash'
              onClick={() => handleDelete(info.id)}
            ></i>
          </td>
          <td className='price'>₦{info.food.price}</td>
          <td className='subTotal'>₦{info.amount}</td>
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
        title="Add your address. Please, confirm before clicking 'ok' "
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
          {/* <Button>
            <PaypalButton onClick={handleSubmit} total={Total} />
          </Button> */}

          <Button
            type='primary'
            htmlType='submit'
            onClick={handleSubmit}
            className='btn-secondary btn-block'
          >
            Submit
          </Button>
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
  user: PropTypes.array
};

const WrappedNormalCartForm = Form.create({
  name: 'cartTable'
})(CartTable);

export default WrappedNormalCartForm;
