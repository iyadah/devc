import React from 'react'
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
    return (
        <div className="dash-buttons space-x-2">
        <Link to="/edit-profile" className="bg-gray-500 hover:bg-gray-700" >
            <i className="fas fa-user-circle"></i> 
            <span className="text-white">Edit Profile</span>
        </Link>
        <Link to="/add-experience" className="bg-gray-500 hover:bg-gray-700">
            <i className="fab fa-black-tie text-primary"></i>
            <span className="text-white"> Add Experience</span>
        </Link>
        <Link to="/add-education" className="bg-gray-500 hover:bg-gray-700" >
            <i className="fas fa-graduation-cap text-primary"></i> 
            <span className="text-white">Add Education</span>
        </Link>
        <Link to="/create-service" className="bg-gray-500 hover:bg-gray-700" >
            <i className="fas fa-graduation-cap text-primary"></i> 
            <span className="text-white">Add Service</span>
        </Link>
      </div>
    )
}
