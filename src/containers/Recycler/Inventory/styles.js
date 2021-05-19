import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnContainer:{
    marginTop: 20,
    marginLeft: 20,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 160,
    height: 44,
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: 160,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
});
export default styles;
