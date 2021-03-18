import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from './Colors';
import {STANDARD_SCREEN_SIZE} from '../utils/constants';
import Font from './Fonts';
import {RfW} from '../utils/helpers';
import {Fonts} from './index';

const commonStyles = StyleSheet.create({
  inputLabelStyle: {
    fontFamily: Font.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.coolGrey,
  },
  timeSlotStyle: {
    fontFamily: Font.regular,
    fontSize: RFValue(12, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.coolGrey,
  },
  inputStyle: {
    fontFamily: Font.regular,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.backgroundBlack,
    paddingHorizontal: RfW(14),
  },
  descriptionInputText: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(15, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    color: Colors.black,
    paddingLeft: RfW(10),
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'top',
  },
  inputLabelText: {
    fontFamily: Font.regular,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: Colors.coolGrey,
    marginBottom: 5,
  },
  dropDownText: {
    fontFamily: Fonts.regular,
    fontSize: 15
  },
});
export default commonStyles;
