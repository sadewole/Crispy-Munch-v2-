import React, { Fragment, useState, useEffect } from 'react';
import { Affix, notification, Form, Input, Modal, Spin, Button } from 'antd';
import {
  getAllOrder,
  updateOrderQuantity,
  updateUserOrder,
  deleteOrder
} from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/authAction';

const CartTable = ({ form }) => {
  let Total = 0;
  const [openAction, setOpenAction] = useState({});
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
    dispatch(getAllOrder());
  }, []);
  // component did update
  useEffect(() => {
    const newObj = {};
    orders.map(i => {
      Object.assign(newObj, { [i.id]: [i.quantity] });
    });
    setOpenAction(newObj);
  }, [orders]);

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
  ) : (
    orders !== undefined &&
    user !== undefined &&
    orders.map(info => {
      if (info.user_id === user.id && info.payment === 'pending') {
        Total += info.amount;
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
                value={openAction[info.id] === '' ? 1 : openAction[info.id]}
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
      }
    })
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
            onClick={handleSubmit}
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
            <h1>Total: ₦{Total}</h1>
            <button className='btn btn-danger' onClick={showModal}>
              Proceed to checkout
            </button>
          </Affix>
        </div>
      </div>
    </Fragment>
  );
};

CartTable.propTypes = {
  orders: PropTypes.array,
  getAllOrder: PropTypes.func.isRequired,
  updateOrderQuantity: PropTypes.func.isRequired,
  updateUserOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.array.isRequired
};

const WrappedNormalCartForm = Form.create({
  name: 'cartTable'
})(CartTable);

export default WrappedNormalCartForm;
