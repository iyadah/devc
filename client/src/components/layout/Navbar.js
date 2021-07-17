import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
//import logo from '../../img/urood.svg'; //defined but not used now as we are calling from cloudinary
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGOUT } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticate, loading }, logout }) => {
    const authLinks = (
      <ul>
      <li><Link to="!#">Uroods</Link></li>
      <li><a href="#!" onClick={ logout }><span className="hide-sm">Logout</span></a></li>
    </ul>
    );

    const guestLinks = (
      <ul>
      <li><Link to="!#">Uroods</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="login">Login</Link></li>
    </ul>
    );
    return (
        <nav className="navbar bg-dark">
  {/*    <img src={require('../../img/urood2.png')} style={{height: 60, width: 60,  display: 'block'}} /> */} 
  {/*    <img src={logo} style={{height: 60, width: 60,  display: 'block'}} /> */} {/* This line to import the image from the local assets*/}
        <img src='https://res.cloudinary.com/dkbror80w/image/upload/v1626271736/img/urood_uyqcxw.svg' style={{height: 60, width: 60,  display: 'block'}} alt="Urood logo" />
        <h1>
          <Link to="/"><i className="fas fa-code"></i> Urood.com</Link>
        </h1>
      {!loading && (<Fragment>{ isAuthenticate ? authLinks : guestLinks }</Fragment>)}
      </nav>
   
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
