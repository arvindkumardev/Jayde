import { StyleSheet } from 'react-native';
import { Colors, } from '../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_DIMENSIONS } from '../../utils/constants';
import { RfH, RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputTextLabel: {
    fontSize: RFValue(15, STANDARD_SCREEN_DIMENSIONS.height),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: 'rgb(142, 144, 145)',
  },
  inputStyle: {
    fontSize: RFValue(14, STANDARD_SCREEN_DIMENSIONS.height),
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'rgb(56, 70, 103)',
    padding: 0
  },
  innerContainer: {
    marginTop: RfH(10),
    marginHorizontal: RfW(25),
    backgroundColor: Colors.white,
    paddingVertical: RfH(18),
    paddingHorizontal: RfW(19),
    borderRadius: RfH(8),
    marginBottom: RfH(12),
  }
});

export default styles;
