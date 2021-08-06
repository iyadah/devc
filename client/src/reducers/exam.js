import { GET_EXAMS, EXAM_ERROR } from "../actions/types";

const initialState = {
    exam: null,
    exams: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        case GET_EXAMS:
            return{
                ...state,
                exams: payload,
                loading: false
            };
        case EXAM_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;

    }

}