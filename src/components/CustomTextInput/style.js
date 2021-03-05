import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_DIMENSIONS} from '../../utils/constants';
import {RfH, RfW} from '../../utils/helpers';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: RfH(28),
  },
  labelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    fontSize: RFValue(16, STANDARD_SCREEN_DIMENSIONS.height),
    flex: 1,
    width: '100%',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#050F13',
    padding: 0,
    // paddingLeft: RfW(17),
    // backgroundColor:'#ccc'
  },
  textInputInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#A4B1B6',
    borderRadius: RfW(4),
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: RfH(15),
    // paddingBottom: RfH(12),
    justifyContent: 'center',
    paddingRight: RfW(5),
  },
  iconStyle: {
    width: RfW(16),
    height: RfH(16),
    resizeMode: 'contain',
  },
  passwordIconStyle: {
    width: RfW(20),
    height: RfH(20),
    resizeMode: 'contain',
    // marginRight:RfW(-15)
  },
  errorTextStyle: {
    fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
    fontWeight: 'normal',
    fontStyle: 'normal',
    marginTop: RfH(10),
    color: '#b00820',
  },
  infoIconStyle: {
    width: RfW(10),
    height: RfH(10),
    resizeMode: 'contain',
    marginLeft: RfW(5),
  },
});

export default styles;
