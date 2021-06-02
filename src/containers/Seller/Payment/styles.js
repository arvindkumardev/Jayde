import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';

const styles = StyleSheet.create({
  boxView: {
    width: RfW(327),
    height: RfW(233),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginLeft: RfW(18),
    marginTop: RfH(25),
    marginRight: RfW(18),
    marginBottom: RfH(60),
  },
  homeButton: {
    width: RfW(160),
    height: RfH(44),
    alignItems: 'center',
    backgroundColor: '#f8a230',
    borderRadius: 10,
  },
  boxMainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
