import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#707070',
  },
  bdrclr: {
    borderColor: 'orange',
  },
  boxContent: {
    width: RfW(310),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: RfH(32),
  },
  bxVu: {
    borderRadius: 20,
    marginLeft: RfW(24),
    marginTop: RfH(5),
    marginBottom: RfH(32),
    marginRight: RfW(24),
  },
  buttonsize: {
    width: RfW(160),
  },
});
export default styles;
