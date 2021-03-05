import {StyleSheet, StatusBar, Platform} from 'react-native';
import {isDisplayWithNotch, RfH, RfW} from '../../utils/helpers';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_DIMENSIONS} from '../../utils/constants';
import {Colors, Fonts} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    paddingVertical: RfH(15),
  },
  leftContainer: {
    position: 'absolute',
    paddingVertical: RfH(12),
    left: RfW(22),
    justifyContent: 'center',
  },
  headerText: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  rightContainer: {
    position: 'absolute',
    top: RfH(15),
    right: RfW(22),
    justifyContent: 'center',
  },
});

export default styles;
