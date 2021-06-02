import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';
import {STANDARD_SCREEN_SIZE} from '../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';

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
    fontSize:  RFValue(15, STANDARD_SCREEN_SIZE),
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
