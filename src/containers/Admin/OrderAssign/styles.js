import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';

const styles = StyleSheet.create({
  confirmView: {
    flex: 1,
    marginTop: RfH(20),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },
  confirmBtn: {
    marginTop: RfH(20),
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: RfH(11),
    alignItems: 'center',
  },
  confirm: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    color: '#ffffff',
  },
  slctAggre: {
    marginTop: RfH(15),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },
  businessType: {
    marginTop: RfH(15),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },

  leftArrwView: {
    flexDirection: 'row',
    marginTop: RfH(30),
  },
  flx1: {
    flex: .3,
  },
  flx2: {
    flex: .7,
  },
  lftimg: {
    width: RfW(24),
    height: RfH(34),
    marginLeft: RfW(34),
  },
  topTitle: {
    fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
    color: '#000000',
    fontWeight: "bold",
  },
  refView: {
    alignItems: 'center',
    marginTop: RfH(25),
  },
  refText: {
    marginLeft: RfW(24),
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    color: '#121212',
    fontWeight: "bold",
  },
  boxView: {
    width: RfW(310),
    height: RfH(215),
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginLeft: RfW(24),
    marginTop: RfH(25),
    marginRight: RfW(24),
  },
  boxText: {
    flexDirection: 'row',
    marginLeft: RfW(24),
  },
  flx: {
    flex: 1,
  },
  boxtxtt: {
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    color: '#121212',
    marginTop: RfH(20),
    fontFamily: 'ProximaNova-Regular',
  },
  boxTextt1: {
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    color: '#121212',
    marginTop: RfH(20),
    fontFamily: 'ProximaNova-Regular',
    marginRight: RfW(30),
  },
  boxTxtView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default styles;
