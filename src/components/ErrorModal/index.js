import {Modal, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import {Colors} from '../../theme';
import {RfH, RfW} from '../../utils/helpers';
import GradientButton from '../GradientButton';

function ErrorModal(props) {
  const {isVisible, openModal, errorObj} = props;

  const mainView = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.innerView}>
        <View
          style={{flex: 1, paddingHorizontal: RfW(24), alignItems: 'center'}}>
          <CustomImage
            image={errorObj.image}
            imageWidth={RfW(70)}
            imageHeight={RfH(70)}
            imageResizeMode={'contain'}
            containerStyling={{
              paddingVertical: RfH(20),
              justifyContent: 'center',
            }}
          />
          <View style={{marginHorizontal: RfW(21), alignItems: 'center'}}>
            {errorObj.title && (
              <CustomText
                fontSize={14}
                color={Colors.black}
                fontWeight={'bold'}>
                {errorObj.title}
              </CustomText>
            )}
            {errorObj.desc && (
              <CustomText
                styling={{marginTop: RfH(10), textAlign: 'center'}}
                fontSize={14}
                color={Colors.black}>
                {errorObj.desc}
              </CustomText>
            )}
          </View>
        </View>
        {errorObj.buttonText && errorObj.onButtonClick && (
          <View style={{marginTop: RfH(50), paddingHorizontal: RfW(24)}}>
            <GradientButton
              title={errorObj.buttonText}
              onPress={errorObj.onButtonClick}
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
      visible={isVisible}
      onRequestClose={openModal}>
      <TouchableWithoutFeedback onPress={openModal}>
        <View style={styles.container}>{mainView()}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

ErrorModal.propTypes = {
  isVisible: PropTypes.bool,
  openModal: PropTypes.func,
  errorObj: PropTypes.object,
};
ErrorModal.defaultProps = {
  isVisible: false,
  openModal: null,
  errorObj: '',
};
export default ErrorModal;
