import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import Fonts from '../Fonts';

const texts = StyleSheet.create({
  txtWhiteRegular: {
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  txtBlackRegular: {
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  txtPrimaryRegular: {
    fontFamily: Fonts.regular,
    color: Colors.mango,
  },
  txtmangoTwoRegular: {
    fontFamily: Fonts.regular,
    color: Colors.mangoTwo,
  },
  txtSecandaryRegular: {
    fontFamily: Fonts.regular,
    color: Colors.warmGrey,
  },
  txtWhiteBold: {
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  txtBlackBold: {
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  txtPrimaryBold: {
    fontFamily: Fonts.bold,
    color: Colors.mango,
  },
  txtmangoTwoBold: {
    fontFamily: Fonts.bold,
    color: Colors.mangoTwo,
  },
  txtSecandaryBold: {
    fontFamily: Fonts.bold,
    color: Colors.warmGrey,
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
});

export default texts;
