import React from 'react'
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
    return (
        <div class="dash-buttons space-x-2">
        <Link to="/dit-profile" class="bg-gray-500 hover:bg-gray-700" >
            <i class="fas fa-user-circle"></i> 
            <span class="text-white">Edit Profile</span>
        </Link>
        <Link to="/add-experience" class="bg-gray-500 hover:bg-gray-700">
            <i class="fab fa-black-tie text-primary"></i>
            <span class="text-white"> Add Experience</span>
        </Link>
        <Link to="/add-education" class="bg-gray-500 hover:bg-gray-700" >
            <i class="fas fa-graduation-cap text-primary"></i> 
            <span class="text-white">Add Education</span>
        </Link>
      </div>
    )
}
