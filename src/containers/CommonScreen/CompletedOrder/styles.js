import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
 
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
    marginTop: RfH(20),
  },
  confirmBtn: {
    borderRadius: 25,
    backgroundColor: Colors.mangoTwo,
    width: RfW(60),
    height: RfH(28),
    justifyContent: 'center',
  },
  btnCorner: {
    borderRadius: 24,
    backgroundColor: Colors.mangoTwo,
    width: RfW(60),
    height: RfH(28),
    justifyContent: 'center',
  }
});
export default styles;
