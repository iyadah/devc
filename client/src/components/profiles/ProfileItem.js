import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const profileItem = ({profile: {user:{_id, name,avatar}, status, company, location, skills}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} />
            <div>{name}</div>
            <div>{status}</div>
            <div>{company}</div>
            <div>{location}</div>
            <div><Link to={`/profile/${_id}`}>view profile</Link></div>
            <ul>
                {skills.slice(0,4).map((skill, index)=>(
                    <li key={index} className="text-primary">
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

profileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default profileItem
