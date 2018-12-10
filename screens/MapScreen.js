import React, {Component} from 'react';
import {View,ActivityIndicator,Platform} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import {Button,Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import * as actions from '../actions';

class MapScreen extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />;
          },
        tabBarLabel: 'Map'
      };

    state = {
        errorMessage: null,
        mapLoaded: false,
        region:{
            longitude: 77.67,
            latitude: 12.9,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }
    // componentWillMount() {

    //     console.log(`Inside componentWIllMoiunt`);
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //       this.setState({
    //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //       });
    //     } else {
    //         console.log(`Inside func call`);
    //       this._getLocationAsync();
    //     }
    //   }
    
      componentWillReceiveProps(nextProps){

          this.setState({region:nextProps.region})
      }


  
    componentDidMount(){
        this.setState({mapLoaded: true})
        this._getLocationAsync();
    }
    _getLocationAsync = async () => {
       
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
      
    //     // if (status !== 'granted') {
    //     //   this.setState({
    //     //     errorMessage: 'Permission to access location was denied',
    //     //   });
    //     // }
        
    //     let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    //    console.log(`CurrentLocation: ${JSON.stringify(location)}`);
    //     let region = {
    //         longitude: coords.longitude,
    //         latitude: coords.latitude,
    //         longitudeDelta: 0.04,
    //         latitudeDelta: 0.09
    //     }
    this.props.getLocation();
        this.setState({ region:this.props.region});
        this.props.getLocation();
      };
    onRegionChangeComplete=(region) => {
        this.setState({region})
    }

    onSearch = () => {

        this.props.jobSearch(this.state.region,()=>{this.props.navigation.navigate('Deck')});
        


    }
    render(){
        if(!this.state.mapLoaded)
            return (
                <View style={{flex:1,justifyContent: 'center'}}> 
                    <ActivityIndicator />
                </View>
                
                )
        else        
            return (
                <View style={{flex: 1}}>
                    <MapView  
                    style = {{flex:1}} 
                    region={this.state.region} 
                    onRegionChangeComplete = {this.onRegionChangeComplete}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            large
                            title="Search This Area"
                            backgroundColor="#009688"
                            icon={{ name: 'search' }}
                            onPress={this.onSearch}
                            
                        />
                    </View>
                </View>
        )
    }
}

const styles = {
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0
    }
  }

  function mapStateToProps({region}){
      if(region)
      return {region};
  }
export default connect(mapStateToProps,actions)(MapScreen);