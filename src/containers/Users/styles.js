import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  flx1: {
    flex: .3,
  },
  flx2: {
    flex: .7,
  },
  boxView: {
    width: 310, 
    height: 144, 
    backgroundColor: '#ffffff', 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 25, 
    marginRight: 24,
  },
  confirmBtn: {
    borderRadius: 10,
    backgroundColor: '#ABC270',
    paddingVertical: 11,
    width: 80,
    height: 40,
  },
  lftimga: {
    width: 16, 
    height: 16, 
    marginLeft: 24,
  },
  lftimg: {
    width: 24, 
    height: 34, 
    marginLeft: 34,
  },

});
export default styles;
