import React from "react";
import {Text, View} from "react-native";
import Popper from "../../Components/Popper/Popper";
import {mainProperties} from "../../Configuration/MainProperties";
import {GameState} from "../../DataManagement/GameState";
import {PopperData} from "../../Model/PopperData";


export default class GameContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            poppers : [],
            popCounter : 0,
            gameOver:false,
            poppersDataArray: []
        }

    }


    componentDidMount() {

        this.initPoppers()
    }

    restartGame(){
        this.initPoppers()
        // this.setState({gameOver:false})
        // popperStore.dispatch(poppersHasReRendered())
        // this.initPoppers()
    }


    randomIntFromInterval(min,max) {

        return Math.floor(Math.random()*(max-min+1)+min);
    }


    initPoppersValue(rawPoppersDataArray){
        let poppersDataArray = rawPoppersDataArray
        let previousValues = []
        let i = 0

        while (i < poppersDataArray.length){
            let valueToAssign = (Math.random() * (100 - 3) + 3).toFixed()
            if (previousValues.includes(valueToAssign)){
                //nope
            } else {
                poppersDataArray[i].setValue(valueToAssign)
                previousValues.push(valueToAssign)
                i++
            }
        }

        return poppersDataArray
    }

    initPoppersCoordinates(index) {

        let leftPosition
        let topPosition

        leftPosition = ((this.randomIntFromInterval(0, 80) / 100) * mainProperties.screenWidth).toFixed(0)

        let min = 0
        index === 0 ? min = 0 : min = 30 * index
        let max = 100
        index === 0 ? max = 15 : max = 30 * index
        topPosition = ((this.randomIntFromInterval(min, max) / 100) * mainProperties.screenHeight).toFixed(0)

        return {
            leftPosition,
            topPosition
        }
    }

    initPoppers(){

        // TODO: export init logic in PopperList object

        let popperNumber = GameState.getMaxPoppersNumber()
        let poppersDataArray = []
        //initialise poppers
        for (let i = 0; i < popperNumber; i++) {
            poppersDataArray.push(new PopperData(i))
        }

        poppersDataArray = this.initPoppersValue(poppersDataArray)

        for (let i = 0; i < poppersDataArray.length; i++) {
            poppersDataArray[i].setCoordinates(this.initPoppersCoordinates(i))
            poppersDataArray[i].initOperation()

        }
        console.log(poppersDataArray)
        this.setState({poppersDataArray})
    }

    pop(key){
        console.log("split a popper")
        let nextPoppersDataArray = []
        for(let i =0; i < this.state.poppersDataArray.length; i++){
            if (key === this.state.poppersDataArray[i].key){
                nextPoppersDataArray = this.state.poppersDataArray
                nextPoppersDataArray.splice(i,1)

            }
        }

        this.setState({
                poppersDataArray: nextPoppersDataArray,
                popCounter: this.state.popCounter += 1,
            },
            () => {
                if (nextPoppersDataArray.length === 0) {
                    this.restartGame()
                }
            })



    }

    onPopperPress(pressedPopper){
        console.log("pressed")
        let minValue = 101
        this.state.poppersDataArray.map((popper)=>{
            if (minValue > popper.getValue()){
                minValue = popper.getValue()
            }
        })
        console.log(pressedPopper.getValue() === minValue)
        if (pressedPopper.getValue() === minValue){
            this.pop(pressedPopper.key)
        } else{
            //TODO: loose on wrong press?
        }
    }

    renderPoppers(){
        return this.state.poppersDataArray.map((item)=>{
            return <Popper
                key={item.key}
                item={item}
                onPress={()=>{
                    this.onPopperPress(item)
                }}
            />
        })
    }


    render() {
        return (
            <View style={{
                flex:1,
                height:'100%',
                width:'100%',
                backgroundColor:'#ffffe7'
            }}>
        {/*        <OutOfTimeAlert
                    shouldRender={this.state.gameOver}
                    restartGame={()=>this.restartGame()}
                />*/}
                <View
                style={{
                    width:'100%',
                    height:'10%',
                    flexDirection :'row',
                    alignItems:'center',
                    borderWidth:1,
                    justifyContent:'space-around',
                }}
                >
                <Text
                    style={{

                    }}
                >
                    POPPED : {this.state.popCounter} !
                </Text>
                    {/*<MilliTimer
                        counterHasEnded={()=>popperStore.dispatch(resetPopCounter(GAME_OVER_REASONS.TIME))}
                        ref={(ref) => {
                            this.timer = ref
                        }}
                    />*/}
                </View>

                {this.renderPoppers()}
            </View>
        )
    }
}
