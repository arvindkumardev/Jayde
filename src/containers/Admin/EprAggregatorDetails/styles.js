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
    borderRadius: 10,
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  slctAggre: {
    marginTop: RfH(25),
    marginRight: RfW(24),
    marginLeft: RfW(24),
  },
  bdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 4,
  },
  borderdrclr: {
    borderColor: '#f5f5f5',
    borderWidth: 1,
    width: '85%',
    marginLeft: RfW(24),
  },
});
export default styles;
