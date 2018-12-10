import {GET_LOCATION} from '../actions/type';


const INITIAL_STATE ={
    longitude: 77.67,
    latitude: 12.9,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
}
export default function(state=INITIAL_STATE, actions){
switch(actions.type){
    case GET_LOCATION:
        return actions.payload
    default:
        return state;
}
}