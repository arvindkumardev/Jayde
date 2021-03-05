import React from 'react';
import PropTypes from 'prop-types';
import {Colors} from '../../theme';
import {CustomText, IconWrapper} from '../';
import {RfH, RfW} from '../../utils/helpers';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
function IconTile(props) {
  const {
    onPress,
    iconHeight,
    isShowTileText = false,
    iconWidth,
    iconImage,
    text,
    badgeCount,
  } = props;
  return (
    <View style={{alignItems: 'center', width: RfH(66), height:RfH(66), borderRadius:RfH(66)}}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          width:  RfH(66),
          height: RfH(66),
            shadowOffset: {width: 2, height: 3},
            shadowOpacity: 8,
            shadowColor: 'rgba(0,0,0,0.07)',
            shadowRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: RfH(66),
          elevation: 5,
          margin: RfW(5),
        }}
        onPress={onPress}
        activeOpacity={0.7}>
        {badgeCount > 0 && (
          <View style={styles.badge}>
            <CustomText color={Colors.white} fontWeight={'bold'} fontSize={13}>
              {badgeCount}
            </CustomText>
          </View>
        )}
        <IconWrapper
          iconHeight={RfH(iconHeight)}
          iconWidth={RfH(iconWidth)}
          iconImage={iconImage}
          imageResizeMode={'cover'}
        />
      </TouchableOpacity>
      <CustomText
        color={Colors.black}
        fontSize={14}
        numberOfLines={2}
        styling={{marginTop: RfH(5), width: '80%', textAlign: 'center'}}>
        {text}
      </CustomText>
    </View>
  );
}

IconTile.propTypes = {
  onPress: PropTypes.func,
  iconHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconImage: PropTypes.any.isRequired,
  iconWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
};

IconTile.defaultProps = {
  onPress: null,
  iconHeight: 40,
  iconWidth: 40,
  text: '',
};

export default IconTile;
