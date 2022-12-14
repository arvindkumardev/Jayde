import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';
import Fonts from "../../theme/Fonts";

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btnContainer:{
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  submitButton: {
    backgroundColor: Colors.mango,
    borderRadius: 10,
    paddingHorizontal: RfW(10),
    marginLeft: RfW(3),
    borderColor: Colors.mango,
    borderWidth: 1,
  },
  resetButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.mango,
    borderWidth: 1,
    paddingHorizontal: RfW(10),
    marginRight: RfW(5),
  },
  title: {
    textAlign: 'center',
    marginTop: RfH(35),
    marginLeft: RfW(10),
    marginRight: RfW(20),
  },
});
export default styles;
