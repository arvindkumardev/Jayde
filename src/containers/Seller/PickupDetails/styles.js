import { StyleSheet, Dimensions } from 'react-native';
import { RfH, RfW } from '../../../utils/helpers';
import Fonts from "../../../theme/Fonts";
import { Colors } from '../../../theme';
const { width, height } = Dimensions.get('window');
import {STANDARD_SCREEN_SIZE} from '../../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';

const labelLeft = (width - 250) / 2;
const iconLeft = (width - 45) / 2;

const styles = StyleSheet.create({
  changeTxtButtonContainer: {
    flex: 1
  },
  mapView: {
    width: width,
    height: width
  },
  mapContainer: {
    flex: 1
  },
  txtPrimary: {
    color: Colors.mango,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  firstElement: {
    flex: 3,
    fontFamily: Fonts.regular,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  userInputContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 20
  },
  labelPosition: {
    left: labelLeft,
    width: 250,
    marginTop: -77,
    position: 'absolute',
    top: '52%'
  },
  markerFixed: {
    left: iconLeft,
    marginTop: -50,
    position: 'absolute',
    top: '55%'
  },
  inputBox: {
    backgroundColor: Colors.grayTwo,
    borderRadius: 10,
    paddingLeft: 10
  },
  starText: {
    color: '#f75006',
    fontSize: RFValue(13, STANDARD_SCREEN_SIZE),
  },
});

export default styles;