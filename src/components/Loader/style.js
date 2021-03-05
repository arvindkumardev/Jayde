import { StyleSheet, } from 'react-native';
import {deviceHeight, RfH} from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignSelf: 'center',
    position: 'absolute',
    flex: 1,
    elevation: 1,
    width: '100%',
    height:'100%',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(5,5,5,0.5)',
  },
  activityWrapper: {
    position: 'absolute',
    flex: 1,
    elevation: 1,
    top: deviceHeight()/2,
    bottom: 0,
  }
});

export default styles;
