import { StyleSheet } from 'react-native';
import { Colors } from "../../theme";
import {RfH, RfW} from '../../utils/helpers';
const styles = StyleSheet.create({
  menuItemContainer: {
    paddingVertical: RfH(12),
    marginLeft: RfW(20),
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1,
    flexDirection : 'row',
    alignItems: 'center'
  },
  userSectionContainer: {
    flexDirection: 'row',
    paddingVertical: RfH(20),
    alignItems: 'center',
    borderBottomWidth: RfW(5),
    borderBottomColor: Colors.grayTwo,
  },
});

export default styles;
