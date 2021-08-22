import { GET_SERVICES, SERVICE_ERROR, GET_SERVICE, GET_MYSERVICES } from "./types";
import { setAlert } from "./alert";
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

// Get all services for a user
  export const getMyServices = () => async (dispatch) => {
  
    try {
      const res = await axios.get('/api/services/me');
      console.log(res);
      dispatch({
        type: GET_MYSERVICES,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: SERVICE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  export const deleteService = (id) => async (dispatch) => {
    try {
    //  const res = await axios.delete(`/api/profile/service/${id}`);
  
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: SERVICE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  


  export const getServiceById = (serviceId) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/services/${serviceId}`);
  
      dispatch({
        type: GET_SERVICE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: SERVICE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  export const createService = (formData, history, edit = false) => async (
    dispatch
  ) => {
    try {
      const res = await axios.post('/api/services', formData);
  
      dispatch({
        type: GET_SERVICE,
        payload: res.data
      });
  
      dispatch(setAlert(edit ? 'Service Updated' : 'Service Created', 'success'));
  
      if (!edit) {
        history.push('/services');
      }
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: SERVICE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

