import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btnContainer: {
    marginTop: RfH(20),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  confirmbtn: {
    backgroundColor: Colors.mango,
    borderRadius: 10,
    paddingHorizontal: RfW(10),
    marginLeft: 3,
    borderColor: Colors.mango,
    borderWidth: 1,
  },
  btnGray: {
    backgroundColor: Colors.grayOne,
    borderRadius: 10,
    paddingHorizontal: RfW(10),
    marginLeft: 3,
   
  },
  aggregatebtn: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.mango,
    borderWidth: 1,
    paddingHorizontal: RfW(10),
    marginRight: 5,
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
});
export default styles;
