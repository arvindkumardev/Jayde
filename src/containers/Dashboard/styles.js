import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({

  dataItemContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    marginTop: 17,
  },
  dataImage: {
    flex: 0.2,
  },
  dataItemContent: {
    flex: 0.5,
  },
  statusIcon: {
    flex: 0.3,
    alignItems: 'center',
    marginTop: 20,
  },
  menuContainer: {
    flex: 1,
    width: 162,
    height: 136,
    marginLeft: 24,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 27,
  },
  menuEllipseContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
  menuActionItem: {
    width: '100%',
  },

});
export default styles;
