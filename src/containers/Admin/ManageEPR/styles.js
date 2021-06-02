import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.5,
    marginLeft: RfW(24),
    marginRight: RfW(24),
    marginTop: RfH(10),
  },
});
export default styles;
