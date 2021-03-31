import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  topArrowView: {
    flexDirection: 'row', 
    marginTop: 30, 
    marginBottom: 10,
  },
  topArrowFlex: { 
    flex: .4,
  },
  topTitleFlex: {
    flex: .6,
  },
  topArrowImg: {
    width: 24, 
    height: 34, 
    marginLeft: 34,
  },
  topTitle: {
    fontSize: 20, 
    color: '#000000', 
    fontWeight: "bold",
  },
  dataView: {
    flexDirection: 'row', 
    marginLeft: 24,
  },
  flx1: {
    flex: .2,
  },
  flx2: {
    flex: .6,
  },
  leftImg: {
    width: 66, 
    height: 66, 
    marginTop: 10,
  },
  txt1: {
    fontSize: 17, 
    marginLeft: 15, 
    marginTop: 12,
  },
  txt2: {
    fontSize: 15, 
    marginLeft: 15,
  },
  txt3: {
    fontSize: 11, 
    marginLeft: 15,
  },
  rgtIcon: {
    width: 15, 
    height: 18, 
    marginTop: 30, 
    marginLeft: 15,
  },
  rgtStatus: {
    fontSize: 11, 
    color: '#000',
  },
});
export default styles;
