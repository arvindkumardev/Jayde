import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btnContainer: {
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  confirmbtn: {
    backgroundColor: Colors.mango,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 3,
  },
  aggregatebtn: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.mango,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 5,
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
});
export default styles;
