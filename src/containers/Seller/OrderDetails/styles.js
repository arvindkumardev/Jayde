import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';
import {STANDARD_SCREEN_SIZE} from '../../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  confirmButton: {
    marginTop: RfH(20),
    borderRadius: 10,
    backgroundColor: Colors.mango,
    width: RfW(317),
    // paddingVertical: 15,
    height: RfH(44),
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmBtnText: {
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    fontFamily:Fonts.regular,
    color: Colors.white,
    marginTop: RfH(10),
  },
  boxView: {
    width: RfW(310),
    height: RfH(278),
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: RfH(25),
  },
  mt22: {
    marginTop: RfH(22),
  },
});

export default styles;