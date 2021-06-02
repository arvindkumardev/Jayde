import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../utils/constants';

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: RfW(21),
    backgroundColor: Colors.white,
    paddingVertical: RfW(10),
    paddingHorizontal: RfH(10),
    borderRadius: RfH(25),
  },
  checkBoxContainer: {
    marginVertical: RfW(23),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    paddingLeft: 40,
    paddingRight: 20,
    backgroundColor: Colors.green,
    paddingVertical: 10,
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
