import { StyleSheet, Platform } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';

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
    fontSize: 9,
  },
  f11: {
    fontSize: 11,
  },
  f12: {
    fontSize: 12,
  },
  f13: {
    fontSize: 13,
  },
  f15: {
    fontSize: 15,
  },
  f16: {
    fontSize: 16,
  },
  f17: {
    fontSize: 17,
  },
  f18: {
    fontSize: 18,
  },
  f20: {
    fontSize: 20,
  },
  f30: {
    fontSize: 30,
  },
  f34: {
    fontSize: 34,
  },
  f35: {
    fontSize: 35,
  },
  f40: {
    fontSize: 40,
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
