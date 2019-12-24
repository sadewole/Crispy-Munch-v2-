import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import AdminMenu from '../admin/AdminMenu';

const { Header, Content, Footer, Sider } = Layout;

const SideNav = () => {
  return (
    <Fragment>
      <div className='admin-container'>
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
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
            <Menu.Item key='1'>
              <i className='fas fa-french-fries mr-2'></i>
              <span className='nav-text'>
                <Link to='#'>Food Menu</Link>
              </span>
            </Menu.Item>
            <Menu.Item key='2'>
              <i className='fas fa-users mr-2'></i>
              <span className='nav-text'>
                <Link to='#'>Customer</Link>
              </span>
            </Menu.Item>
            <Menu.Item key='3'>
              <i className='fas fa-history mr-2'></i>
              <span className='nav-text'>
                <Link to='#'>Order history</Link>
              </span>
            </Menu.Item>
            <Menu.Item key='4'>
              <i className='fas fa-sign-out-alt mr-2'></i>
              <span className='nav-text'>
                <Link to='#'>Sign Out</Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ marginTop: '4rem' }} className='container admin-content'>
          <AdminMenu />
        </Content>
      </div>
    </Fragment>
  );
};

export default SideNav;
