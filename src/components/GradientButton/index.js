import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import CustomText from '../CustomText';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {RfH} from '../../utils/helpers';

const GradientButton = (props) => {
  const {title, onPress, colors, fontSize, textColor, styling} = props;
  return (
    <View style={[styles.containerShadow, styling]}>
      <LinearGradient
        style={{borderRadius: RfH(20), flex: 1}}
        locations={[0.1, 1]}
        colors={colors}>
        <TouchableOpacity style={[styles.couponCodeButton]} onPress={onPress}>
          <CustomText fontSize={fontSize} fontWeight={'bold'} color={textColor}>
            {title}
          </CustomText>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

GradientButton.propTypes = {
  title: PropTypes.any,
  colors: PropTypes.array,
  styling: PropTypes.object,
  onPress: PropTypes.func,
};

GradientButton.defaultProps = {
  styling: {},
  textColor: Colors.white,
  fontSize: 18,
  colors: ['#ABC270', '#64B6E9', '#6932CE',],
  onPress: null,
};

export default GradientButton;
