import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';
import { Colors } from '../../theme';

const styles = StyleSheet.create({

  dataItemContainer: {
    flexDirection: 'row',
    marginLeft: RfW(24),
    alignItems: 'center',
    marginTop: RfH(17),
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
    marginTop: RfH(20),
  },
  menuContainerLarge: {
    width: RfW(167),
    height: RfH(216),
    marginLeft: RfW(24),
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: RfH(27),
  },

  menuContainer: {
    width: RfW(156),
    height: RfH(136),
    marginLeft: RfW(24),
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: RfH(27),
    alignSelf: 'flex-end'
  },
  menuEllipseContainer: {
    marginLeft: RfW(15),
    marginTop: RfH(15),
  },
  menuActionItem: {
    width: '100%',
  },
  imgBag: {
    width: RfW(108),
    height: RfH(131),
  }

});
export default styles;
