/* eslint-disable react/prop-types */
import {Modal, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import {Colors} from '../../theme';
import {RfH, RfW} from '../../utils/helpers';
import GradientButton from '../GradientButton';

function NonCancellableModal(props) {
  const {isVisible, onButtonClick, dataObject} = props;

  const mainView = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.innerView}>
        <View
          style={{flex: 1, paddingHorizontal: RfW(24), alignItems: 'center'}}>
          <CustomImage
            image={dataObject.image}
            imageWidth={RfW(70)}
            imageHeight={RfH(70)}
            imageResizeMode={'contain'}
            containerStyling={{
              paddingVertical: RfH(50),
              justifyContent: 'center',
            }}
          />
          <View style={{marginHorizontal: RfW(21), alignItems: 'center'}}>
            {dataObject.title && (
              <CustomText
                fontSize={16}
                color={Colors.primaryBlack}
                fontWeight={'bold'}>
                {dataObject.title}
              </CustomText>
            )}
            {dataObject.desc && (
              <CustomText
                styling={{marginTop: RfH(15), textAlign: 'center'}}
                fontSize={16}
                color={Colors.primaryBlack}>
                {dataObject.desc}
              </CustomText>
            )}
          </View>
        </View>
        {dataObject.buttonText && onButtonClick && (
          <View style={{marginTop: RfH(55), paddingHorizontal: RfW(24)}}>
            <GradientButton
              title={dataObject.buttonText}
              onPress={onButtonClick}
            />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

NonCancellableModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  errorObj: PropTypes.object,
};
NonCancellableModal.defaultProps = {
  isVisible: false,
  openModal: null,
  errorObj: '',
};
export default NonCancellableModal;
