import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getExamById } from '../../actions/exam';

const Exam = ({ getExamById, exam: { exam, loading }, match }) => {
    const [formData, setFormData] = useState({
        title: '',
        id: ''
    });

  useEffect(() => {
    getExamById(match.params.id);
    setFormData({
        title: loading || !exam.title ? '' : exam.title

    },[loading]);

  }, [getExamById, match.params.id]);

  function questionType(type){
      switch(type){
          case 1:
              return "radio"
          case 2:
              return "checkbox"
          case 3:
              return "text"
          case 4:
              return "textarea"
      }
  }
  const  {
    title=''
  } = formData;


  const onSubmit = (e) => {
    console.log(formData); 
    return;
  };
  return (
    <Fragment>
      {exam === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/exams" className="btn btn-light">
            Back To Exams
          </Link>
          <br />
          <form onSubmit={ e => onSubmit(e)}>
          {exam.title}
          <br />
          {exam.description}
          <br />
          {exam.question.map(question=>(
          <div>Question:{question.title} type: {questionType(question.typeOfQuestion)} <br /> 
          {question.options.map((option, i )=>{
              return (
              <div>
              <li><input type={questionType(question.typeOfQuestion)} name={question._id} value={option}></input>
              <label> {option}</label></li>
              </div>
              )   
          })}
           
          
           </div>))}
         <br />
         <input type="submit" />
         </form>
        


         </Fragment>
)}
</Fragment>
);
};

Exam.propTypes = {
getExamById: PropTypes.func.isRequired,
exam: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
exam: state.exam
});

export default connect(mapStateToProps, { getExamById })(Exam);

