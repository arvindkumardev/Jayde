import Colors from '../../theme/Colors';
import {RfH, RfW} from '../../utils/helpers';

const React = require('react-native');
const {StyleSheet} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    paddingHorizontal: RfW(18),
    // alignItems: 'center',
  },
  subContainer: {
    marginTop: RfH(95),
    paddingHorizontal: RfW(20),
    alignItems: 'center',
  },
  mainButton: {
    paddingVertical: RfH(11),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderRadius: RfH(15),
    width: '100%',
    marginTop: RfH(32),
  },
});
export default styles;
