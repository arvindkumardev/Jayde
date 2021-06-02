import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  
  boxView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginLeft: RfW(24),
    marginTop: RfH(25),
    marginRight:  RfW(24),
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: Colors.lightOlive,
    width:  RfW(58),
    height: RfH(27),
    justifyContent: 'center'
  },
  InactiveBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
    width:  RfW(58),
    justifyContent: 'center',
    height: RfH(27),
  },

  lftimga: {
    width:  RfW(16),
    height:  RfH(16),
    marginLeft:  RfW(16),
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fafafa',
  }

});
export default styles;
