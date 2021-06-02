import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  btnContainer: {
    marginLeft: RfW(20),
    marginTop: RfH(100),
    marginRight: RfW(10),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(158),
    height: RfH(44),
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: RfW(158),
    height: RfH(44),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
