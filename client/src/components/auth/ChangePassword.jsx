import React, { useEffect, useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { changePassword } from '../../actions/authAction';

const ChangePassword = ({ form, location, history }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    auth: { isAuthenticated, user },
    error,
  } = useSelector((state) => {
    return {
      auth: state.auth,
      error: state.error,
    };
  });

  useEffect(() => {
    const { id, token } = queryString.parse(location.search);

    setId(id);
    setToken(token);
  }, [location.search]);

  useEffect(() => {
    // redirected if no error
    if (isAuthenticated && user.role === 'CLIENT') {
      history.push('/menu');
    }
    if (isAuthenticated && user.role === 'ADMIN') {
      history.push('/admin');
    }
  }, [isAuthenticated, user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true);
        dispatch(changePassword(values.password, id, token, setLoading));
      }
    });
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty({
      confirmDirty: confirmDirty || !!value,
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
        force: true,
      });
    }
    callback();
  };

  const { getFieldDecorator } = form;
  return (
    <div className='container pt-5'>
      <h1 className='lead text-center mt-5'>Reset your password</h1>
      <div className='forgot_content border p-5 bg-white'>
        <Form onSubmit={handleSubmit} className='login-form mt-3 mb-3'>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon
                    type='lock'
                    style={{
                      color: 'rgba(0,0,0,.25)',
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
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon
                    type='lock'
                    style={{
                      color: 'rgba(0,0,0,.25)',
                    }}
                  />
                }
                onBlur={handleConfirmBlur}
                type='password'
                placeholder='Confirm Password'
              />
            )}
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='btn btn-secondary form-control'
            loading={loading}
          >
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

const WrappedNormalChangePassword = Form.create({
  name: 'ChangePassword',
})(ChangePassword);

export default WrappedNormalChangePassword;
