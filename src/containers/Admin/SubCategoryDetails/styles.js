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
    marginRight: RfW(20),
  },
  deleteBtn: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginRight: RfW(3),
  },
  editBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginRight: RfW(5),
  },
  productImage: {
    width: RfW(46),
    height: RfH(46),
  },
});
export default styles;
