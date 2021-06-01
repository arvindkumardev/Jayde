import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  boxView: {
    backgroundColor: Colors.mangoTwo, 
    borderRadius: 10, 
    marginTop: 35, 
    marginLeft: 24,
    marginRight: 24,
  },
  auditboxView: {
    backgroundColor: Colors.paleGold, 
    borderRadius: 10, 
    marginTop: 20, 
    marginLeft: 24,
    marginRight: 24,
  },
  bdrclr: {
    borderColor: Colors.white,
    borderWidth: 0.4,
    marginLeft: 20,
    marginTop: 5,
    width: "85%",
  },
});
export default styles;
