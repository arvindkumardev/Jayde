import {Images} from '../theme';

const CREDENTIAL_ERROR = {
  title: 'Oops!',
  desc: 'You were unable to login with your credentials.',
  buttonText: 'TRY AGAIN',
  image: Images.errorCredential,
};

const FACE_ID_ERROR = {
  title: 'Oops!',
  desc: 'You were unable to login with your face ID.',
  buttonText: 'TRY AGAIN',
  image: Images.errorFaceId,
};

const FINGER_ID_ERROR = {
  title: 'Oops!',
  desc: 'You were unable to login with your fingerprint.',
  buttonText: 'TRY AGAIN',
  image: Images.errorFingerId,
};

const BIOMETRIC_FAILURE_ERROR = {
  title: 'Biometric failed!',
  desc: 'Please login again.',
  buttonText: 'Login',
  image: Images.errorCredential,
};

const CANCEL_BIOMETRIC_ERROR = {
  title: 'Oops!',
  desc: 'You can set up Face Id or Touch Id later in the App.',
  buttonText: 'Ok',
  image: Images.errorFingerId,
};

export {
  CREDENTIAL_ERROR,
  FACE_ID_ERROR,
  FINGER_ID_ERROR,
  CANCEL_BIOMETRIC_ERROR,
  BIOMETRIC_FAILURE_ERROR
};
