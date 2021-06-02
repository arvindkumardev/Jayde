import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: RfW(21),
    backgroundColor: Colors.white,
    paddingVertical: RfH(10),
    paddingHorizontal: RfW(10),
    borderRadius: 25,
  },
  checkBoxContainer: {
    marginVertical: RfH(23),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    paddingLeft:  RfW(40),
    paddingRight:  RfW(20),
    backgroundColor: Colors.green,
    paddingVertical: RfH(10),
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  eyeIcon: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    color: '#818181',
    paddingBottom: RfH(8),
  },
});
export default styles;
