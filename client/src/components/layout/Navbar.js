import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../img/urood.svg'; //defined but not used now as we are calling from cloudinary

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
  {/*    <img src={require('../../img/urood2.png')} style={{height: 60, width: 60,  display: 'block'}} /> */} 
  {/*    <img src={logo} style={{height: 60, width: 60,  display: 'block'}} /> */} {/* This line to import the image from the local assets*/}
        <img src='https://res.cloudinary.com/dkbror80w/image/upload/v1626271736/img/urood_uyqcxw.svg' style={{height: 60, width: 60,  display: 'block'}} alt="Urood logo" />
        <h1>
          <Link to="/"><i className="fas fa-code"></i> Urood.com</Link>
        </h1>
        <ul>
          <li><Link to="!#">Uroods</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="login">Login</Link></li>
        </ul>
      </nav>
   
    )
}

export default Navbar;
