import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {GAME_OVER_REASONS} from "../Constants";


export default class OutOfTimeAlert extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shouldRender: false,
        }
    }

    componentDidMount() {
        this.setState({
            shouldRender: this.props.shouldRender
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            shouldRender: nextProps.shouldRender
        })
    }


    getTitleInfo(){
        let gameOverReason = popperStore.getState().gameState.gameOverReason
        switch(gameOverReason){
            case GAME_OVER_REASONS.TIME :
                return "Temps écoulé !"
            case GAME_OVER_REASONS.WRONG_CLICK :
                return "Mauvaise bulle !"
            default :
                return 'Euh....'
        }
    }

    render() {
        if (this.state.shouldRender === true) {
            return (
                <View style={styles.mainContainer}>
                    <Text style={styles.infoTitle}>
                        {this.getTitleInfo()}
                    </Text>
                    <View style={styles.simpleRow}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.props.restartGame()
                            }}
                        >
                            <Text style={styles.buttonLabel}>
                                Recommencer
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                alert('Cette fonctionnalité n\'a pas encore été implémentée.\n' +
                                    'Veuillez continuer à jouer.\n\n' +
                                    'Maintenant.')
                            }}
                        >
                            <Text style={styles.buttonLabel}>
                                Quitter
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else return null
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        zIndex: 10,
        top: '40%',
        left: '15%',
        height: '15%',
        width: '70%',
        borderWidth: 1,
        borderColor: '#181bff',
        backgroundColor: '#61e2ff',
        borderRadius: 5,
        justifyContent: 'space-around',

    },
    simpleRow: {

        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    infoTitle: {
        fontSize: 22,
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#cbffee',
        borderRadius: 50,
        padding: 4,
    },
})
