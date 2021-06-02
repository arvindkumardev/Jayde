import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({ 
  boxView: {
    width: RfW(320), 
    height: RfH(234), 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: RfH(35), 
    marginLeft: RfW(20),
  },
  btnContainer:{
    alignItems: 'center',
    marginTop: RfH(100),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(327),
    height: RfH(44),
    borderRadius: 10,
    marginBottom: RfH(20),
  },
});
export default styles;
