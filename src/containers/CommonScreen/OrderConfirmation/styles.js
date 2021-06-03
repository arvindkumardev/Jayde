import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  btnContainer:{
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    marginTop: RfH(30),
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  proposebtn: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    marginTop: RfH(20),
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
