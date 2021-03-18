import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView, } from 'react-native';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Colors from '../../theme/Colors';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import {alertBox, comingSoonAlert, getSaveData, isValidUserName, RfH, RfW, storeData} from '../../utils/helpers';
import {inputs, LOCAL_STORAGE_DATA_KEY,} from '../../utils/constants';
import CustomText from '../../components/CustomText';
import {isEmpty} from 'lodash';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import Biometric from '../../components/Biometric';
import UserContext from './user.context';
import useAxios from 'axios-hooks';
import styles from './styles';
import {LOGIN_URL} from '../../utils/urls';
import commonStyles from '../../theme/commonStyles';
import {BIOMETRIC_FAILURE_ERROR, FACE_ID_ERROR, FINGER_ID_ERROR,} from '../../utils/error';
import {logEvent} from '../../services/firebase/AnalyticService';
import {ANALYTICS_EVENTS} from '../../services/firebase';

// clearAll()
function Login() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const [openBiometric, setOpenBiometric] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const {user, setUserObj, setLogin, orgLoading, orgData, setLoader} = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isFaceId, setIsFaceId] = useState(false);
  const [biometric, setBiometric] = useState({
    isFaceId: false,
    isTouchId: false,
    modelVisible: false,
  });
  const [errorObj, setErrorObj] = useState({
    errorDescription: '',
    errorTitle: 'Oops!',
    errorImage: Images.errorCredential,
  });

  const [
    {data: emLoginData, loading: emLoginLoading, error: emLoginError},
    emLogin,
  ] = useAxios(
    {
      url: LOGIN_URL,
      method: 'get',
    },
    {manual: true},
  );

  const triggerLogin = (username, password, org) => {
    emLogin();
      // emLogin({
      //   data: {
      //     userName: username,
      //     passWord: password,
      //   },
      // });
  };

  const detectFingerprintAvailable = () => {
    console.log("isBiometricEnabled",isBiometricEnabled)
    if (isBiometricEnabled) {
      navigateToHome();
    } else {
      if (rememberMe) {
        storeData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME, JSON.stringify(true));
        storeData(LOCAL_STORAGE_DATA_KEY.USER_INFO, {
          userInfo: loginForm.values,
          org: selectCompany,
        });
      }
      FingerprintScanner.isSensorAvailable()
        .then((biometryType) => {
          setBiometric({
            isFaceId: biometryType === 'Face ID',
            isTouchId: biometryType === 'Touch ID',
            modelVisible: true,
          });
        })
        .catch(() => {
          navigateToHome();
        });
    }
  };

  useEffect(() => {
    if (emLoginData) {
        detectFingerprintAvailable();
      } else {
        console.log("error")
      }
  }, [emLoginData]);

  const setBiometricChange = () => {
    setOpenBiometric(true);
  };

  useEffect(() => {
    loginForm.validateForm();
    FingerprintScanner.isSensorAvailable().then((biometryType) => {
      setIsFaceId(biometryType === 'Face ID');
      setBiometric({
        isFaceId: biometryType === 'Face ID',
        isTouchId: biometryType === 'Touch ID',
        modelVisible: false,
      });
    });
    if(!isEmpty(orgData)) {
      getSaveData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE).then((token) => {
        if (token) {
          setIsBiometricEnabled(true);
          setOpenBiometric(true);
        } else {
          getSaveData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME).then((token) => {
            if (token) {
              getSaveData(LOCAL_STORAGE_DATA_KEY.USER_INFO).then((userData) => {
                if (userData) {
                  const userDataJson = JSON.parse(userData);
                  triggerLogin(
                      userDataJson.userInfo.username,
                      userDataJson.userInfo.password,
                      userDataJson.org,
                  );
                }
              });
            }
          });
        }
      });
    }
  }, [orgData]);

  useEffect(() => {
    if (openBiometric && !isEmpty(orgData)) {
      FingerprintScanner.authenticate({
        description: 'Validate the biometrics to continue',
        fallbackEnabled: true,
      })
        .then(() => {
          handleSuccessfulAuthBiometric();
        })
        .catch((error) => {
          console.log('error', error);
          if (error.name === 'DeviceLocked') {
            Alert.alert(
              'Secure',
              'Authentication failed please login again',
              [
                {
                  text: 'Login',
                  onPress: () =>
                    storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, ''),
                },
              ],
              {cancelable: false},
            );
          }
          if (error.name === 'UserCancel') {
            handleFailureBiometric();
          }
        });
    }
    return () => {
      FingerprintScanner.release();
    };
  }, [openBiometric, orgData]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().test('username', 'Please provide valid username', value => isValidUserName(value)),
    password: Yup.string().required('Please provide password'),
  });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
  });

  const onSubmitEditing = (id) => {
    return inputs[id] ? inputs[id].focus() : null;
  };

  const navigateToHome = () => {
    setBiometric({...biometric, modelVisible: false});
    setLogin(true);
  };

  const handleFailureBiometric = () => {
    if (tries > 0) {
      setOpenBiometric(false);
      setShowError(true);
      setErrorObj({
        ...(isFaceId ? FACE_ID_ERROR : FINGER_ID_ERROR),
        onButtonClick: () => {
          setBiometricChange();
          setShowError(false);
        },
      });
      setTries(tries - 1);
    } else {
      setShowError(true);
      setErrorObj({
        ...BIOMETRIC_FAILURE_ERROR,
        onButtonClick: () => {
          setBiometricChange();
          setShowError(false);
        },
      });
    }
  };

  const handleSuccessfulAuthBiometric = () => {
    setOpenBiometric(false);
    getSaveData(LOCAL_STORAGE_DATA_KEY.USER_INFO).then(async (userData) => {
      if (userData) {
        const userDataJson = JSON.parse(userData);
        triggerLogin(
          userDataJson.userInfo.username,
          userDataJson.userInfo.password,
          userDataJson.org,
        );
      }
    });
  };

  const handleLogin = () => {
    setClickLogin(true);
    if (isEmpty(loginForm.errors)) {
      triggerLogin(
        loginForm.values.username,
        loginForm.values.password,
        selectCompany,
      );
    }
  };

  const handleSuccessfulAuth = () => {
    setBiometric({...biometric, modelVisible: false});
    storeData(LOCAL_STORAGE_DATA_KEY.IS_BIOMETRIC_ENABLE, JSON.stringify(true));
    storeData(LOCAL_STORAGE_DATA_KEY.REMEMBER_ME, JSON.stringify(false));
    storeData(LOCAL_STORAGE_DATA_KEY.USER_INFO, {
      userInfo: loginForm.values,
      org: selectCompany,
    });
    navigateToHome();
  };

  const handleFailure = () => {
    alertBox(
      'Authentication Error',
      'Authentication failed set Face Id or Touch Id later in the App',
      {
        positiveText: 'Ok',
        onPositiveClick: navigateToHome,
      },
    );
  };

  const cancelButtonClick = () => {
    alertBox('', 'You can set up Face Id or Touch Id later in the App', {
      positiveText: 'Ok',
      onPositiveClick: navigateToHome,
    });
  };

  const onNeedHelpClick = (id) => {
    setNeedHelpModal(false);
    if (id === 2) {
      navigation.navigate(NavigationRouteNames.FAQ);
      logEvent({event: ANALYTICS_EVENTS.FAQS_AND_HELP, info: ''});
    } else {
       navigation.navigate(NavigationRouteNames.FORGOT_PASSWORD);
    }
  };

  useEffect(()=>{
    setLoader(emLoginLoading);
  }, [emLoginLoading]);

  const [title,setTitle]=useState('Hello!');
  const [title1,setTitle1]=useState('Click here');
  const [title2,setTitle2]=useState('Dont have an account?');
  const [title3,setTitle3]=useState('Create one');
  const [title4,setTitle4]=useState('PARTNER LOGIN');

  return (
    <View style={{flex: 1,backgroundColor:Colors.mango}}>
      <ScrollView>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({android: 'height', ios: 'padding'})}
          enabled>
              {/* <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 160, height: 55}} source={require('./JaydeLogo01.png')}  />    
              </View>  */}
              <View style={{flex: 1,}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingBottom: RfH(40),
            }}>
           

           <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 160, height: 55}} source={require('../../assets/Images/Login/JaydeLogo01.png')}  />    
                {/* <Image
          style={{width: 34, height: 34}}
          source={{uri: 
       'https://i.ytimg.com/vi/h1iPGP72Y8c/maxresdefault.jpg'}}
        /> */}
              </View> 

              <View style={{alignItems: 'center', marginTop: 60,}}>
              <Text style={{color: '#fff', marginBottom: 20, fontSize : 40, lineHeight: 48, fontWeight: 'bold',}}>{title}</Text>
              </View>
            <View style={styles.formContainer}>
              <CustomText
                fontSize={22}
                color={Colors.black}
                fontWeight={'500'}>
                Mobile Number*
              </CustomText>
              {/* <CustomTextInput
                label={'Username'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Email/Mobile Number'}
                value={loginForm.values.username}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('username', value)
                }
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('password')}
                error={clickLogin && loginForm.errors.username}
              /> */}
              <CustomTextInput
                // label={'Password'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'+91'}

                handleShowPassword={(value) => setHidePassword(value)}
                // icon={hidePassword ? Images.openEye : Images.closeEye}
                value={loginForm.values.password}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('password', value)
                }
                showClearButton={false}
                keyboardType={'numeric'}
                refKey={'password'}
                error={clickLogin && loginForm.errors.password}
              />
            

              {/* <View style={styles.checkBoxContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBoxWrapper
                    isChecked={rememberMe}
                    checkBoxHandler={() =>
                      setRememberMe((rememberMe) => !rememberMe)
                    }
                  />
                   <View style={{marginLeft: RfW(10)}}>
                    <CustomText
                      color={Colors.black}
                      fontSize={12}
                      styling={{paddingVertical: RfH(4)}}>
                      Keep me logged in
                    </CustomText>
                  </View> 
                </View>
                <TouchableOpacity
                  onPress={comingSoonAlert}
                  activeOpacity={0.7}>
                  <CustomText fontSize={12} color={Colors.black}>
                    Need help?
                  </CustomText>
                </TouchableOpacity>
              </View> */}
              <View style={{marginTop: RfH(21)}}>
                <GradientButton title={'Confirm'} onPress={handleLogin} />
              </View>
             
            </View>
            
            <View style={{flex: 1}}>
          <View style={{marginTop: 15, marginHorizontal: RfW(56),
    backgroundColor: Colors.white,
    padding: RfW(10),
    borderRadius: RfH(25),}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <Text style={{color: 'orange',}}>{title4}</Text>
            <Text style={{ marginLeft: 5,}}>{title1}</Text>
          </View>
          </View>
          <View style={{alignItems: 'flex-end', marginTop: 20, marginRight: 10,}}>
          <Image style={{width: 98, height: 103,}} source={require('../../assets/Images/Login/Mask_Group_28.png')}  />
          </View>
          <View style={{ alignItems: 'center'}}>
               <Text style={{ color: '#fff', marginTop: 10, marginBottom: 30,}}>{title2}<Text style={{color: '#fff',
    textDecorationLine: 'underline'}} onPress={ ()=> Linking.openURL('#') }>{title3}</Text></Text>
               </View> 
               </View>

            </View>

          
               </View>
          {/* <Text style={{ color: '#fff', marginBottom: 70, justifyContent: 'center',}}>dfdfdfdf</Text> */}
        </KeyboardAvoidingView>
      <Biometric
        isFaceIdEnable={biometric.isFaceId}
        cancelButtonClick={cancelButtonClick}
        handleFailure={handleFailure}
        handleSuccessfulAuth={handleSuccessfulAuth}
        biometricModelVisible={biometric.modelVisible}
      />
      </ScrollView>
    </View>
  );
}
export default Login;
