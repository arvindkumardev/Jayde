import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  confirmButton:{
    marginTop:20,
    borderRadius: 10,
    backgroundColor:Colors.mango,
    paddingVertical: 15,
    alignItems:'center'
  },
  confirmBtnText:{
    fontSize: 18,
    fontFamily:
    Fonts.regular,
    color: Colors.white
  },
  boxView: {
    width: 310, 
    height: 278, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: 25, 
  },
  mt22: {
    marginTop: 22,
  },
});

export default styles;