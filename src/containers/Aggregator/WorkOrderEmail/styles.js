import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#707070',
  },
   bdrclr: {
     borderColor: 'orange',
   },
  boxContent: {
    flex: 1, 
    width: RfW(310), 
    height: RfH(512), 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginLeft: RfW(24), 
    marginTop: RfH(32),
  },
  boxImage: {
    width: RfW(132), 
    height: RfH(132), 
    marginTop: RfH(30),
  },
  bxVu: {
    width: RfW(310), 
    height: RfH(285), 
    borderRadius: 20, 
    marginLeft: RfW(24), 
    marginTop: RfH(5), 
    marginRight: RfW(24),
  },
  buttonsize: {
     height: RfH(44),
     paddingHorizontal: RfW(10),
     alignItems: 'center',
     justifyContent: 'center',
  },
});
export default styles;
