import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: RfW(21),
    backgroundColor: Colors.white,
    paddingVertical: RfW(10),
    paddingHorizontal: RfH(10),
    borderRadius: RfH(25),
  },
  loginButton: {
    paddingLeft: RfW(40),
    paddingRight: RfW(20),
    backgroundColor: Colors.mango,
    paddingVertical: RfH(10),
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
});
export default styles;
