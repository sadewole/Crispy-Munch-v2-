import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authAction';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // find auth actions
  const {
    auth: { isAuthenticated, isLoading, user }
  } = useSelector(state => {
    return {
      error: state.error,
      auth: state.auth
    };
  });

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const clientLink = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/menu' className='nav-link'>
          Explore Menu
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/cart' className='nav-link'>
          Cart
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/history' className='nav-link'>
          Order History
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          to='/login'
          className='nav-link'
          onClick={() => dispatch(logout())}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLink = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/menu' className='nav-link'>
          Explore Menu
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Crispy-Munch
        </Link>

        {
          <Fragment>
            {isAuthenticated && user.role === 'ADMIN' ? null : (
              <Icon
                type='align-right'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                className='text-white toggler'
                onClick={handleToggle}
              />
            )}
          </Fragment>
        }

        <div
          className={
            isOpen
              ? 'collapse navbar-collapse show'
              : 'collapse navbar-collapse'
          }
          id='navbarSupportedContent'
        >
          {
            <Fragment>
              {isAuthenticated
                ? user.role === 'ADMIN'
                  ? null
                  : clientLink
                : guestLink}

              {/* // {isAuthenticated && user.role === 'ADMIN'? (null): (isAuthenticated && user.role === 'CLIENT'
              //   ? clientLink
              //   : guestLink)}  */}
            </Fragment>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
