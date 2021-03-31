import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#707070',
  },
   bdrclr: {
     borderColor: 'orange',
   },
  leftArrow: {
    width: 24, 
    height: 24, 
    marginLeft: 24,
  },
  boxContent: {
    flex: 1, 
    width: 310, 
    height: 544, 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 32,
  },
  boxImage: {
    width: 132, 
    height: 132, 
    marginTop: 12,
  },
  bxVu: {
    width: 310, 
    height: 285, 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 5, 
    marginRight: 24,
  },
  tbut: {
    marginRight: 64, 
    marginLeft: 64,
  },
});
export default styles;
