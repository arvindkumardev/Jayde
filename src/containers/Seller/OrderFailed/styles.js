import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#707070',
  },
  bdrclr: {
    borderColor: '#f75006',
  },
  leftArrow: {
    width: 24,
    height: 24,
    marginLeft: 24,
  },
  boxContent: {
    flex: 1,
    width: 320,
    height: 600,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 32,
    marginBottom: 50,
  },
  boxImage: {
    width: 84,
    height: 84,
    marginTop: 40,
  },
  bxVu: {
    width: 310,
    height: 285,
    marginLeft: 24,
    marginRight: 24,
  },
  homebtn: {
    backgroundColor: '#f5f5f5',
    width: 160,
    height: 44,
    borderRadius: 10,
    marginTop: 50,
  },
  recreatebtn: {
    backgroundColor: '#f75006',
    width: 160,
    height: 44,
    borderRadius: 10,
    marginTop: 12,
  },
  starText: {
    color: '#f75006',
    fontSize: 13,
  },
});
export default styles;
