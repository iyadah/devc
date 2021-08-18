import { GET_SERVICES, SERVICE_ERROR } from "./types";
import axios from 'axios';



// Get all services
export const getServices = () => async (dispatch) => {
  
    try {
      const res = await axios.get('/api/services');
      dispatch({
        type: GET_SERVICES,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: SERVICE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

