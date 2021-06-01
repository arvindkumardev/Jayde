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
    // marginTop: 300,
    marginLeft: 24,
    marginRight: 24,
  },
  submitButton: {
    backgroundColor: Colors.mango,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginLeft: 3,
  },
  resetButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.mango,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 5,
  },
  title: {
    textAlign: 'center',
    marginTop: 35,
    marginLeft: 10,
    marginRight: 20,
  },
});
export default styles;
