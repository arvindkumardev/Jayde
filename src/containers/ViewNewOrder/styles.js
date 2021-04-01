import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row', 
    marginTop: 30,
  },
  btnRjtView: {
    flex: 1, 
    marginTop: 10, 
    marginLeft: 24,
  },
  acceptView: {
    flex: 1, 
    marginTop: 10, 
    marginRight: 24, 
    marginLeft: 7,
  },
  rjttouch: {
    marginTop:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems:'center',
    borderColor: 'orange', 
    borderWidth: 1,
  },
  rjttext: {
    fontSize: 18, 
    color: 'orange',
  },
  acptouch: {
    marginTop:20,
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingVertical: 11,
    alignItems:'center'
  },
  acceptext: {
    fontSize: 18, 
    color: '#ffffff',
  },
  mainVu: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topflex: {
    flexDirection: 'row', 
    marginTop: 30,
  },
  flx1: {
    flex: .4,
  },
  flx2: {
    flex: .6,
  },
  topleftarr: {
    width: 24, 
    height: 34, 
    marginLeft: 34,
  },
  topcon: {
    fontSize: 20, 
    color: '#000000', 
    fontWeight: "bold",
  },
  refView: {
    alignItems: 'center',  
    marginTop: 35,
  },
  refTxt: {
    marginLeft: 24, 
    fontSize: 17, color: '#121212', 
    fontWeight: "bold",
  },
  bxVu: {
    width: 310, 
    height: 285, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 35, 
    marginRight: 24,
  },
  wstView: {
    flexDirection: 'row', 
    marginLeft: 24,
  },
  flexx: {
    flex: 1,
  },
  wstitle1: {
    fontSize: 15, 
    color: '#121212', 
    marginTop: 20, 
    fontFamily: 'ProximaNova-Regular',
  },
  wstitle2: {
    fontSize: 15, 
    color: '#121212', 
    marginTop: 20, 
    fontFamily: 'ProximaNova-Regular', 
    marginRight: 30,
  },
  boxcont: {
    flex: 1, 
    alignItems: 'flex-end',
  },
  bxcon1: {
    flexDirection: 'row', 
    marginLeft: 24,
  },
});
export default styles;
