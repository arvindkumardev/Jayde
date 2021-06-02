import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../../utils/helpers';
import {Colors} from '../../../theme';
import Fonts from "../../../theme/Fonts";

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxView: {
    width: RfW(320), 
    height: RfH(255), 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    marginTop: RfH(35), 
    marginLeft: RfW(20),
  },
  btnContainer:{
    alignItems: 'center',
    marginTop: RfH(50),
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: RfW(327),
    height: RfH(44),
    borderRadius: 10,
    marginTop: RfH(30),
    marginBottom: RfH(20),
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
  },
});
export default styles;
