import React, { Fragment, useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const Register = ({ form }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <div className='create-login p-5 '>
        <div className='register-bg hide-sm'></div>
        <div className='row'>
          <div className='col-md-8 login-text hide-sm'>
            <p>
              Do you need <br /> good taste?
            </p>
            <h1 className='crispy-text my-4'>Crispy Munch</h1>
            <p>will provide the best treat you deserve.</p>
          </div>
          {/* form */}
          <div className='col-md-4 col-sm-12 login'>
            <h1>Register</h1>

            <Form onSubmit={handleSubmit} className='login-form'>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input your username!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Username'
                  />
                )}
              </Form.Item>
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
                    placeholder='Email'
                  />
                )}
              </Form.Item>

              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    placeholder='Password'
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    onBlur={handleConfirmBlur}
                    type='password'
                    placeholder='Confirm Password'
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='btn btn-secondary form-control'
                >
                  Register
                </Button>
              </Form.Item>
              <div className='or'>
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='btn btn-primary form-control'
                >
                  <Link to='#'>
                    <i className='fab fa-facebook mr-2'></i>
                    Connect with Facebook
                  </Link>
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='btn btn-danger form-control'
                >
                  <Link to='#'>
                    <i className='fab fa-google-plus mr-2'></i>
                    Connect with Google
                  </Link>
                </Button>
              </Form.Item>
              <p>
                {' '}
                Have an account? <Link to='/login'>Click here</Link> to login
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedNormalRegisterForm = Form.create({ name: 'register' })(Register);

export default WrappedNormalRegisterForm;
