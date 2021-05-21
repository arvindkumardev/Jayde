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
    paddingVertical: 15,
    borderTopColor: '#707070',
    borderTopWidth: 1,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    marginTop: 5,
    marginRight: 20,
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
    bottom: 20
  },
  provisionalBox: {
    width: 321,
    height: 190,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  estPrice: {
    marginLeft: 10,
  },
});

export default styles;