import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import AdminComponents from '../admin/AdminComponent';
import { logout } from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const { Content, Sider } = Layout;

const SideNav = ({ match, history }) => {
  const navKey = {
    '/admin': '1',
    '/admin/menu': '2',
    '/admin/client': '3',
    '/admin/history': '4',
  };
  const dispatch = useDispatch();
  const {
    auth: { isAuthenticated, user },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  useEffect(() => {
    // redirected if not admin
    if (isAuthenticated && user.role === 'CLIENT') {
      history.push('/');
    }
  }, [isAuthenticated, history, user]);
  return (
    <Fragment>
      <div className='admin-bgImg'> </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Sider breakpoint='lg' collapsedWidth='0' className='admin-sider'>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[`${navKey[window.location.pathname]}`]}
          >
            <Menu.Item key='1'>
              <i className='fas fa-user-alt mr-2' />
              <span className='nav-text'>
                <Link to='/admin'> Dashboard</Link>
              </span>
            </Menu.Item>
            <Menu.Item key='2'>
              <i className='fas fa-utensils mr-2' />
              <span className='nav-text'>
                <Link to='/admin/menu'> Food Menu </Link>
              </span>
            </Menu.Item>
            <Menu.Item key='3'>
              <i className='fas fa-users mr-2' />
              <span className='nav-text'>
                <Link to='/admin/client'> Client </Link>
              </span>
            </Menu.Item>
            <Menu.Item key='4'>
              <i className='fas fa-history mr-2' />
              <span className='nav-text'>
                <Link to='/admin/history'> Order history </Link>
              </span>
            </Menu.Item>
            <Menu.Item key='5' onClick={() => dispatch(logout())}>
              <i className='fas fa-sign-out-alt mr-2'> </i>
              <span className='nav-text'>
                <Link to='/login'> Sign Out </Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            paddingTop: '4rem',
          }}
          className='admin-content'
        >
          <AdminComponents match={match} />
        </Content>
      </div>
    </Fragment>
  );
};

export default SideNav;
