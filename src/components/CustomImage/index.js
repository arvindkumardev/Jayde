import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {getIconImageStyle} from './style';
import {getImageSource, RfH, RfW} from '../../utils/helpers';
import Colors from '../../theme/Colors';
import Images from '../../theme/Images';

function CustomImage(props) {
  const {
    submitFunction,
    image,
    imageHeight,
    styling,
    imageResizeMode,
    imageWidth,
    placeHolderImage,
    containerStyling,
    activityIndicatorColor,
  } = props;
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageObject = image ? getImageSource(image) : placeHolderImage;
  const sourceImage = isError ? getImageSource(placeHolderImage) : imageObject;
  return (
    <View style={{}}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={!submitFunction}
        onPress={submitFunction}
        style={[containerStyling, {}]} >
        {loading && (
          <View
            style={[
              {
                position: 'absolute',
                left: imageWidth / 2 - RfW(10),
                top: imageHeight / 2 - RfH(10),
              },
              styling,
            ]}>
            <ActivityIndicator color={activityIndicatorColor} />
          </View>
        )}
        <Image
          source={sourceImage}
          onError={() => {
            setIsError(true);
            setLoading(false);
          }}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          onLoadEnd={() => setLoading(false)}
          style={[
            getIconImageStyle(imageHeight, imageWidth),
            styling,
            {
              resizeMode: imageResizeMode,
              // height: imageHeight,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

CustomImage.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyling: PropTypes.object,
  displayLoadingImage: PropTypes.bool,
  imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.any,
  imageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageResizeMode: PropTypes.string,
  placeHolderImage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  styling: PropTypes.any,
  submitFunction: PropTypes.func,
  activityIndicatorColor: PropTypes.any,
};

CustomImage.defaultProps = {
  backgroundColor: '#000000',
  imageHeight: 50,
  imageWidth: 50,
  imageResizeMode: 'contain',
  styling: {},
  containerStyling: {},
  submitFunction: null,
  placeHolderImage: Images.forgotPassLogo,
  displayLoader: false,
  activityIndicatorColor: Colors.blue,
};

export default CustomImage;
