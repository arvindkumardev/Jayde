import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../utils/helpers';
import Font from '../theme/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_SIZE} from '../utils/constants';
import {Colors} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: RfH(9),
    paddingBottom: RfH(14),
    paddingHorizontal: RfW(15),
  },
  headerText: {
    fontFamily: Font.regular,
    fontSize: RFValue(17, STANDARD_SCREEN_SIZE),
    fontWeight: '500',
    fontStyle: 'normal',
    color: Colors.black,
  },

  tabIconActiveShadow: {
    // shadowOffset: {width: 2, height: 3},
    shadowOpacity: 5,
    shadowColor: 'rgba(105,50,206,0.3)',
    shadowRadius: RfH(10),
    elevation:5
  },
});

export default styles;
