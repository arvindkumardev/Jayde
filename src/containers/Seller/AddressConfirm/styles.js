import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  quoteContainer: {
    marginTop: 20,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalPriceContainer: {
    paddingVertical: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 20
  },
  totalTxt: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontSize: 16
  },
  itemTxt: {
    fontFamily: Fonts.regular,
    color: Colors.grayThree,
    fontSize: 16
  },
  headerTxt: {
    fontFamily: Fonts.bold,
    fontSize: 18
  },
  priceContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  labelTxt: {
    fontFamily: Fonts.bold,
    fontSize: 18
  },
  btnPrimary: {
    borderRadius: 10,
    backgroundColor: Colors.mango,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 40
  },
  btnTextWhite: {
    fontSize: 18,
    fontFamily:
      Fonts.regular,
    color: Colors.white
  },
  btnTextGray: {
    fontSize: 18,
    fontFamily:
      Fonts.regular,
    color: Colors.grayThree
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 20,
    bottom: 20,
    position: 'absolute'
  },
  paperBox: {
    width: 321,
    height: 126,
    borderRadius: 10,
  },
  deliveryBox: {
    width: 321,   
    borderRadius: 10,
  },
  addressBox: {
    width: 321,
    height: 64,
    borderRadius: 10,
  }
});

export default styles;