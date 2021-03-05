import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_SIZE} from '../../utils/constants';
import {RfH, RfW} from '../../utils/helpers';
import { Colors } from '../../theme';


const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: RfH(28),
  },
  labelViewStyle: {
    flexDirection: 'row',
    alignItems:'center',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: Fonts.regular,
    left: 3,
  },
  inputStyle: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    flex: 1,
    width:'100%',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#262119',
    padding:0
  },
  textInputInnerContainer: {
    flexDirection: 'row',
    marginTop:RfH(4),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.separator,
  },
  iconContainer: {
    paddingLeft: RfH(15),
    paddingBottom: RfH(12),
    justifyContent: 'center',
    paddingRight: RfW(5)
  },
  iconStyle: {
    width: RfH(20.3),
    height: RfH(15.3),
    resizeMode: 'contain',
  },
  errorTextStyle: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    marginTop: RfH(10),
    letterSpacing: 0,
    textAlign: 'left',
    color: '#b00820',
  },
  infoIconStyle: {
    width: RfW(18),
    height: RfH(18),
    resizeMode: 'contain',
  },
  detailIconStyle: {
    width: RfW(17),
    height: RfH(17),
     marginRight:RfW(4)
  },
});

export default styles;
