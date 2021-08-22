import { GET_SERVICES, SERVICE_ERROR, GET_SERVICE, GET_MYSERVICES } from "../actions/types";

const initialState = {
    service: null,
    services: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        case GET_SERVICES:
        case GET_MYSERVICES:

            return{
                ...state,
                services: payload,
                loading: false
            };
 
        case GET_SERVICE:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case SERVICE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }

}