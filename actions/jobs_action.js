import {JOBS_SEARCH_SUCCESS,SAVE_LIKED_JOB,DELETE_LIKED_JOB} from './type';
import axios from 'axios';
import {Location} from 'expo';
import qs from 'qs';
import {persistedStore} from '../store/store'

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '1388736040132108',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
  co: 'India'
};

const buildJobsUrl = (city) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: city });
  return `${JOB_ROOT_URL}${query}`;
};

export const jobSearch= (region,callback) => async dispatch => {

   
    let location =   await Location.reverseGeocodeAsync({longitude:region.longitude,latitude:region.latitude});
  
    let url = buildJobsUrl(location[0].city);

    let {data} = await axios.get(url);
  
    dispatch({type: JOBS_SEARCH_SUCCESS, payload:{data,region}});
    callback();


    
} 

export const saveLikedJob= (job) => async dispatch =>{

    // let likedJobs = await AsyncStorage.getItem('likedJobs');
    // if(likedJobs){
    //     await AsyncStorage.setItem('likedJobs',likedJobs.push(job));
    // }
    // else{
    //     await AsyncStorage.setItem('likedJobs',[job]);
    // }

dispatch({type:SAVE_LIKED_JOB,payload:job}) 
}

export const deleteJobs= () => async dispatch =>{
    persistedStore.purge();
    dispatch({type:DELETE_LIKED_JOB}) 
    }