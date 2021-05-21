import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import Fonts from "../../../theme/Fonts";

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
  btnContainer: {
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  confirmbtn: {
    backgroundColor: '#F7A435',
    width: 150,
    height: 44,
    borderRadius: 10,
  },
  aggregatebtn: {
    backgroundColor: '#fff',
    width: 150,
    height: 44,
    borderRadius: 10,
    borderColor: '#F7A435',
    borderWidth: 1,
  },
  inputText: {
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    paddingLeft: 15,
    fontFamily: Fonts.regular,
  },
  rupee: {
    position: 'absolute',
    alignItems: 'flex-end',
    marginLeft: 280,
    marginTop: 15,
    fontSize: 15,
  },
});
export default styles;
