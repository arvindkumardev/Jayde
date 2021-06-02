import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginLeft: RfW(40),
    alignItems: 'center',
    paddingVertical: RfH(20),
  },
  itemImageSize: {
    width: RfW(66),
    height: RfH(66),
  },
});
export default styles;
