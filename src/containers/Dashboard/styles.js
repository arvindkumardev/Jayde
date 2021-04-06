import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  textDate: {
    fontSize: 11,
    marginLeft: 15,
  },
  textName: {
    fontSize: 15,
    marginLeft: 15,
  },
  textOrderId: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 12,
  },
  dataItemContainer: {
    flexDirection: 'row',
    marginLeft: 24,
    alignItems: 'center',
  },
  dataItemImage: {
    width: 66,
    height: 66,
    marginTop: 10,
  },
  formContainer: {
    marginHorizontal: RfW(21),
    backgroundColor: Colors.white,
    padding: RfW(25),
    borderRadius: RfH(25),
  },
  checkBoxContainer: {
    marginVertical: RfW(23),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginButton: {
    marginVertical: RfH(25),
    paddingVertical: RfH(17),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: RfH(12),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#818181',
    paddingBottom: RfH(8),
  },
});
export default styles;
