import React from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
       <img src={require('../../img/urood2.png')} style={{height: 60, width: 60,  display: 'block'}} />
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
