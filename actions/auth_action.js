import {Facebook} from 'expo';
import {AsyncStorage} from 'react-native';
import {FACEBOOK_LOGIN_FAIL,FACEBOOK_LOGIN_SUCCESS} from './type';




export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token)
        dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
    else 
        doFacebookLogin(dispatch);
}  

const doFacebookLogin = async dispatch => {

    const { type, token} = await Facebook.logInWithReadPermissionsAsync('340068026788102',{
        permissions: ['public_profile']
    });
    if(type === 'cancel')
        dispatch({type: FACEBOOK_LOGIN_FAIL});
    else
        AsyncStorage.setItem('token',token);
        dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload: token});
}