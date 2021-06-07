import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import { RfH, RfW } from '../../../utils/helpers';

const styles = StyleSheet.create({
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: RfW(66),
    height: RfH(23),
    justifyContent: 'center',
    marginLeft: RfW(5),
  }
});
export default styles;
