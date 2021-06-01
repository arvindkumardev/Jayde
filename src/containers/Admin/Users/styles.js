import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  
  boxView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginLeft: 24,
    marginTop: 25,
    marginRight: 24,
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.lightOlive,
    width: 58,
    height: 27,
    justifyContent: 'center'
  },
  InactiveBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
    width: 58,
    justifyContent: 'center',
    height: 27,
  },

  lftimga: {
    width: 16,
    height: 16,
    marginLeft: 16,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fafafa',
  }

});
export default styles;
