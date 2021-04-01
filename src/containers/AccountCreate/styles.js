import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#f7a435',
  },
  topArrow: {
    flexDirection: 'row', 
    marginTop: 30,
  },
  leftArrow: {
    width: 24, 
    height: 24, 
    marginLeft: 24,
  },
  boxContent: {
    flex: 1, 
    width: 310, 
    height: 218, 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 62,
  },
  boxImage: {
    width: 114, 
    height: 114, 
    marginTop: 32,
  },
  boxText: {
    fontSize: 15, 
    color: '#232323',
  },
  logoImage: {
    width: 155, 
    height: 54,
  },
  logoView: {
    alignItems: 'center', 
    marginTop: 40,
  },
  topTitle: {
    fontSize: 16, 
    color: '#fff', 
    marginRight: 20,
  },
  topTitleView: {
    alignItems: 'flex-end',
  },
  viewFlex: {
    flex: 1,
  }
});
export default styles;
