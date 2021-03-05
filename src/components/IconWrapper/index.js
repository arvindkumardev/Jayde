import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {getIconImageStyle} from './style';
import {getImageSource} from '../../utils/helpers';

const IconWrapper = (props) => {
  const {
    submitFunction,
    iconHeight,
    iconWidth,
    styling,
    imageResizeMode,
    onHold,
    onLeave,
    iconImage,
    placeHolderImage,
    displayLoadingImage,
    onPressIn,
    containerStyling,
  } = props;
  const [isError, setIsError] = useState(false);

  const imageObject = getImageSource(iconImage);
  const sourceImage = isError ? getImageSource(placeHolderImage) : imageObject;
  const iconMainHeight = get(styling, 'height', iconHeight);
  const iconMainWidth = get(styling, 'width', iconWidth);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!(submitFunction || onHold || onLeave)}
        onLongPress={onHold}
        onPress={submitFunction}
        onPressIn={onPressIn}
        onPressOut={onLeave}
        style={containerStyling}>
        {displayLoadingImage ? (
          <ImageBackground
            imageStyle={[
              getIconImageStyle(iconMainHeight, iconMainWidth),
              styling,
              {resizeMode: imageResizeMode},
            ]}
            onError={() => setIsError(true)}
            onLoadEnd={() =>
              this.setState({
                loading: false,
              })
            }
            source={sourceImage}
            style={[getIconImageStyle(iconMainHeight, iconMainWidth)]}
          />
        ) : (
          <Image
            onError={() => setIsError(true)}
            source={sourceImage}
            style={[
              getIconImageStyle(iconHeight, iconWidth),
              styling,
              {resizeMode: imageResizeMode},
            ]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

IconWrapper.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyling: PropTypes.object,
  displayLoadingImage: PropTypes.bool,
  iconHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconImage: PropTypes.any.isRequired,
  iconWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageResizeMode: PropTypes.string,
  onHold: PropTypes.func,
  onLeave: PropTypes.func,
  onPressIn: PropTypes.func,
  placeHolderImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  styling: PropTypes.object,
  submitFunction: PropTypes.func,
};

IconWrapper.defaultProps = {
  backgroundColor: '#000',
  iconHeight: 50,
  iconWidth: 50,
  imageResizeMode: 'contain',
  onHold: null,
  onLeave: null,
  onPressIn: null,
  styling: {},
  containerStyling: {},
  submitFunction: null,
  placeHolderImage: '',
  displayLoadingImage: false,
};

export default IconWrapper;
