import { GET_EXAMS, EXAM_ERROR } from "./types";
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