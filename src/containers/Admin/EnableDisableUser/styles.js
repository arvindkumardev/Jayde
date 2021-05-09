import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';
import Fonts from '../../../theme/Fonts';

const styles = StyleSheet.create({
  boxView: {
    width: 327, 
    height: 205, 
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    marginLeft: 18, 
    marginTop: 25, 
    marginRight: 18,
    marginBottom: 60,
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: '#ABC270',
    width: 58,
    height: 27,
    marginLeft: 20,
  },
  InactiveBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
    width: 58,
    height: 27,
  },
  lftimga: {
    width: 16, 
    height: 16, 
    marginLeft: 24,
  },
  txtLightOliveRegular: {
    fontFamily: Fonts.regular,
    color: Colors.lightOlive,
  },
  bittonSize: {
    width: 146,
    height: 44,
  },
  cancelButton: {
    marginLeft: 14,
  },
  confirmButton: {
    marginLeft: 7,
  },
  cancelbutton: {
    marginTop: 26,
  },
  activebutton: {
    marginTop: 5,
  },
  boxMainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
