import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  active: {
    borderLeftColor: Colors.mango,
    borderLeftWidth: RfW(10),
    backgroundColor: Colors.grayLine
  },
  txtFileUpload: {
    fontFamily: Fonts.regular,
    color: Colors.grayThree
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RfW(20),
    paddingVertical: RfH(10),
    backgroundColor: Colors.grayBackground,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: RfW(20),
    backgroundColor: Colors.white
  },
});

export default styles;