import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  boxView: {
    width: 320,
    height: 144,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: 66,
    height: 23,
    justifyContent: 'center',
    marginLeft: 5,
  }
});
export default styles;
