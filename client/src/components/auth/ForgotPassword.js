import React, { Fragment, useEffect, useState } from 'react';
import { Form, Button, Input, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword, resetState } from '../../actions/authAction';
import VerifyModal from './VerifyModal';

const ForgotPassword = ({ form, history }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    auth: { msg },
    error
  } = useSelector(state => {
    return {
      auth: state.auth,
      error: state.error
    };
  });

  const dispatch = useDispatch();

  const showModal = id => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    form.resetFields();
    dispatch(resetState());
    history.push('/login');
  };

  useEffect(() => {
    if (msg === 'Verified successfully') {
      showModal();
    }
  }, [msg]);

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        dispatch(forgotPassword(values, setLoading));
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <VerifyModal visible={visible} closeModal={closeModal} msg={msg} />
      <div className=' pt-5'>
        <h1 className='lead text-center mt-5'>Forgot password? </h1>
        <div className='forgot_content border p-5 bg-white'>
          <p className='bold'>
            Enter your user account's verified email address and we will send
            you a password reset link
          </p>
          {/* Error message */}
          {error.status === 404 ? (
            <Alert message='Email verification failed' type='error' showIcon />
          ) : null}
          <Form onSubmit={handleSubmit} className='login-form mt-3 mb-3'>
            <Form.Item>
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
              })(
                <Input
                  prefix={
                    <i
                      className='far fa-envelope'
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    ></i>
                  }
                  placeholder='Email your email address'
                />
              )}
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='btn btn-secondary form-control'
            >
              Send password reset email
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedForgotPassword = Form.create({ name: 'forgot_password' })(
  ForgotPassword
);

export default WrappedForgotPassword;
