import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

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
    //height: RfH(512), 
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
  
  buttonsize: {
    height: RfH(44),
    width: RfW(160),
    paddingHorizontal: RfW(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RfH(32),

  },

});
export default styles;
