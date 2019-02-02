import {StyleSheet} from "react-native";
import {mainProperties} from "../../Configuration/MainProperties";

export const popperStyle = StyleSheet.create({
    mainContainer:{
        height:mainProperties.screenHeight*0.15,
        width:mainProperties.screenHeight*0.15,
        borderRadius:mainProperties.screenHeight*0.15,
        backgroundColor:'blue',
        justifyContent: 'center',

        position:'absolute',
    },
    text:{
        alignSelf:'center',
        textAlign:'center',
        color:'white',
        fontSize:22,
    }
})
