import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';

const styles = StyleSheet.create({
  confirmView: {
    flex: 1,
    marginTop: 20,
    marginRight: 24,
    marginLeft: 24,
  },
  confirmBtn: {
    marginTop: 20,
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: 11,
    alignItems: 'center',
  },
  confirm: {
    fontSize: RFValue(18, STANDARD_SCREEN_SIZE),
    color: '#ffffff',
  },
  slctAggre: {
    marginTop: 15,
    marginRight: 24,
    marginLeft: 24,
  },
  businessType: {
    marginTop: 15,
    marginRight: 24,
    marginLeft: 24,
  },

  leftArrwView: {
    flexDirection: 'row',
    marginTop: 30,
  },
  flx1: {
    flex: .3,
  },
  flx2: {
    flex: .7,
  },
  lftimg: {
    width: 24,
    height: 34,
    marginLeft: 34,
  },
  topTitle: {
    fontSize: RFValue(20, STANDARD_SCREEN_SIZE),
    color: '#000000',
    fontWeight: "bold",
  },
  refView: {
    alignItems: 'center',
    marginTop: 25,
  },
  refText: {
    marginLeft: 24,
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    color: '#121212',
    fontWeight: "bold",
  },
  boxView: {
    width: 310,
    height: 215,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginLeft: 24,
    marginTop: 25,
    marginRight: 24,
  },
  boxText: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  flx: {
    flex: 1,
  },
  boxtxtt: {
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    color: '#121212',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  boxTextt1: {
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    color: '#121212',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
    marginRight: 30,
  },
  boxTxtView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default styles;
