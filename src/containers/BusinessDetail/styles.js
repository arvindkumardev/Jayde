import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';
import Fonts from "../../theme/Fonts";

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: RfW(4),
    marginTop: RfH(20),
  },
  btnContainer:{
    marginTop: RfH(20),
    marginLeft: RfW(24),
    marginRight: RfW(24),
  },
  saveButton: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    marginLeft: RfW(3),
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginRight: RfW(5),
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
  },
  inputTextcity:{
    backgroundColor: Colors.grayTwo,
    borderRadius: 10,
    paddingLeft: RfW(15),
    fontFamily: Fonts.regular,
  },
  title: {
    marginLeft: RfW(40),
    marginRight: RfW(40),
    textAlign: 'center',
    marginTop: RfH(35),
  },
});
export default styles;
