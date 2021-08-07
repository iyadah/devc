import { GET_EXAMS, EXAM_ERROR, GET_EXAM } from "./types";
import axios from 'axios';



// Get all exams
export const getExams = () => async (dispatch) => {
  
    try {
      const res = await axios.get('/api/exams');
      dispatch({
        type: GET_EXAMS,
        payload: res.data
      });
      console.log(res.data);

    } catch (err) {
      dispatch({
        type: EXAM_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Get EXAM by ID
export const getExamById = (examId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/exams/${examId}`);

    dispatch({
      type: GET_EXAM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXAM_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};