import React, {Component} from 'react';
import {View,ActivityIndicator,Platform} from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import reverseGeocode from 'latlng-to-zip';

class MapScreen extends Component{

    state = {
        errorMessage: null,
        mapLoaded: false,
        region:{
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
    //       try{
    //    let data = await  reverseGeocode({
    //     longitude: -122,
    //     latitude: 37});
    //    console.log(`YOUR LOCATION IS : ${data}`);
    //     }
    //     catch(err){
    //         console.log(`YOUR LOCATION IS : ${JSON.stringify(err)}`);
    //     }
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        
        let {coords} = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
       
        let region = {
            longitude: coords.longitude,
            latitude: coords.latitude,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
      let zipcode =   await Location.reverseGeocodeAsync({longitude:coords.longitude,latitude:coords.latitude});
        console.log(`reverseGEocode is : ${JSON.stringify(zipcode)}`);
        this.setState({ region });
      };
    componentDidMount(){
        this.setState({mapLoaded: true})
    }
    onRegionChangeComplete=(region) => {
        this.setState({region})
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
                </View>
        )
    }
}

export default MapScreen;