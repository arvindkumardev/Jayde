import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  menuActionItem: {
    width: '100%',
  },
  menuEllipseContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
  menuContainer: {
    flex: 1,
    width: 156,
    height: 136,
    marginLeft: 24,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 27,
  },
  dataItemContent: {
    flex: 0.5,
  },
  dataImage: {
    flex: 0.2,
  },
  textStatus: {
    fontSize: 11,
    color: '#000',
  },
  statusIcon: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: 20,
  },
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
    marginLeft: 20,
    alignItems: 'center',
    marginTop: 17,
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
