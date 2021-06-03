import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
  btnContainer:{
    marginTop: RfH(20),
    marginLeft: RfW(20),
    marginRight: RfW(20),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginLeft: RfW(3),
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginRight: RfW(5),
  },
});
export default styles;
