import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Platform} from 'react-native';

function BiometricPopup(props) {
  const {handleSuccessfulAuth, handleFailure, isVisible} = props;
  useEffect(() => {
    if (isVisible) {
      if (Platform.OS === 'ios') {
        FingerprintScanner.authenticate({
          description:
            'Scan your fingerprint on the device scanner to continue',
          fallbackEnabled: false,
        })
          .then(() => {
            handleSuccessfulAuth();
          })
          .catch((error) => {
            console.log('error', error);
            if (error.name !== 'SystemCancel') {
              handleFailure();
            }
          });
      } else if (Platform.Version > 23) {
        FingerprintScanner.authenticate({
          description: 'Please Enable Biometric',
        })
          .then(() => {
            console.log('asss');
            handleSuccessfulAuth();
          })
          .catch((error) => {
            if (error.name !== 'SystemCancel') {
              handleFailure();
            }
          });
      }
    }
    return () => {
      FingerprintScanner.release();
    };
  }, [isVisible]);
  return <></>;
}

BiometricPopup.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
  handleFailure: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

export default BiometricPopup;
