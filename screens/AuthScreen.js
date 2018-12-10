import React, {Component} from 'react';
import {View,Text,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {facebookLogin} from '../actions';

class AuthScreen extends Component{
    componentDidMount(){
        this.props.facebookLogin();
        AsyncStorage.removeItem('fb_token');
        this.onAuthComplete(this.props);
       
     }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps);
   }
    onAuthComplete(props){

        if(props.token)
           props.navigation.navigate('Map');
    }
    render(){
        return (
            <View />
                
        )
    }
}

function mapStateToProps({auth}) {
    return {token: auth.token}
}
export default connect(mapStateToProps,{facebookLogin})(AuthScreen);