import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Fonts from "../Fonts";

const container = StyleSheet.create({
    btnPrimary:{
        backgroundColor: Colors.mango
    },
    btnSecandary:{
        backgroundColor: Colors.grayBackground
    },
    br10:{
        borderRadius: 10
    },
    w100:{
        width: '100%'
    },
    w45:{
        width: '45%'
    },
    primaryColor:{
        color: Colors.mango
    },
    flexRowSpaceBetween:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    alignCenter:{
        alignItems:'center'
    },
    topBorderGray:{
        paddingTop: 20,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    bottomBorderGray:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    flex1SpaceBetween:{
        flex: 1,
        justifyContent:'space-between'
    },
})

export default container;