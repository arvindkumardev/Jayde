import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  boxView: {
    backgroundColor: Colors.mangoTwo, 
    borderRadius: 10, 
    marginTop: RfH(35), 
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  auditboxView: {
    backgroundColor: Colors.paleGold, 
    borderRadius: 10, 
    marginTop: RfH(20), 
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  bdrclr: {
    borderColor: Colors.white,
    borderWidth: 0.4,
    marginLeft: RfW(20),
    marginTop: RfH(5),
    width: "85%",
  },
});
export default styles;
