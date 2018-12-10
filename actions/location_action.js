import { GET_LOCATION } from './type';
import {Location} from 'expo';

export const getLocation=()=> {
  
    return async (dispatch)=>{
     
        try{
        let {coords} = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    
        let region = {
            longitude: coords.longitude,
            latitude: coords.latitude,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
        dispatch({type:GET_LOCATION, payload:region})
    }catch(err){
        console.log(`err${err}`)
    }
       
    }
}