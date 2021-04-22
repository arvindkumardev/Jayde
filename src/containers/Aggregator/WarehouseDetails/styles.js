import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxView: {
    width: 320, 
    height: 255, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 35, 
    marginLeft: 20,
  },
  btnContainer:{
    alignItems: 'center',
    marginTop: 50,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 327,
    height: 44,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default styles;
