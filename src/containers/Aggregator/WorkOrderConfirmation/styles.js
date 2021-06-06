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
    width: RfW(310), 
    //height: RfH(574), 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderRadius: 20, 
    marginLeft: RfW(24), 
    marginRight: RfW(24), 
    marginTop: RfH(32),
  },
  boxImage: {
    width: RfW(132), 
    height: RfH(132), 
    marginTop: RfH(12),
  },
 
  tbut: {
    marginTop: RfH(50),
    marginBottom: RfH(32),
   
  },
  buttonSize: {
    height: RfH(44),
    width: RfW(160),
  },
});
export default styles;
