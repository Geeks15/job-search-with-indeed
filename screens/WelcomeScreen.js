import React, {Component} from 'react';
import {View,Text,AsyncStorage} from 'react-native';
import {AppLoading} from 'expo';

import Slides from './../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set your location', color: '#03A9F4' }
  ];

class WelcomeScreen extends Component{
    state= {token:false}

    async componentWillMount(){
      // AsyncStorage.removeItem('fb_token');
        let token = await AsyncStorage.getItem('token');
         console.log(`token is: ${token}`);
        if(token){
            console.log(`token is: ${token}`)
            this.setState({token})
            this.props.navigation.navigate('Map');
        }
    

    }
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }
    render(){
        if(!this.state.token)
            return <AppLoading />
        else
         return (
            <View>
                <Slides data={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete}/>
            </View>

        )
    }
}

export default WelcomeScreen;