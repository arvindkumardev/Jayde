import { StyleSheet } from 'react-native';
import { RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  toastInnerContainer: {
    width: '70%',
    minHeight: 90,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  toastLabelContainer: {
    paddingTop: RfW(8)
  },
  toastLabel: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default styles;
