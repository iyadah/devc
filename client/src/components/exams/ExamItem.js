import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const examItem = ({exam: {title, description, numberOfQuestions, question}}) => {
    return (
        <div className="profile bg-light">
            <div>{title}</div>
            <div>{description}</div>
            <div>{numberOfQuestions}</div>
            <div>{question.length}</div>

        </div>
    )
}

examItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default examItem
