import {SAVE_LIKED_JOB,DELETE_LIKED_JOB} from '../actions/type';
import { REHYDRATE } from 'redux-persist/constants';

export default function(state=[],actions){
    switch(actions.type){
        case REHYDRATE:
            return actions.payload.likedJobs || [];
        case SAVE_LIKED_JOB:
            return [...state,actions.payload]
        case DELETE_LIKED_JOB:
            return [];
        default:
            return state;
    }

}