import {StyleSheet, Platform} from 'react-native';
import {RfH, RfW} from '../../utils/helpers';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    backgroundColor: 'rgba(83,83,83,0.92)',
    paddingHorizontal: RfW(30),
  },
  innerView: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: RfH(25),
    paddingBottom: RfH(20),
  },
});

export default styles;
