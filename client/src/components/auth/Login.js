import React, { Fragment } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const Login = ({ form }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <div className='create-login p-5 '>
        <div className='login-bg hide-sm'></div>
        <div className='row'>
          <div className='col-md-8 login-text hide-sm'>
            {/* <img src='./img/chef.png' alt='chef' className='img-fluid' /> */}
            <p>
              Do you need <br /> good taste?
            </p>
            <h1 className='crispy-text my-4'>Crispy Munch</h1>
            <p>will provide the best treat you deserve.</p>
          </div>
          <div className='col-md-4 col-sm-12 login'>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} className='login-form'>
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

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    placeholder='Password'
                  />
                )}
              </Form.Item>
              <Form.Item>
                <a className='login-form-forgot' href=''>
                  Forgot password?
                </a>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='btn btn-secondary form-control'
                >
                  Log in
                </Button>
                <br />
                No account? <Link to=''>Click here</Link> to register
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
