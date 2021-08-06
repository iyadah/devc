import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ExamItem from './ExamItem';

import { getExams } from '../../actions/exam'

const Exams = ({ getExams, exam: { exams, loading } }) => {
    useEffect(() => {
        getExams();
    }, [getExams])
    return (
        <div>
            <h1>Exam list</h1>
            <div className="exams">
                    {
                    exams.length > 0 ? (
                        exams.map(exam=>(<ExamItem key={exam._id} exam={exam} />
                        //exams.map(exam=>(<h1>{exam.description}</h1> 
                    ))): <h4> No Exams...</h4>
                }
            </div>

        </div>
    )
}

Exams.propTypes = {
    getExams: PropTypes.func.isRequired,
    exam: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    exam: state.exam
});

export default connect(mapStateToProps, {getExams})(Exams);
