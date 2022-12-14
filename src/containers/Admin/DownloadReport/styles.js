import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
  btnContainer: {
    marginTop: RfH(20),
    marginLeft: RfW(20),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: RfW(160),
    height: RfH(44),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
