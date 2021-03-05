import BottomTabIcons from './icons/bottomTabIcons';
import ApprovalIcon from './icons/approvalIcon';
import CommonIconsOld from './icons/commonIconsold';
import CommonIcons from './icons/commonIcons';
import loginIcon from './icons/loginIcons';
import offers from './icons/offers';
import errorIcon from './icons/errorIcons';

const Images = {
  illustration: require('../assets/login/illustration.png'),
  profilePlaceholder: require('../assets/profilePlaceholder.png'),
  forgotPassword: require('../assets/login/forgotPassword.png'),
  forgotPassLogo: require('../assets/forgotPassword/forgotPassword.png'),
  forgotPassSuccess: require('../assets/forgotPassword/forgotPasswordSuccess.png'),
  email: require('../assets/common/email.png'),
  call: require('../assets/common/call.png'),
  whatsapp: require('../assets/common/whatsapp.png'),
  arrowLeft: require('../assets/common/arrowLeft.png'),
  help: require('../assets/login/help.png'),
  illustrationEmail: require('../assets/faq/illustrationEmail.png'),
  tickBlue: require('../assets/common/tickBlue.png'),
  crossBlack: require('../assets/common/crossBlack.png'),
  arrowRight: require('../assets/common/arrowRight.png'),
  close:require('../assets/common/close.png'),
  delete:require('../assets/common/delete.png'),
  redeemOtp:require('../assets/verifyOtp/redeem_otp.png'),
  otpSent: require('../assets/verifyOtp/otpSent.png'),
  ...BottomTabIcons,
  ...offers,
  ...ApprovalIcon,
  ...CommonIcons,
  ...loginIcon,
  ...errorIcon,
  ...CommonIconsOld,
};
export default Images;
