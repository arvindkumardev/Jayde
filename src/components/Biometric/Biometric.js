import {Modal, View} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import Images from '../../theme/Images';
import Colors from '../../theme/Colors';
import {RfH} from '../../utils/helpers';
import CustomText from '../CustomText';
import CustomImage from '../CustomImage';
import BiometricPopup from './BiometricPopUp';
import {GradientButton} from '../index';
import { logEvent } from '../../services/firebase/AnalyticService';
import {ANALYTICS_EVENTS} from '../../services/firebase/AnalyticConstant'

function Biometric(props) {
  const {
    isFaceIdEnable,
    biometricModelVisible,
    cancelButtonClick,
    handleFailure,
    handleSuccessfulAuth,
  } = props;

  const [popupShowed, setPopupShowed] = useState(false);

  const biometricEnableButtonClick = () => {
    setPopupShowed(true);
    logEvent({ event: ANALYTICS_EVENTS.ENABLE_BIOMETRIC , info: '' })
  };

  return (
    <Modal visible={biometricModelVisible} transparent={false}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <CustomText
            fontSize={32}
            color={Colors.primaryBlack}
            fontWeight={'bold'}>
            {'Biometric Setup'}
          </CustomText>
          <CustomText
            fontSize={16}
            color={Colors.primaryBlack}
            styling={{marginTop: RfH(12), textAlign: 'center'}}>
            Your Touch/Face ID can be your password. Enable biometric to login
            easier.
          </CustomText>
          <CustomImage
            image={Images.biometric}
            imageWidth={RfH(200)}
            imageHeight={RfH(277)}
            styling={{marginTop: RfH(88)}}
            imageResizeMode={'contain'}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: RfH(60),
            paddingHorizontal: RfH(25),
          }}>
          <GradientButton
            title={'ENABLE BIOMETRICS'}
            onPress={biometricEnableButtonClick}
          />
          <GradientButton
            title={'I WILL DO LATER'}
            styling={{marginTop: RfH(20)}}
            colors={['#E7EDEF', '#FCFCFC']}
            textColor={'#6932CE'}
            onPress={cancelButtonClick}
          />
        </View>
      </View>

      {popupShowed && (
        <BiometricPopup
          handleSuccessfulAuth={handleSuccessfulAuth}
          handleFailure={handleFailure}
          isVisible={popupShowed}
        />
      )}
    </Modal>
  );
}

Biometric.propTypes = {
  isFaceIdEnable: PropTypes.bool,
  biometricModelVisible: PropTypes.bool,
  cancelButtonClick: PropTypes.func,
  handleSuccessfulAuth: PropTypes.func,
  handleFailure: PropTypes.func,
};
Biometric.defaultProps = {
  isFaceIdEnable: false,
  biometricModelVisible: false,
  cancelButtonClick: null,
  handleSuccessfulAuth: null,
  handleFailure: null,
};
export default Biometric;
