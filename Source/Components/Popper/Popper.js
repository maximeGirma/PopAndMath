import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {popperStyle} from "./popperStyle";


export default class Popper extends React.Component {


    constructor(props) {

        super(props)
        console.log("dans le popper")
        console.log(this.props.item)
        this.state = {
            position: {
                left: this.props.item.getLeftPosition(),
                top: this.props.item.getTopPosition(),
            },
            number: this.props.item.getValue(),
            numberLabel:this.props.item.getOperation(),
            ready: false,
            popped: false,
            backgroundColor : this.getBackgroundColor(),
        }
    }


    getBackgroundColor(){
        let randomInt = parseInt((Math.random()*100).toFixed(0))
        if (randomInt < 10){
            return '#ffb1ea'
        }else if (randomInt < 20){
            return '#e689ff'
        }else if (randomInt < 30){
            return '#55baff'
        }else if (randomInt < 40){
            return '#3f44ff'
        }else if (randomInt < 50){
            return '#6cffe2'
        }else if (randomInt < 60){
            return '#50ff26'
        }else if (randomInt < 70){
            return '#dbff88'
        }else if (randomInt < 80){
            return '#ffd61d'
        }else if (randomInt < 90){
            return '#ff730e'
        }else{
            return '#ff1212'
        }
    }

    managePop() {
        this.props.onPress()
        /*if (this.props.popperIndex === popperStore.getState().gameState.nextPopperToPop) {
            console.log('c\'est le bon')
            console.log(this.props.popperIndex + popperStore.getState().gameState.nextPopperToPop)
            popperStore.dispatch(popperHasPopped(this.props.popperIndex))
        } else {
            popperStore.dispatch(resetPopCounter(GAME_OVER_REASONS.WRONG_CLICK))
        }*/
        //TODO: Use callback props
    }

    render() {

            return (
                <TouchableOpacity
                    onPress={() => this.managePop()}
                    style={[
                        popperStyle.mainContainer,
                        {
                            left: this.state.popped ? -1000 : parseInt(this.state.position.left),
                            top: parseInt(this.state.position.top),
                        },
                        {backgroundColor : this.state.backgroundColor}
                    ]}
                >
                    <Text
                        style={popperStyle.text}
                    >{this.state.numberLabel}</Text>
                </TouchableOpacity>
            )
    }
}
