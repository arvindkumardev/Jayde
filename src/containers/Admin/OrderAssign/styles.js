import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

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
    fontSize: 18,
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
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    fontSize: 20,
    color: '#000000',
    fontWeight: "bold",
  },
  refView: {
    alignItems: 'center',
    marginTop: 25,
  },
  refText: {
    marginLeft: 24,
    fontSize: 17,
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
    fontSize: 15,
    color: '#121212',
    marginTop: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  boxTextt1: {
    fontSize: 15,
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
