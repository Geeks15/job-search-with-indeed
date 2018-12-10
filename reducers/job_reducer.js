import {JOBS_SEARCH_SUCCESS} from '../actions/type';

export default function(state = {},action){
    //console.log(`Actions:${JSON.stringify(action.payload)}`);
    switch(action.type){
        case JOBS_SEARCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}