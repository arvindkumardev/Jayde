import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#707070',
  },
   bdrclr: {
     borderColor: 'orange',
   },
  boxContent: {
    flex: 1, 
    width: 310, 
    height: 512, 
    backgroundColor: '#ffffff', 
    alignItems: 'center', 
    borderRadius: 10, 
    marginLeft: 24, 
    marginTop: 32,
  },
  boxImage: {
    width: 132, 
    height: 132, 
    marginTop: 30,
  },
  bxVu: {
    width: 310, 
    height: 285, 
    borderRadius: 20, 
    marginLeft: 24, 
    marginTop: 5, 
    marginRight: 24,
  },
  buttonsize: {
     height: 44,
     width: 160,
  },
});
export default styles;
