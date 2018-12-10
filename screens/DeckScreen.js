import React, {Component} from 'react';
import {View,Text,Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card,Button,Icon} from 'react-native-elements';
import {MapView} from 'expo';
import Swiper from 'react-native-deck-swiper';
import _ from 'lodash';



import * as actions from '../actions';


class DeckScreen extends Component{

    // publisher ID: 1388736040132108   
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
          },
        tabBarLabel: 'Jobs'
      }
     state= {swipedAll:false};

    
    
    componentWillReceiveProps(nextProps){
    
       this.props.allJobs = nextProps.allJobs;
       this.props.likedJobs = nextProps.likedJobs;
    }
    renderCard = (job) => {
      if(_.find(this.props.likedJobs, {jobkey: job.jobkey}))
        return null;
        const initialRegion = {
          longitude: this.props.region.longitude,
          latitude:  this.props.region.latitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.02
        };
    
        return (
          <Card title={job.jobtitle}>
            <View style={{ height: 300 }}>
              <MapView
                scrollEnabled={false}
                style={{ flex: 1 }}
                cacheEnabled={Platform.OS === 'android' ? true : false}
                initialRegion={initialRegion}
              >
              </MapView>
            </View>
            <View style={styles.detailWrapper}>
              <Text>{job.company}</Text>
              <Text>{job.formattedRelativeTime}</Text>
            </View>
            <Text>
              {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
            </Text>
          </Card>
        );
      }
    
      renderNoMoreCards = () => {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Card title="No More Jobs">
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
      }
      onSwipedRight=(cardIndex)=>{
       
        if(!_.find(this.props.likedJobs, {jobkey:this.props.allJobs[cardIndex].jobkey}))
            this.props.saveLikedJob(this.props.allJobs[cardIndex]);
      
      }
       isArrayEqual = (x, y) => {
        return _(x).xorWith(y, _.isEqual).isEmpty();
      };
    render(){
      
      if(_.differenceBy(this.props.allJobs,this.props.likedJobs,'jobkey').length == 0)
           return this.renderNoMoreCards();
        else
            return (
            <View style={{flex:1}}>
               <Swiper ref={swiper => {
            this.swiper = swiper
          }}
            cards={this.props.allJobs}
            renderCard={this.renderCard}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {this.setState({swipedAll:true})}}
            onSwipedRight= {this.onSwipedRight}
            cardIndex={0}
            backgroundColor={'#fff'}
            stackSize= {10}>
        </Swiper>

            </View>
        )
    }
}

const styles = {
    detailWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10
    }
  };
function mapStateToProps({ jobs,likedJobs }) {
  
    if(jobs.data){
       
        return { allJobs:jobs.data.results, region:jobs.region,likedJobs };
      }
    else 
        return { allJobs:[], region:{} ,likedJobs:[]};
        
  }
  
  export default connect(mapStateToProps, actions)(DeckScreen);