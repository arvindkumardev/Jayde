import {StyleSheet} from 'react-native';
import {RfH, RfW, deviceWidth} from '../../utils/helpers';

const styles = StyleSheet.create({
  containerShadow: {
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 1,
    shadowColor: 'rgba(105,50,206,0.3)',
    shadowRadius: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation:4,
    height: RfH(48),
  },
  couponCodeButton: {
    alignItems: 'center',
    borderRadius: RfW(12),
    paddingVertical: RfH(17),
    justifyContent: 'center',
  },
});

export default styles;
