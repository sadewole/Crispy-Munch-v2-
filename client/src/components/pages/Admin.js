import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import AdminMenu from '../admin/Menu/AdminMenu';
import AdminHistory from '../admin/History/AdminHistory';
import AdminViewUser from '../admin/User/AdminViewUser';
import AdminDashboard from '../admin/Dashboard/AdminDashboard';
import {logout} from '../../actions/authAction'
import {useDispatch} from 'react-redux'

const { Content, Sider } = Layout;

const SideNav = props => {
  const path = props.match.path;
  const { slum } = props.match.params;
  const dispatch = useDispatch()

  return (
    <Fragment>
      <div className='admin-bgImg'> </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          className='admin-sider'
        >
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <i className='fas fa-user-alt mr-2' />
              <span className='nav-text'>
                <Link to='/admin'> Dashboard</Link>
              </span>
            </Menu.Item>
            <Menu.Item key='2'>
              <i className='fas fa-french-fries mr-2' />
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
            <Menu.Item key='5' onClick={()=>dispatch(logout())}>
              <i className='fas fa-sign-out-alt mr-2'> </i>
              <span className='nav-text'>
                <Link to='#'> Sign Out </Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            paddingTop: '4rem'
          }}
          className='admin-content'
        >
          {path === '/admin' && <AdminDashboard />}
          {slum === 'menu' && <AdminMenu />}
          {slum === 'client' && <AdminViewUser />}
          {slum === 'history' && <AdminHistory />}
        </Content>
      </div>
    </Fragment>
  );
};

export default SideNav;
