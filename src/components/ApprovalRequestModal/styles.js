import {StyleSheet, Platform} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {deviceHeight, RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
    backgroundColor: 'rgba(83,83,83,0.92)',
  },
  innerView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: RfH(25),
    borderTopRightRadius: RfH(25),
    paddingBottom: RfH(30)
  },
  header: {
    paddingVertical: RfH(24),
    paddingHorizontal: RfW(24),
    backgroundColor: Colors.white,
    shadowColor: 'rgba(96,70,51,0.09)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    borderTopLeftRadius: RfH(25),
    borderTopRightRadius: RfH(25),
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation:2,
  },
});

export default styles;
