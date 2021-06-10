import { StyleSheet, Platform } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';
import { RFValue } from 'react-native-responsive-fontsize';

import { STANDARD_SCREEN_SIZE } from '../../utils/constants';

const texts = StyleSheet.create({
  txtWhiteRegular: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    includeFontPadding: false
  },
  txtBlackRegular: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    includeFontPadding: false
  },
  txtPrimaryRegular: {
    fontFamily: Fonts.regular,
    color: Colors.mango,
    includeFontPadding: false
  },
  txtmangoTwoRegular: {
    fontFamily: Fonts.regular,
    color: Colors.mangoTwo,
    includeFontPadding: false
  },
  txtSecandaryRegular: {
    fontFamily: Fonts.regular,
    color: Colors.warmGrey,
    includeFontPadding: false
  },
  txtWhiteBold: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    includeFontPadding: false
  },
  txtBlackBold: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    includeFontPadding: false
  },
  txtPrimaryBold: {
    fontFamily: Fonts.bold,
    color: Colors.mango,
    includeFontPadding: false
  },
  txtmangoTwoBold: {
    fontFamily: Fonts.bold,
    color: Colors.mangoTwo,
    includeFontPadding: false
  },
  txtSecandaryBold: {
    fontFamily: Fonts.bold,
    color: Colors.warmGrey,
    includeFontPadding: false
  },
  f9: {
    fontSize: RFValue(9, STANDARD_SCREEN_SIZE),
  },
  f11: {
    fontSize: RFValue(11, STANDARD_SCREEN_SIZE),
  },
  f12: {
    fontSize: RFValue(12, STANDARD_SCREEN_SIZE),
  },
  f13: {
    fontSize: RFValue(13, STANDARD_SCREEN_SIZE),
  },
  f15: {
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
  },
  f16: {
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  f17: {
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
  },
  f18: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
  },
  f20: {
    fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
  },
  f22: {
    fontSize: RFValue(22, STANDARD_SCREEN_SIZE),
  },
  f30: {
    fontSize: RFValue(30, STANDARD_SCREEN_SIZE),
  },
  f34: {
    fontSize: RFValue(34, STANDARD_SCREEN_SIZE),
  },
  f35: {
    fontSize: RFValue(35, STANDARD_SCREEN_SIZE),
  },
  f40: {
    fontSize: RFValue(40, STANDARD_SCREEN_SIZE),
  },

  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacing1: {
    letterSpacing: 1,
  },
  alignfend: {
    alignItems: 'flex-end',
  },
  aligncen: {
    alignItems: 'center',
  },
  textalig: {
    textAlign: 'center',
  },
  textAlignRight: {
    textAlign: 'right'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  inputTxtStyle: {
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: Colors.grayTwo,
    ...Platform.select({ ios: { paddingVertical: 15 } }),
  },
});

export default texts;
