import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const examItem = ({exam: {_id, title, description, numberOfQuestions, question}}) => {
    return (
        <div>
        <div className="bg-light">
            <div>Title: <Link to={`/exam/${_id}`}>{title}</Link></div>
            <div>Description: {description}</div>
            <div># of Questions: {numberOfQuestions}</div>
            <div>Current questions #: {question.length}</div>
        </div>
        <div>
            <h2>Questions</h2>
            {question.map(question=>(<h3>Question: {question.title}</h3>
            )) }
        <br />
        <hr />
        <br />
       </div>

       </div>
    )
}

examItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default examItem
