import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
    btnPrimary:{
        borderRadius: 10,
        backgroundColor:Colors.mango,
        paddingVertical: 10,
        alignItems:'center',
        paddingHorizontal: 40
    },
  deliveryBox: {
    width: 321,
    height: 145,
    borderRadius: 10,
  },
  dateBox: {
    width: 321,
    height: 126,
    borderRadius: 10,
  },
});

export default styles;