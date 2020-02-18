import React, { Fragment, useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, oauthFacebook, oauthGoogle } from '../../actions/authAction';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Register = ({ form, history }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    if (error.id === 'REGISTER_FAIL') {
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

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);
        const { username, email, password } = values;
        const data = {
          name: username,
          email,
          password
        };
        dispatch(register(data, setLoading));
      }
    });
  };

  const responseGoogle = async res => {
    console.log(res);
    await dispatch(oauthGoogle(res.accessToken));
  };

  const responseFacebook = async res => {
    console.log(res);
    await dispatch(oauthFacebook(res.accessToken));
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty({
      confirmDirty: confirmDirty || !!value
    });
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
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  };

  const { getFieldDecorator } = form;

  return (
    <Fragment>
      <div className='create-login p-5 '>
        <div className='register-bg hide-md'> </div>
        <div className='row'>
          <div className='col-lg-8 login-text hide-md'>
            <p>
              Do you need <br /> good taste ?
            </p>
            <h1 className='crispy-text my-4'> Crispy Munch </h1>
            <p> will provide the best treat you deserve. </p>
          </div>
          {/* form */}
          <div className='col-lg-4 col-md-12 login'>
            <h1> Register </h1>
            <Form onSubmit={handleSubmit} className='login-form'>
              {/* Message */}
              {msg !== null ? (
                <Alert message='Email already exist' type='error' showIcon />
              ) : null}
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type='user'
                        style={{
                          color: 'rgba(0,0,0,.25)'
                        }}
                      />
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
                        style={{
                          color: 'rgba(0,0,0,.25)'
                        }}
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
                      <Icon
                        type='lock'
                        style={{
                          color: 'rgba(0,0,0,.25)'
                        }}
                      />
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
                      <Icon
                        type='lock'
                        style={{
                          color: 'rgba(0,0,0,.25)'
                        }}
                      />
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
                  loading={loading}
                  className='btn btn-secondary form-control'
                >
                  Register
                </Button>
              </Form.Item>
              <div className='or'>
                <hr />
                <span> OR </span> <hr />
              </div>
              <Form.Item>
                <FacebookLogin
                  appId={process.env.REACT_APP_FB_OAUTH_ID}
                  fields='name, email, picture'
                  callback={responseFacebook}
                  textButton='Connect with Facebook'
                  cssClass='btn btn-primary form-control'
                  icon='fab fa-facebook mr-2'
                />
              </Form.Item>
              <Form.Item>
                <GoogleLogin
                  clientId={process.env.REACT_APP_Google_ID}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      className='btn btn-danger btn-block'
                    >
                      <i className='fab fa-google-plus mr-2'></i>
                      Connect with Google
                    </button>
                  )}
                  disabled={false}
                  cookiePolicy={'single_host_origin'}
                />
              </Form.Item>
              <p>
                Have an account ? <Link to='/login'> Click here </Link> to login
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const WrappedNormalRegisterForm = Form.create({
  name: 'register'
})(Register);

export default WrappedNormalRegisterForm;
