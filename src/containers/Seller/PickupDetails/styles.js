import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
    changeTxtButtonContainer:{
      flex:1
    },
    mapView:{
      width:600,
      height: 450
    },
    mapContainer:{
      flex: 3
    },
    txtPrimary:{
      color: Colors.mango,
      fontSize: 16
    },
    firstElement:{
      flex: 3,
      fontFamily: Fonts.regular,
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
});

export default styles;