import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import {STANDARD_SCREEN_SIZE} from '../../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
 
  bdrclr: {
    borderColor: '#f75006',
  },
  leftArrow: {
    width: RfW(24),
    height: RfH(24),
    marginLeft: RfW(24),
  },
  boxContent: {
    flex: 1,
    width: RfW(320),
    height: RfH(600),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: RfW(20),
    marginTop: RfH(32),
    marginBottom: RfH(50),
  },
  boxImage: {
    width: RfW(84),
    height: RfH(84),
    marginTop: RfH(40),
  },
  bxVu: {
    width: RfW(310),
    height: RfH(285),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  homebtn: {
    backgroundColor: '#f5f5f5',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(50),
  },
  recreatebtn: {
    backgroundColor: '#f75006',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(12),
  },
  starText: {
    color: '#f75006',
    fontSize: RFValue(13, STANDARD_SCREEN_SIZE),
  },
});
export default styles;
