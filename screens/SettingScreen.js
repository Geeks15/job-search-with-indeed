import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component{

    deleteSavedJobs = ()=> {
        this.props.deleteJobs();
        this.props.navigation.navigate('Review');
    }
    render(){
        return (
            <View>
              <Button 
              large
              title="Delete All Saved Jobs" 
             backgroundColor="tomato"
             buttonStyle={{marginTop:20}}
             icon={{ name: 'delete' }}
             onPress={this.deleteSavedJobs}
             /> 

            </View>
        )
    }
}

export default connect(null,actions)(SettingsScreen);