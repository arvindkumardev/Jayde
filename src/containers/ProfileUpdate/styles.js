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
    borderWidth: 4,
    marginTop: 20,
  },
  btnContainer:{
    marginLeft: 24,
    marginRight: 24,
  },
  saveButton: {
    backgroundColor: '#F7A435',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 10,
    marginLeft: 3,
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
    marginRight: 5,
  },
  inputText:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular,
  },
  inputTextcity:{
    backgroundColor:'#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular,
    width: 168,
    height: 44,
  },
  title: {
    textAlign: 'center',
    marginTop: 35,
  },
});
export default styles;
