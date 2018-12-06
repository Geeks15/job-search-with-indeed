import React from 'react';
import {createBottomTabNavigator,createAppContainer, createStackNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';

import store from './store/store'; 

import registerForNotifications from './services/notification';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingScreen';
import ReviewScreen from './screens/ReviewScreen.js';
    


const MainNavigator = createStackNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main:{
        screen: createBottomTabNavigator({
          Map:{ screen : MapScreen},
          Deck: { screen : DeckScreen},
          review: {
            screen: createStackNavigator({
              review: { screen : ReviewScreen },
              settings: {screen : SettingsScreen }
              
            })
          }
        })
      }
    
    },{
      headerMode:"none"
    });

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {


  componentDidMount(){
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
      });
    }
    registerForNotifications();
    // Notifications.addListener((notification) => {
    //   const { data: { text }, origin } = notification;

    //   if (origin === 'received' && text) {
    //     Alert.alert(
    //       'New Push Notification',
    //       text,
    //       [{ text: 'Ok.' }]
    //     );
    //   }
    // });
    this._notificationSubscription = Notifications.addListener(()=>{});
  }
  render() {
    return <Provider store={store}><AppContainer style={{flex:1}}/></Provider>;
  }
}
