import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import Fonts from "../../../theme/Fonts";
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
    marginTop: RfH(20),
  },
  btnContainer: {
    marginTop: RfH(20),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(150),
    height: RfH(44),
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: RfW(150),
    height: RfH(44),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  inputText: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
  },
  rupee: {
    position: 'absolute',
    alignItems: 'flex-end',
    marginLeft: RfW(280),
    marginTop: RfH(15),
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
  },
});
export default styles;
