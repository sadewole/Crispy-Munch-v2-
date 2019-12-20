import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='#'>
          Crispy-Munch
        </Link>
        <Icon
          type='align-right'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          className='text-white toggle toggle'
          onClick={handleToggle}
        />

        <div
          className={
            isOpen
              ? 'collapse navbar-collapse show'
              : 'collapse navbar-collapse'
          }
          id='navbarSupportedContent'
        >
          <Menu defaultSelectedKeys={['1']} className='navbar-nav ml-auto'>
            <Menu.Item key='1' className='nav-item'>
              <Link className='nav-link' to='#'>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key='2' className='nav-item'>
              <Link to='' className='nav-link'>
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key='3' className='nav-item'>
              <Link to='' className='nav-link'>
                Register
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
