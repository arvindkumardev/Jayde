import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  btnContainer:{
    alignItems: 'center',
    // marginTop: 100,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(327),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(30),
  },
  proposebtn: {
    backgroundColor: '#fff',
    width: RfW(327),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(20),
    borderColor: '#F7A435',
    borderWidth: 1,
  },
});
export default styles;
