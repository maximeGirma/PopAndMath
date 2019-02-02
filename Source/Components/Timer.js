
import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

export default class Timer extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            timer : 10,
            currentLevel : 0,
        }
    }

    componentDidMount() {
        this.setState({currentLevel : popperStore.getState().gameState.currentLevel})
       //TODO : use props
        /* popperStore.subscribe(()=>{
            let datas = popperStore.getState().gameState
            if(datas.poppersShouldReRender === true){
                this.setState({
                    currentLevel : datas.currentLevel,
                    timer : 10,
                })
            }
        })*/
        this.initTimer()

    }

    initTimer(){
        if(this.state.timer > 0){
            setTimeout(()=>{
                this.setState({
                    timer : this.state.timer - 1
                })
                this.initTimer()
            },1000)
        }else{
            //TODO: use callback props
            // popperStore.dispatch(resetPopCounter())
        }
    }

    render() {
        return (
            <View style={{
                flexDirection:'row',
            }}>
                <View>
                    <Text>
                        {this.state.timer}
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    unitContainer:{

    }
})
