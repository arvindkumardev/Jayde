import { StyleSheet } from 'react-native';
import { Colors } from "../../theme";
import { RfH, RfW } from '../../utils/helpers';
const styles = StyleSheet.create({
  
  iconContainer : {
    width: RfH(24),
    height: RfH(24),
  },
  
  menuItemContainer: {
    paddingVertical: RfH(14),
    marginLeft: RfW(20),
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userSectionContainer: {
    flexDirection: 'row',
    paddingVertical: RfH(20),
    alignItems: 'center',
    borderBottomWidth: RfW(5),
    borderBottomColor: Colors.grayTwo,
  },
  userProfile: {
    width: RfH(70),
    height: RfH(70),
    borderRadius:  RfH(35),
    resizeMode : 'stretch'
    
  }
});

export default styles;
