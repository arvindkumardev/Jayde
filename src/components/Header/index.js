import React from 'react';
import PropTypes from 'prop-types';
import {BackHandler, View} from 'react-native';
import styles from './style';
import {RfH, RfW} from '../../utils/helpers';
import {Images} from '../../theme';
import {useFocusEffect} from '@react-navigation/core';
import {IconWrapper} from '../';
import CustomText from '../CustomText';
import {useIsFocused} from '@react-navigation/native';

function Header(props) {
  const {
    containerStyle,
    isBackButtonVisible,
    onBackPressHandler,
    titleText,
    titleStyle,
    isRightButtonVisible,
    onRightButtonClickHandler,
    rightContainer,
    titleFont,
    rightIcon
  } = props;

  const isFocused = useIsFocused();

  const backFunction = () => {
    onBackPressHandler();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        BackHandler.addEventListener('hardwareBackPress', backFunction);
      }
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backFunction);
      };
    }, [isFocused]),
  );

  return (
    <View>
      <View style={[styles.headerContainer, containerStyle]}>
        {isBackButtonVisible && (
          <View style={styles.leftContainer}>
            <IconWrapper
              iconWidth={RfW(22)}
              iconHeight={RfH(22)}
              iconImage={Images.arrowLeft}
              imageResizeMode={'contain'}
              submitFunction={backFunction}
            />
          </View>
        )}

        {titleText && (
          <CustomText
            numberOfLines={2}
            styling={{...styles.headerText, ...titleStyle}}
            fontSize={titleFont}
            fontWeight={'bold'}>
            {titleText}
          </CustomText>
        )}

        <View style={styles.rightContainer}>
          {isRightButtonVisible && (
            <IconWrapper
              iconImage={rightIcon?rightIcon:Images.search}
              iconWidth={RfW(20)}
              iconHeight={RfH(20)}
              submitFunction={onRightButtonClickHandler}
            />
          )}
        </View>
      </View>
    </View>
  );
}

Header.propTypes = {
  containerStyle: PropTypes.any,
  isBackButtonVisible: PropTypes.bool,
  onBackPressHandler: PropTypes.func.isRequired,
  titleText: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  isRightButtonVisible: PropTypes.bool,
  onRightButtonClickHandler: PropTypes.func,
  titleFont: PropTypes.any,
};

Header.defaultProps = {
  containerStyle: {},
  isBackButtonVisible: true,
  onBackPressHandler: null,
  titleStyle: {},
  isRightButtonVisible: false,
  onRightButtonClickHandler: null,
  titleFont: 17,
};

export default Header;
