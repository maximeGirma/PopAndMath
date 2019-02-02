import React from "react";
import {ActivityIndicator, Text, TouchableOpacity, View, StyleSheet} from "react-native";


export default class MilliTimer extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            time : null,
            initialTime: null,
            timeInterval: null,
            ready: false,
            counterIsRunning : false,
            blink : false,
            blinkCounter : 0,
            gameHasStopped: false,
        }
    }

    componentDidMount() {

        this.setState({
            time: this.props.initialTime === undefined ? 10 : this.props.initialTime,
            initialTime: this.props.initialTime === undefined ? 10 : this.props.initialTime,
            timeInterval: this.props.timeInterval === undefined ? 0.05 : this.props.timeInterval,
            counterIseRunning: true,
            ready: true,
        })
        setTimeout(() => {
            this.decount()
        }, 0)
    }

    decount() {

        if (this.state.time > 0 && !this.state.gameHasStopped) {
            this.setState({
                time: (this.state.time - this.state.timeInterval).toFixed(3)
            })

            setTimeout(() => {
                this.decount()
            }, (this.state.timeInterval)*1000)
        } else {
            this.setState({counterIsRunning : false})
            if (this.props.counterHasEnded !== undefined){
                setTimeout(()=>{this.props.counterHasEnded()},0)

            }
        }
    }

    stopTimer(){
        this.setState({gameHasStopped:true})
    }

    restartTimer(){
        this.setState({
            time: this.props.initialTime === undefined ? 10 : this.props.initialTime,
            initialTime: this.props.initialTime === undefined ? 10 : this.props.initialTime,
            timeInterval: this.props.timeInterval === undefined ? 0.05 : this.props.timeInterval,
            gameHasStopped:false,
            ready: true,
        })
        console.log("is counter still running ?",this.state.counterIsRunning)
        if (this.state.counterIsRunning === false) {
            console.log('on tue des enfants')
            setTimeout(()=>{this.decount()},0)
            this.setState({counterIsRunning : true})
        }
    }

    //TODO: La fonction est appellée 20 fois en 1/2 secondes, need delayer les blinks.
    getCounterToDisplay(){
        if (this.state.time > 0){
            return this.state.time
        } else if((this.state.blinkCounter < 10) && ((this.state.time == 0) || this.state.gameHasStopped === true)){
            console.log("shouldBlink")
            if (this.state.blink === true){
                setTimeout(()=>{
                    this.setState({
                        blink : false,
                        blinkCounter : this.state.blinkCounter + 1,
                    })
                },200)
                return null
            } else if (this.state.blink === false){
                setTimeout(()=>{
                    this.setState({
                        blink : true,
                        blinkCounter : this.state.blinkCounter + 1,
                    })
                },200)
                return this.state.time
            }
        } else return this.state.time
    }

    getCounterColor(){
        if(this.state.time > (this.state.initialTime*0.90).toFixed(2)){
            return COLOR.LIGHT_GREEN
        } else if (this.state.time > (this.state.initialTime*0.80).toFixed(2)){
            return COLOR.GREEN
        } else if (this.state.time > (this.state.initialTime*0.70).toFixed(2)){
            return COLOR.DARK_GREEN
        } else if (this.state.time > (this.state.initialTime*0.60).toFixed(2)){
            return COLOR.LIGHT_BLUE
        } else if (this.state.time > (this.state.initialTime*0.50).toFixed(2)){
            return COLOR.BLUE
        } else if (this.state.time > (this.state.initialTime*0.40).toFixed(2)){
            return COLOR.DARK_BLUE
        } else if (this.state.time > (this.state.initialTime*0.30).toFixed(2)){
            return COLOR.PURPLE
        } else if (this.state.time > (this.state.initialTime*0.20).toFixed(2)){
            return COLOR.LIGHT_RED
        } else if (this.state.time > (this.state.initialTime*0.10).toFixed(2)){
            return COLOR.RED
        } else if (this.state.time > 0){
            return COLOR.DARK_RED
        }
    }

    render() {
        if (!this.state.ready) {
            return (
                <View>
                    <ActivityIndicator
                    style={styles.loadingSpinner}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Text
                    style={{
                        color : this.getCounterColor(),
                        fontSize:20,

                    }}
                    >
                        {this.getCounterToDisplay()}
                    </Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    loadingSpinner:{

    }
})


const COLOR = {
    LIGHT_GREEN : "#ceff25",
    GREEN : "#5bff25",
    DARK_GREEN : "#26ffa9",
    LIGHT_BLUE : "#19f8ff",
    BLUE : "#1caeff",
    DARK_BLUE : "#493aff",
    PURPLE : "#ff5aff",
    LIGHT_RED : "#ff0b73",
    RED : "#ff3e31",
    DARK_RED : "#b41723",
}
