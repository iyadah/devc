import React from 'react'
import { Link } from 'react-router-dom';

export const Landing = () => {
    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Urood</h1>
            <p className="lead">
              Create a profile/portfolio, share posts and get help from
              other Uroods
            </p>
            <iframe src="https://players.brightcove.net/6268262318001/default_default/index.html?videoId=6268279161001" allowfullscreen="" allow="encrypted-media" width="960" height="540"></iframe>
            <br /> 
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
  
    )
}

export default Landing;

