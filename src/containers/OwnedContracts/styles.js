import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  boxView: {
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    marginLeft: RfW(24), 
    marginRight: RfW(24),
    marginTop: RfH(25), 
  },
  lftimga: {
    width: RfW(16), 
    height: RfH(16), 
    marginLeft: RfW(17),
  },
  scheduleimage: {
    width: RfW(22), 
    height: RfH(22), 
    marginBottom: RfH(8),
    marginLeft: RfW(30),
    marginTop: RfH(10),
  },
});
export default styles;
