import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  mainVu: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  boxView: {
    width: 320, 
    height: 260, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 35, 
    marginLeft: 20,
  },
  btnContainer:{
    marginLeft: 20,
    marginTop: 140,
    marginRight: 10,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 158,
    height: 44,
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: 158,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
