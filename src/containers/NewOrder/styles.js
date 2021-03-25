import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import Fonts from "../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.white
    }
});

export default styles;