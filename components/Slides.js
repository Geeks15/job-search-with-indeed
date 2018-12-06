import React from 'react';
import {ScrollView,Text,View,Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
class Slides extends React.Component{


    renderLastSlide(index){
        if(index === this.props.data.length - 1 )
            return (
                <Button title="Start" onPress={()=> 
                    this.props.onSlidesComplete()}
                    large 
                    raised 
                    backgroundColor={'#0288D1'} 
                    containerViewStyle={{marginTop:35}} 
                    />
            )
    }
    renderSlides(){
        console.log(this.props.data);
        return this.props.data.map((slide,index)=>{

            return (<View
                    key={index}
                    style={[styles.viewStyle,{backgroundColor:slide.color}]}>
                        <Text style={styles.textStyle}>{slide.text}</Text>
                        {this.renderLastSlide(index)}
                    </View>)
        })
    }
    render(){
       return ( <ScrollView
                style={{height:DEVICE_HEIGHT}}
                  horizontal
                  pagingEnabled  
                >
                {this.renderSlides()}
                </ScrollView>
                )
            }
}

const styles = {
    viewStyle:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width:DEVICE_WIDTH,


        
    },
    textStyle:{
        fontSize:30,
        color:'#fff'
    }

}
export default Slides;