import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// import * as Yup from 'yup';
// import {useFormik} from 'formik';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
// import Colors from '../../theme/Colors';
// import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
// import {alertBox, comingSoonAlert, getSaveData, isValidUserName, RfH, RfW, storeData} from '../../utils/helpers';
// import {inputs, LOCAL_STORAGE_DATA_KEY,} from '../../utils/constants';
// import CustomText from '../../components/CustomText';
// import {isEmpty} from 'lodash';
// import Images from '../../theme/Images';
// import NavigationRouteNames from '../../routes/ScreenNames';
// import {useNavigation} from '@react-navigation/core';
// import Biometric from '../../components/Biometric';
// import UserContext from './user.context';
// import useAxios from 'axios-hooks';
// import styles from './styles';
// import {LOGIN_URL} from '../../utils/urls';
// import commonStyles from '../../theme/commonStyles';
// import {BIOMETRIC_FAILURE_ERROR, FACE_ID_ERROR, FINGER_ID_ERROR,} from '../../utils/error';
// import {logEvent} from '../../services/firebase/AnalyticService';
// import {ANALYTICS_EVENTS} from '../../services/firebase';

// clearAll()
function AccountCreate() {
  // const navigation = useNavigation();
  // const [clickLogin, setClickLogin] = useState(false);
  // const [openBiometric, setOpenBiometric] = useState(false);
  // const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  // const {user, setUserObj, setLogin, orgLoading, orgData, setLoader} = useContext(UserContext);
  // const [tries, setTries] = useState(2);
  // const [selectCompany, setSelectCompany] = useState({});
  // const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  // const [needHelpModal, setNeedHelpModal] = useState(false);
  // const [hidePassword, setHidePassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [isFaceId, setIsFaceId] = useState(false);
  // const [biometric, setBiometric] = useState({
  //   isFaceId: false,
  //   isTouchId: false,
  //   modelVisible: false,
  // });
  // const [errorObj, setErrorObj] = useState({
  //   errorDescription: '',
  //   errorTitle: 'Oops!',
  //   errorImage: Images.errorCredential,
  // });

  // const [
  //   {data: emLoginData, loading: emLoginLoading, error: emLoginError},
  //   emLogin,
  // ] = useAxios(
  //   {
  //     url: LOGIN_URL,
  //     method: 'get',
  //   },
  //   {manual: true},
  // );

  // const triggerLogin = (username, password, org) => {
  //   emLogin();
  //     // emLogin({
  //     //   data: {
  //     //     userName: username,
  //     //     passWord: password,
  //     //   },
  //     // });
  // };

  // const detectFingerprintAvailable = () => {
  //   console.log("isBiometricEnabled",isBiometricEnabled)
  //   if (isBiometricEnabled) {
  //     navigateToHome();
  //   } else {
  //     if (rememberMe) {
  //       storeData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME, JSON.stringify(true));
  //       storeData(LOCAL_STORAGE_DATA_KEY.USER_INFO, {
  //         userInfo: loginForm.values,
  //         org: selectCompany,
  //       });
  //     }
  //     FingerprintScanner.isSensorAvailable()
  //       .then((biometryType) => {
  //         setBiometric({
  //           isFaceId: biometryType === 'Face ID',
  //           isTouchId: biometryType === 'Touch ID',
  //           modelVisible: true,
  //         });
  //       })
  //       .catch(() => {
  //         navigateToHome();
  //       });
  //   }
  // };

  // useEffect(() => {
  //   if (emLoginData) {
  //       detectFingerprintAvailable();
  //     } else {
  //       console.log("error")
  //     }
  // }, [emLoginData]);

  // const setBiometricChange = () => {
  //   setOpenBiometric(true);
  // };

  // useEffect(() => {
  //   loginForm.validateForm();
  //   FingerprintScanner.isSensorAvailable().then((biometryType) => {
  //     setIsFaceId(biometryType === 'Face ID');
  //     setBiometric({
  //       isFaceId: biometryType === 'Face ID',
  //       isTouchId: biometryType === 'Touch ID',
  //       modelVisible: false,
  //     });
  //   });
  //   if(!isEmpty(orgData)) {
  //     getSaveData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then((token) => {
  //       if (token) {
  //         setIsBiometricEnabled(true);
  //         setOpenBiometric(true);
  //       } else {
  //         getSaveData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME).then((token) => {
  //           if (token) {
  //             getSaveData(LOCAL_STORAGE_DATA_KEY.USER_INFO).then((userData) => {
  //               if (userData) {
  //                 const userDataJson = JSON.parse(userData);
  //                 triggerLogin(
  //                     userDataJson.userInfo.username,
  //                     userDataJson.userInfo.password,
  //                     userDataJson.org,
  //                 );
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, [orgData]);

  // useEffect(() => {
  //   if (openBiometric && !isEmpty(orgData)) {
  //     FingerprintScanner.authenticate({
  //       description: 'Validate the biometrics to continue',
  //       fallbackEnabled: true,
  //     })
  //       .then(() => {
  //         handleSuccessfulAuthBiometric();
  //       })
  //       .catch((error) => {
  //         console.log('error', error);
  //         if (error.name === 'DeviceLocked') {
  //           Alert.alert(
  //             'Secure',
  //             'Authentication failed please login again',
  //             [
  //               {
  //                 text: 'Login',
  //                 onPress: () =>
  //                   storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, ''),
  //               },
  //             ],
  //             {cancelable: false},
  //           );
  //         }
  //         if (error.name === 'UserCancel') {
  //           handleFailureBiometric();
  //         }
  //       });
  //   }
  //   return () => {
  //     FingerprintScanner.release();
  //   };
  // }, [openBiometric, orgData]);

  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().test('username', 'Please provide valid username', value => isValidUserName(value)),
  //   password: Yup.string().required('Please provide password'),
  // });

  // const loginForm = useFormik({
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   initialValues: {
  //     username: '',
  //     password: ''
  //   },
  //   validationSchema,
  // });

  // const onSubmitEditing = (id) => {
  //   return inputs[id] ? inputs[id].focus() : null;
  // };

  // const navigateToHome = () => {
  //   setBiometric({...biometric, modelVisible: false});
  //   setLogin(true);
  // };

  // const handleFailureBiometric = () => {
  //   if (tries > 0) {
  //     setOpenBiometric(false);
  //     setShowError(true);
  //     setErrorObj({
  //       ...(isFaceId ? FACE_ID_ERROR : FINGER_ID_ERROR),
  //       onButtonClick: () => {
  //         setBiometricChange();
  //         setShowError(false);
  //       },
  //     });
  //     setTries(tries - 1);
  //   } else {
  //     setShowError(true);
  //     setErrorObj({
  //       ...BIOMETRIC_FAILURE_ERROR,
  //       onButtonClick: () => {
  //         setBiometricChange();
  //         setShowError(false);
  //       },
  //     });
  //   }
  // };

  // const handleSuccessfulAuthBiometric = () => {
  //   setOpenBiometric(false);
  //   getSaveData(LOCAL_STORAGE_DATA_KEY.USER_INFO).then(async (userData) => {
  //     if (userData) {
  //       const userDataJson = JSON.parse(userData);
  //       triggerLogin(
  //         userDataJson.userInfo.username,
  //         userDataJson.userInfo.password,
  //         userDataJson.org,
  //       );
  //     }
  //   });
  // };

  // const handleLogin = () => {
  //   setClickLogin(true);
  //   if (isEmpty(loginForm.errors)) {
  //     triggerLogin(
  //       loginForm.values.username,
  //       loginForm.values.password,
  //       selectCompany,
  //     );
  //   }
  // };

  // const handleSuccessfulAuth = () => {
  //   setBiometric({...biometric, modelVisible: false});
  //   storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, JSON.stringify(true));
  //   storeData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME, JSON.stringify(false));
  //   storeData(LOCAL_STORAGE_DATA_KEY.USER_INFO, {
  //     userInfo: loginForm.values,
  //     org: selectCompany,
  //   });
  //   navigateToHome();
  // };

  // const handleFailure = () => {
  //   alertBox(
  //     'Authentication Error',
  //     'Authentication failed set Face Id or Touch Id later in the App',
  //     {
  //       positiveText: 'Ok',
  //       onPositiveClick: navigateToHome,
  //     },
  //   );
  // };

  // const cancelButtonClick = () => {
  //   alertBox('', 'You can set up Face Id or Touch Id later in the App', {
  //     positiveText: 'Ok',
  //     onPositiveClick: navigateToHome,
  //   });
  // };

  // const onNeedHelpClick = (id) => {
  //   setNeedHelpModal(false);
  //   if (id === 2) {
  //     navigation.navigate(NavigationRouteNames.FAQ);
  //     logEvent({event: ANALYTICS_EVENTS.FAQS_AND_HELP, info: ''});
  //   } else {
  //      navigation.navigate(NavigationRouteNames.FORGOT_PASSWORD);
  //   }
  // };

  // useEffect(()=>{
  //   setLoader(emLoginLoading);
  // }, [emLoginLoading]);

  const [title, setTitle] = useState('Your account has been created');
  const [title1, setTitle1] = useState('Signup');
  // const [title2,setTitle2]=useState('Current Orders');

  return (
    <View style={{ flex: 1, backgroundColor: '#f7a435' }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <View>
                <Image
                  style={{ width: 24, height: 24, marginLeft: 24 }}
                  source={require('../../assets/Images/AccountCreate/Left_Arrow_Icon.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 16, color: '#fff', marginRight: 20 }}>{title1}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Image
            style={{ width: 155, height: 54 }}
            source={require('../../assets/Images/AccountCreate/JaydeLogo01.png')}
          />
        </View>

        <View
          style={{
            flex: 1,
            width: 310,
            height: 218,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            borderRadius: 20,
            marginLeft: 24,
            marginTop: 62,
          }}>
          <Image
            style={{ width: 114, height: 114, marginTop: 32 }}
            source={require('../../assets/Images/AccountCreate/Group.png')}
          />
          <Text style={{ fontSize: 15, color: '#232323' }}>{title}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default AccountCreate;
