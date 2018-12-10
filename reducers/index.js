import {combineReducers} from 'redux';
import auth from './auth_reducer';
import jobs from './job_reducer';
import likedJobs from './liked_reducer';
import region from './location_reducer';

export default combineReducers({
    auth , jobs ,likedJobs, region
});

