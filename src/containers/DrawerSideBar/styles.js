import { StyleSheet } from 'react-native';
import { Colors } from "../../theme";

const styles = StyleSheet.create({
  menuItemContainer: {
    paddingVertical: 12,
    marginLeft: 20,
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1,
  },
  userSectionContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: Colors.grayTwo,
  },
});

export default styles;
