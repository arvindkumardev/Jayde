import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    txtPrimary:{
      color: Colors.mango,
      fontSize: 16
    },
    firstElement:{
      flex: 3,
      fontFamily: Fonts.regular,
      fontSize: 16
    },
    twoElementsContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    txtInput:{
      fontFamily:Fonts.regular,
      fontSize: 16
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    userInputContainer:{
      flex: 1,
      width:'100%',
      paddingHorizontal: 20
    },
    mainContainer:{
      flex: 1,
      paddingBottom: 20
    },
    headerTxt:{
        fontFamily: Fonts.bold,
        fontSize: 18
    },
    btnPrimary:{
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
});

export default styles;