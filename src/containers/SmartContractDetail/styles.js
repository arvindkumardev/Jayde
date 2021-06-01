import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxView: {
    width: 320, 
    height: 200, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 20, 
    // marginLeft: 20,
  },
  wasteboxView: {
    width: 320, 
    height: 577, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 20, 
    // marginLeft: 20,
  },
  recycleboxView: {
    width: 320, 
    height: 637, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 20, 
    // marginLeft: 20,
    marginBottom: 20,
  },
  bdrclr: {
    borderColor: '#707070',
    borderWidth: 0.4,
    marginLeft: 20,
    marginTop: 15,
    width: "85%",
  },
  text: {
    marginTop: 2,
    fontSize: 15,
  },
  btnContainer:{
    marginTop: 20,
    marginLeft: 20,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 45,
    height: 22,
    borderRadius: 10,
  },
});
export default styles;
