import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

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
  lftimga: {
    width: 16, 
    height: 16, 
    marginLeft: 17,
  },
  scheduleimage: {
    width: 15, 
    height: 13, 
    marginLeft: 10,
  },
  pendingimage: {
    width: 15, 
    height: 18, 
    marginLeft: 5,
  },
  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.4,
    width: '87%',
    marginLeft: 24,
    marginTop: 20,
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.mangoTwo,
    width: 54,
    height: 23,
    justifyContent: 'center',
  }
});
export default styles;
