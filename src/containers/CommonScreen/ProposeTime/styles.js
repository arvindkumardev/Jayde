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
    marginTop: RfH(100),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    marginBottom: RfH(20),
    borderColor: Colors.mango,
    borderWidth: 1,
  },
});
export default styles;
