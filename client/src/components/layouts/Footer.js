import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <div className='bg-dark footer-grid text-white row mt-5 no-gutters'>
        <div className='col-md-3'>
          <ul>
            <li>Crispy Munch</li>
            <li>+123 000 555 000</li>
            <li>me@crispymunch.com</li>
            <li>Lagos Island</li>
            <li>Lagos</li>
          </ul>
        </div>
        <div className='col-md-3'>
          <ul>
            <li>Use Crispy Munch</li>
            <li>
              <Link to='#'>For Large & Complex Events</Link>
            </li>
            <li>
              {' '}
              <Link to='#'>Crispy Munch Mobile App</Link>
            </li>
            <li>
              <Link to='#'>Pricing</Link>
            </li>
            <li>
              <Link to='#'>Online Booking</Link>
            </li>
          </ul>
        </div>
        <div className='col-md-3'>
          <ul>
            <li>Plan Event</li>
            <li>
              <Link to='#'>Conference Management</Link>
            </li>
            <li>
              <Link to='#'>Birhday Party</Link>
            </li>
            <li>
              <Link to='#'>Wedding</Link>
            </li>
            <li>
              <Link to='#'>Games and Sport</Link>
            </li>
            <li>
              <Link to='#'>Burial Ceremony</Link>
            </li>
            <li>
              <Link to='#'>House Warming</Link>
            </li>
          </ul>
        </div>
        <div className='col-md-3 social-icon'>
          <ul>
            <li>Connect with us</li>
            <li>
              <Link to='http://facebook.com/'>
                <i className='fab fa-facebook'></i>
              </Link>
            </li>
            <li>
              <Link to='http://linkedin.com/'>
                <i className='fab fa-linkedin'></i>
              </Link>
            </li>
            <li>
              <Link to='http://twitter.com/'>
                <i className='fab fa-twitter'></i>
              </Link>
            </li>
            <li>
              <Link to='http://plus.google.com/'>
                <i className='fab fa-google-plus'></i>{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2019 Crispy Munch</p>
      </div>
    </Fragment>
  );
};

export default Footer;
