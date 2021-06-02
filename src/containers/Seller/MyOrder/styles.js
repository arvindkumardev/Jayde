import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import { RfH, RfW } from '../../../utils/helpers';


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
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: RfW(66),
    height: RfH(23),
    justifyContent: 'center',
    marginLeft: RfW(5),
  }
});
export default styles;
