import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Colors from '../../theme/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {STANDARD_SCREEN_DIMENSIONS} from '../../utils/constants';
import {Fonts} from '../../theme';

const CustomText = (props) => {
  const {
    fontSize,
    fontWeight,
    fontFamily,
    fontStyle,
    color,
    styling,
    onPress,
    numberOfLines,
    textTransform
  } = props;
  const finalStyle = {
    fontSize: RFValue(fontSize, STANDARD_SCREEN_DIMENSIONS.height),
    fontWeight,
    fontStyle,
    fontFamily,
    color,
    textTransform,
    ...styling,
  };
  return (
    <Text style={finalStyle} onPress={onPress}
    numberOfLines={numberOfLines}>
      {props.children}
    </Text>
  );
};

CustomText.propTypes = {
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  styling: PropTypes.object,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  textTransform:PropTypes.any, //  before number
};
CustomText.defaultProps = {
  fontSize: 12,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: Fonts.regular,
  color: Colors.black,
  styling: {},
  numberOfLines: 0,
  textTransform:'none'
};

export default CustomText;
