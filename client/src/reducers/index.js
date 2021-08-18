import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post'; 
import exam from './exam';
import service from './service'
export default combineReducers({
    alert,
    auth,
    profile,
    post,
    exam,
    service
});