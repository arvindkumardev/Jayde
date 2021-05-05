import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxView: {
    width: 320, 
    height: 194, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 20, 
    marginLeft: 20,
  },
  btnContainer:{
    marginLeft: 24,
    marginRight: 10,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 155,
    height: 44,
    borderRadius: 10,
    marginTop: 35,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: 155,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginTop: 35,
  },
  completelaterbtn: {
    backgroundColor: '#fff',
    width: 155,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;