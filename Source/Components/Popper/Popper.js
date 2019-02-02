import React from "react";
import {Text, TouchableOpacity, Animated, Easing, View} from "react-native";
import {popperStyle} from "./popperStyle";
import {mainProperties} from "../../Configuration/MainProperties";


export default class Popper extends React.Component {

    constructor(props) {

        super(props)
        console.log(this.props.item)
        this.state = {
            position: {
                left: this.props.item.getLeftPosition(),
                top: this.props.item.getTopPosition(),
            },
            number: this.props.item.getValue(),
            numberLabel: this.props.item.getValue(),//this.props.item.getOperation(),
            ready: false,
            popped: false,
            backgroundColor: this.getBackgroundColor(),
            animatedSize: new Animated.Value(0),

        }
       this.state.animatedSize.setValue(0)
        setTimeout(() => {
            this.setState({ready: true})
        }, 200)
    }


    getBackgroundColor() {
        let randomInt = parseInt((Math.random() * 100).toFixed(0))
        if (randomInt < 10) {
            return '#ffb1ea'
        } else if (randomInt < 20) {
            return '#e689ff'
        } else if (randomInt < 30) {
            return '#55baff'
        } else if (randomInt < 40) {
            return '#3f44ff'
        } else if (randomInt < 50) {
            return '#6cffe2'
        } else if (randomInt < 60) {
            return '#50ff26'
        } else if (randomInt < 70) {
            return '#dbff88'
        } else if (randomInt < 80) {
            return '#ffd61d'
        } else if (randomInt < 90) {
            return '#ff730e'
        } else {
            return '#ff1212'
        }
    }

    pop() {
        console.log("should anim")
        Animated.timing(
            this.state.animatedSize,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear
            }
        ).start()
    }


    managePress() {
        let shouldPop = this.props.onPress()
        console.log('should pop ?', shouldPop)
        if (shouldPop) {
            this.pop()
        }
    }

    render() {

        if (this.state.ready) {
            var animatedSize = this.state.animatedSize.interpolate({
                inputRange: [0, 1],
                outputRange: [0.15 * mainProperties.screenHeight, 0.40 * mainProperties.screenHeight]
            })
            var animatedColor = this.state.animatedSize.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.backgroundColor, "#ffffe7"]
            })
            // var animatedLeft = 200
            //var animatedTop = 200
            /*console.log("ouh le bon bug")
            console.log(this.state.position.top)
            console.log((this.state.position.top - mainProperties.screenHeight * 0.125).toFixed())
            var animatedLeft = this.state.animatedSize.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.position.left, this.state.position.left - mainProperties.screenHeight * 0.125]
            })
            var animatedTop = this.state.animatedSize.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 200]
            })
*/
            return (
                <Animated.View
                    style={[
                        popperStyle.mainContainer,
                        {
                            borderRadius: animatedSize,
                            height: animatedSize,
                            width: animatedSize,
                            left: parseInt(this.state.position.left),//animatedLeft,
                            top: parseInt(this.state.position.top),//animatedTop,
                            // position:'absolute',
                            // zIndex: this.props.item.key + 1,
                            backgroundColor: animatedColor
                        }
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => this.managePress()}
                        style={{
                            width:0.15 * mainProperties.screenHeight,
                            height:0.15 * mainProperties.screenHeight,
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: 0.15 * mainProperties.screenHeight,
                        }}
                    >
                        <Text
                            style={popperStyle.text}
                        >{this.state.numberLabel}</Text>
                    </TouchableOpacity>
                </Animated.View>

            )
        } else {
            return <View/>
        }
    }
}
