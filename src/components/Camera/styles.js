import { StyleSheet } from "react-native";
import { Colors, Fonts} from "../../theme";
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';

const styles = StyleSheet.create({
    cameraContainer:{
      flex: 1,
      paddingVertical: 70,
      backgroundColor:'#000'
    },
    BtnTakeSnap:{
      color: '#fff',
      fontFamily:Fonts.bold,
      fontSize: RFValue(18, STANDARD_SCREEN_SIZE)
    },
    closeTxt:{
      color: '#000',
      fontFamily:Fonts.bold,
      fontSize: RFValue(18, STANDARD_SCREEN_SIZE)
    },
    BtnsContainer:{
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    cameraPreview:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    closeButton:{
      marginTop:20,
      borderRadius: 10,
      backgroundColor:Colors.white,
      paddingVertical: 15,
      alignItems:'center',
      paddingHorizontal: 20
    },
    captureButton:{
      marginTop:20,
      borderRadius: 10,
      backgroundColor:Colors.mango,
      paddingVertical: 15,
      alignItems:'center',
      paddingHorizontal: 35
    },
})

export default styles;