import {StyleSheet} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
const styles = StyleSheet.create({
  shadowView: {
    borderRadius: RfH(20),
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowRadius: 12,
    shadowOpacity: 2,
    shadowColor: 'rgba(105,50,206,0.3)',
  },
  spaceHeight: {
    paddingTop: RfH(4),
  },
  statusButton: {
    flexDirection: 'row',
  },
  topTitle: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: RfH(21),
    paddingTop: RfH(16),
    borderColor: 'rgba(255,255,255,0.15)',
  },
  headerTwoContainer: {
    marginTop: RfH(22),
    paddingTop: RfH(4),
    paddingBottom: RfH(22),

    borderRadius: RfH(20),
  },
});
export default styles;


