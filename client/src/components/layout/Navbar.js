import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i class='fa fa-laptop' aria-hidden='true'>
            {' '}
          </i>{' '}
          Developers
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i class='fa fa-desktop' aria-hidden='true'>
            {' '}
          </i>{' '}
          Posts
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i class='fa fa-laptop' aria-hidden='true'>
            {' '}
          </i>{' '}
          Developers
        </Link>
      </li>
      <li>
        <Link to='/register'>
          {' '}
          <i class='fa fa-user-plus' aria-hidden='true'>
            {' '}
          </i>{' '}
          Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt' /> Login
        </Link>
      </li>
    </ul>
  );
  console.log('LOADING', loading);
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='/'>
          <i className='fas fa-code'></i> DevConnector
        </a>
      </h1>
      {/* {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      {loading && <Fragment>{!isAuthenticated ? guestLinks : ''}</Fragment>} */}
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
