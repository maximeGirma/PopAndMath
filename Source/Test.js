import React from "react";
import {Text, TouchableOpacity, Animated, Easing, View} from "react-native";
import {mainProperties} from "./Configuration/MainProperties";


export default class Test extends React.Component {


    constructor(props) {

        super(props)
        this.state = {
            animatedSize: new Animated.Value(0),
            ready: false
        }
        this.state.animatedSize.setValue(0)
        setTimeout(()=>{
            this.setState({
                ready: true
            })
        },200)
    }

    pop() {
        console.log("should anim")
        Animated.timing(
            this.state.animatedSize,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }


    render() {
        var animatedSize = this.state.animatedSize.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 0.05 * mainProperties.screenHeight]
        })
        console.log(animatedSize.__getValue())
        console.log(animatedSize.__getValue() * mainProperties.screenHeight)
        if (this.state.ready){
        return (

                <Animated.View
                    style={[
                        {
                            height: animatedSize,
                            //width: animatedSize,
                            left: 100,
                            top: 200,
                            borderRadius: 200,
                        },
                        {backgroundColor: "purple"}
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => this.pop()}
                        style={{
                            flex: 1,
                            alignSelf: "center"
                        }}
                    >
                        <Text

                        >animate!</Text>
                    </TouchableOpacity>
                </Animated.View>

        )} else {return <View/>}
    }
}
