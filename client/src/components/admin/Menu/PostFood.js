import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Modal } from 'antd';
import { postMenu } from '../../../actions/catalogAction';
import { useDispatch, useSelector } from 'react-redux';

const AdminPost = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // const [error, menu] = useSelector(state => {
  //   return {
  //     error: state.error,
  //     menu: state.menu
  //   };
  // });

  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
          dispatch(postMenu(values));
        }, 3000);
      }
    });
  };

  const handleOk = e => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <Button onClick={showModal}> + Add Item</Button>

      <Modal
        title='Add to Crispy Munch catalog'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Food Name</label>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the food name!'
                  }
                ]
              })(<Input type='text' name='name' className='form-control' />)}
            </Form.Item>
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Food Price</label>
            <Form.Item>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the price!' }]
              })(<Input type='number' name='price' className='form-control' />)}
            </Form.Item>
          </div>
          <div className='form-group'>
            <label htmlFor='image'>Image</label>
            <Form.Item>
              {getFieldDecorator('image', {
                rules: [{ required: true, message: 'Please input food image!' }]
              })(<Input type='file' name='image' className='form-control' />)}
            </Form.Item>
          </div>
          <div>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='btn btn-secondary btn-block'
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

const WrappedNormalFoodForm = Form.create({ name: 'normal_login' })(AdminPost);

export default WrappedNormalFoodForm;
