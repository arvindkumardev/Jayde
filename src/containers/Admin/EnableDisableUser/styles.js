import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import Fonts from '../../../theme/Fonts';

const styles = StyleSheet.create({
  boxView: {
    width: RfW(327),
    height: RfH(205),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginLeft: RfW(18),
    marginTop: RfH(25),
    marginRight: RfW(18),
    marginBottom: RfH(60),
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: '#ABC270',
    width: RfW(58),
    height: RfH(27),
    marginLeft: RfW(20),
  },
  InactiveBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
    width: RfW(58),
    height: RfH(27),
  },
  lftimga: {
    width: RfW(16),
    height: RfH(16),
    marginLeft: RfW(24),
  },
  txtLightOliveRegular: {
    fontFamily: Fonts.regular,
    color: Colors.lightOlive,
  },
  bittonSize: {
    width: RfW(146),
    height: RfH(44),
  },
  cancelButton: {
    marginLeft: RfW(14),
  },
  confirmButton: {
    marginLeft: RfW(7),
  },
  cancelbutton: {
    marginTop: RfH(26),
  },
  activebutton: {
    marginTop: RfH(5),
  },
  boxMainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
