import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
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
    screenContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    btnContainer:{
      width:'100%',
      paddingHorizontal: 20,
      bottom: 20
    }
});

export default styles;