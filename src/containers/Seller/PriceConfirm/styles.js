import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
// import { RFValue } from 'react-native-responsive-fontsize';
// import { STANDARD_SCREEN_SIZE } from '../../../utils/constants';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RfH(15),
    borderTopColor: '#707070',
    borderTopWidth: 1,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    marginTop: RfH(16),
    marginRight: RfW(20),
    marginBottom: RfH(20),
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 20,
    bottom: RfH(20)
  },
  provisionalBox: {
    width: RfW(321),
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  estPrice: {
    marginLeft: RfW(10),
  },
});

export default styles;