import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  quoteContainer: {
    marginTop: RfH(20),
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalPriceContainer: {
    paddingVertical: RfH(20),
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: RfH(20)
  },
  totalTxt: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  itemTxt: {
    fontFamily: Fonts.regular,
    color: Colors.grayThree,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  headerTxt: {
    fontFamily: Fonts.bold,
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
  },
  priceContainer: {
    width: '100%',
    paddingHorizontal: RfW(20),
    marginTop: RfH(20)
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  labelTxt: {
    fontFamily: Fonts.bold,
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
  },
  btnPrimary: {
    borderRadius: 10,
    backgroundColor: Colors.mango,
    paddingVertical: RfH(10),
    alignItems: 'center',
    paddingHorizontal: RfW(40)
  },
  btnTextWhite: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    fontFamily: Fonts.regular,
    color: Colors.white
  },
  btnTextGray: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    fontFamily: Fonts.regular,
    color: Colors.grayThree
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: RfW(20),
    bottom: RfH(20),
    position: 'absolute'
  },
  paperBox: {
    width: RfW(321),
    height: RfH(126),
    borderRadius: 10,
  },
  deliveryBox: {
    width: RfW(321),   
    borderRadius: 10,
  },
  addressBox: {
    width: RfW(321),
    height: RfH(64),
    borderRadius: 10,
  }
});

export default styles;