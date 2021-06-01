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
    borderRadius: 20, 
    marginLeft: 24, 
    marginRight: 24,
    marginTop: 25, 
  },
  lftimga: {
    width: 16, 
    height: 16, 
    marginLeft: 17,
  },
  scheduleimage: {
    width: 22, 
    height: 22, 
    marginBottom: 8,
    marginLeft: 30,
    marginTop: 10,
  },
});
export default styles;
