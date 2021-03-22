import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    headerTxt:{
        fontFamily: Fonts.bold,
        fontSize: 18
    },
    btnContainer:{
        width:'100%',
        paddingHorizontal: 20
    },
    screenContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    labelTxt:{
        fontFamily: Fonts.regular,
        fontSize: 18
    },
    btnGetQuote:{
        marginTop:20,
        borderRadius: 10,
        backgroundColor:Colors.mango,
        paddingVertical: 15,
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
  btnSchedule:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.grayLine,
    paddingVertical: 15,
    alignItems:'center',
  }
});

export default styles;