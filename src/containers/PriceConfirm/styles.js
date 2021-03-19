import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    quoteContainer:{
      marginTop: 20,
      width:'100%',
      alignItems:'center'
    },
    itemContainer:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    totalPriceContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical: 15,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginTop: 5
    },
    totalTxt: {
      fontFamily: Fonts.bold,
      color: Colors.black,
      fontSize: 16
    },
    itemTxt:{
        fontFamily: Fonts.regular,
        color: Colors.grayThree,
        fontSize: 16
    },
    headerTxt:{
        fontFamily: Fonts.bold,
        fontSize: 18
    },
    priceContainer:{
        width:'100%',
        paddingHorizontal: 50,
        marginTop: 20
    },
    screenContainer:{
        flex: 1,
        alignItems:'center',
    },
    labelTxt:{
        fontFamily: Fonts.bold,
        fontSize: 18
    },
    btnPrimary:{
        marginTop:20,
        borderRadius: 10,
        backgroundColor:Colors.mango,
        paddingVertical: 10,
        alignItems:'center',
    },
  btnTextWhite:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  btnTextGray:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.grayThree
  },
  btnContainer:{
    width:'100%',
    paddingHorizontal: 20,
    bottom: 20,
    position:'absolute'
  }
});

export default styles;