import React, { Fragment, useEffect, useState } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/authAction';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = ({ form, history }) => {
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFields((err, values) => {
      if (!err) {
        dispatch(login(values));
      }
    });
  };

  // find auth actions
  const {
    error,
    auth: { isAuthenticated, user }
  } = useSelector(state => {
    return {
      error: state.error,
      auth: state.auth
    };
  });

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
    // redirected if no error
    if (isAuthenticated && user.role === 'CLIENT') {
      history.push('/menu');
    }
    if (isAuthenticated && user.role === 'ADMIN') {
      history.push('/admin');
    }
  }, [error, isAuthenticated]);

  const responseGoogle = res => {
    console.log(res);
  };

  const responseFacebook = res => {
    console.log(res);
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <div className='create-login p-5'>
        <div className='login-bg hide-sm'></div>
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

              {/* Error message */}
              {msg === 'Unauthorized' ? (
                <Alert
                  message='Wrong email or password'
                  type='error'
                  showIcon
                />
              ) : null}
              <Form.Item>
                <Link className='login-form-forgot' to=''>
                  Forgot password?
                </Link>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='btn btn-secondary form-control'
                >
                  Log in
                </Button>
              </Form.Item>
              <div className='or'>
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <Form.Item>
                {/* <FacebookLogin
                  appId = {process.env.FB_OAUTH_ID}
                  autoLoad= {true}
                  fields="name, email, picture"
                  callback={responseFacebook}
                  textButton= 'Connect with Facebook'
                  className='btn btn-primary form-control'
                  /> */}
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
                  className='btn btn-danger form-control mr-2'
                >
                  <Link to='#'>
                    <i className='fab fa-google-plus mr-2'></i>
                    Connect with Google
                  </Link>
                </Button>
              </Form.Item>
              <p>
                No account? <Link to='/register'>Click here</Link> to register
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
