import React, {Component} from 'react';
import {View,AsyncStorage} from 'react-native';


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
       
        if(token){
            this.setState({token})
            this.props.navigation.navigate('Map');
        }
    

    }
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }
    render(){
        
         return (
            <View>
                <Slides data={SLIDE_DATA} onSlidesComplete={this.onSlidesComplete}/>
            </View>

        )
    }
}

export default WelcomeScreen;