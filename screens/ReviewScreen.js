import React, {Component} from 'react';
import {ScrollView,Text,View,Platform,Linking} from 'react-native';
import {Button,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Card} from 'react-native-elements';
import {MapView} from 'expo';

class ReviewScreen extends Component{

static navigationOptions = ({navigation})=>{
    return ({
        tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor} />;
      },
    headerRight:( <Button title='Settings' onPress={()=> navigation.navigate('settings')} backgroundColor="rgba(0,0,0,0)" color="rgba(0,122,255,1)"/>)
        
    })}


    renderCardList = () => {
        
        return  this.props.likedJobs.map((job)=>{
          return (
            <Card title={job.jobtitle} key={job.jobkey}>
            <View style={{height:300}}>
            <MapView
             scrollEnabled={false}
             style={{ flex: 1 }}
             cacheEnabled={Platform.OS === 'android' ? true : false}
             initialRegion={this.props.region}
            >

            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(job.url)}
            />
            </View>
        </Card>
          )
      });
           
        
    }
    render(){
        if(this.props.likedJobs.length==0)
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Card title="No Saved Jobs">
            <Button
              title="Back To Map"
              large
              icon={{ name: 'my-location' }}
              backgroundColor="#03A9F4"
              onPress={() => this.props.navigation.navigate('Map')}
            />
          </Card>
          </View>
        );
        else
        return (
            
            <ScrollView>
            {this.renderCardList()}

            </ScrollView>
        )
    }
}
const styles = {
    italics: {
      fontStyle: 'italic'
    },
    detailWrapper: {
      marginTop: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  }
function mapStateToProps ({likedJobs,region}){
 
    return {likedJobs,region};


}
export default connect(mapStateToProps,actions)(ReviewScreen);