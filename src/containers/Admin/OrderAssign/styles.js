import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import { Colors } from '../../../theme';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';

const styles = StyleSheet.create({
  confirmView: {
    marginTop: RfH(20),
    marginRight: RfW(24),
    marginLeft: RfW(24),
    marginBottom: RfH(20),
  },
  confirmBtn: {
    borderRadius: 13,
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  slctAggre: {
    marginTop: RfH(15),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },
  businessType: {
    marginTop: RfH(20),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },
  refView: {
    alignItems: 'center',
    marginTop: RfH(25),
  },
});
export default styles;
