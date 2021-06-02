import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  boxView: {
    width: RfW(320),
    height: RfH(144),
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginLeft: RfW(20),
    marginTop: RfH(25),
  },
  lftimga: {
    width: RfW(16),
    height: RfH(16),
    marginLeft: RfW(17),
  },
  scheduleimage: {
    width: RfW(15),
    height: RfH(13),
    marginLeft: RfW(10),
  },
  pendingimage: {
    width: RfW(15),
    height: RfH(18),
    marginLeft: RfW(5),
  },
  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.4,
    width: '87%',
    marginLeft: RfW(24),
    marginTop: RfH(20),
  },
});
export default styles;
