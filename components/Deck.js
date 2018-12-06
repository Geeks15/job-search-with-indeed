import React ,{Component}from 'react';
import {PanResponder,Animated,View,Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
class Deck extends Component{

    constructor(props){
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove:(event,gesture)=> {
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:(event,gesture)=> {
                //this.state.position.setValue({x:0,y:0})
                if(gesture.dx > SWIPE_THRESHOLD){
                    Animated.timing(this.state.position,{
                        toValue: {x:SCREEN_WIDTH + 30,y:0},
                        duration:250
                    }).start(()=> this.onSwipeComplete());
                } else if(gesture.dx < -SWIPE_THRESHOLD ){
                    Animated.timing(this.state.position,{
                        toValue: {x: -SCREEN_WIDTH - 30,y:0},
                        duration:250
                    }).start(()=> this.onSwipeComplete());
                } else{
                    Animated.spring(this.state.position,{
                        toValue: {x:0,y:0}
                    }).start();
                }
                
            } 
         });
         this.state = { panResponder, position, index: 0 }

    }
    
    onSwipeComplete(){
this.state.position.setValue({x:0,y:0});
this.setState({index:this.state.index+1})
    }

    getCardStyle(){

        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH *2.0,0,SCREEN_WIDTH*2.0],
            outputRange: ['-120deg','0deg','120deg']
        })
        return {
            ...this.state.position.getLayout(),
            transform:[{rotate}]
        }
    }
    renderAllCards(){
        return this.props.data.map((item, i) => 
        {   if(i<this.state.index)
                return null
            else if(i==this.state.index){
                return (<Animated.View 
                    key={item.id}
                    style= {[this.getCardStyle(),{position:'absolute',width:SCREEN_WIDTH},{ zIndex: 6 }]}
                    {...this.state.panResponder.panHandlers}
                    > 

            {this.props.renderDeck(item)}
                    </Animated.View>)
            } else{
                return  (
                    <Animated.View key={item.id} style ={{position:'absolute',width:SCREEN_WIDTH,top: 10 *(i-this.state.index),zIndex: 5 }}>{ this.props.renderDeck(item)}</Animated.View>
                );
                   
            }
        }).reverse()}

    render(){
        return (
            <View> 
                {this.renderAllCards()}
            </View>
        )
    }
}
export default Deck;