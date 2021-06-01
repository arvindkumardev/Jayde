import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  bdrclr: {
    borderColor: Colors.warmGrey,
    borderWidth: 0.4,
    marginLeft: 20,
    marginTop: 15,
    width: "85%",
  },
  text: {
    marginTop: 2,
    fontSize: 15,
  },
  btnContainer:{
    marginTop: 20,
    marginLeft: 20,
  },
  confirmbtn: {
    backgroundColor: Colors.mango,
    width: 45,
    height: 22,
    borderRadius: 10,
  },
});
export default styles;
