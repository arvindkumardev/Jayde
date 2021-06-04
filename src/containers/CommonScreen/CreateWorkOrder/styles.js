import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

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
  btnContainer: {
    marginTop: RfH(50),
    marginLeft: RfW(20),
    marginRight: RfW(20),
  },
  saveButton: {
    backgroundColor: '#F7A435',
    paddingHorizontal: RfW(10),
    borderRadius: 10,
    marginTop: RfH(30),
    marginBottom: RfH(20),
    borderColor: Colors.mango,
    borderWidth: 1,
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RfW(20),
    paddingVertical: RfH(10),
    backgroundColor: Colors.grayBackground,
  },
});
export default styles;
