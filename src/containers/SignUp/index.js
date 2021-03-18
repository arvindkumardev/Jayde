import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView, } from 'react-native';
import  DropDownPicker from "react-native-dropdown-picker";

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
import { ENDPOINT, LOGIN_URL } from '../../utils/urls';
import commonStyles from '../../theme/commonStyles';
import {BIOMETRIC_FAILURE_ERROR, FACE_ID_ERROR, FINGER_ID_ERROR,} from '../../utils/error';
import {logEvent} from '../../services/firebase/AnalyticService';
import {ANALYTICS_EVENTS} from '../../services/firebase';
import { userLogin } from "../../services/middleware/user";
import axios from "axios";

// clearAll()
function SignUp() {
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

  const [ { data: emLoginData, loading: emLoginLoading, error: emLoginError}, emLogin ] = useAxios({ url: LOGIN_URL, method:"POST" }, { manual: true});
  
  const triggerLogin = async (username, password, org) => {
    try{
      const response = await userLogin({email: username, password: password});
      console.log(response);
      setLoader(false);
      // setLogin(true);
      moveToHome()
    }
    catch(e){
      console.log("Error", e);
      setLoader(false);
    }
  };

  const moveToHome = () => {
    navigation.navigate(NavigationRouteNames.HOME, {});
  }

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

  // useEffect(() => {
  //   console.log("Post data of login", emLoginData);
  //   if (emLoginData) {
  //       detectFingerprintAvailable();
  //     } else {
  //       console.log("error")
  //     }
  // }, [emLoginData]);


  // useEffect(() => {
  //   console.log("Post data of login error", emLoginError);
  // }, [emLoginError]);

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
  //   name: Yup.string().test('name', 'Please provide valid name', value => isValidName(value)),
  //   username: Yup.string().test('username', 'Please provide valid username', value => isValidUserName(value)),
  //   password: Yup.string().required('Please provide password'),
  //   phone: Yup.string().test('phone', 'Please provide valid phone', value => isValidphone(value)),
  // });

  const loginForm = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      username: '',
      password: '',
      phone: ''
    },
    // validationSchema,
  });

  const onSubmitEditing = (id) => {
    return inputs[id] ? inputs[id].focus() : null;
  };

  const navigateToHome = () => {
    setBiometric({...biometric, modelVisible: false});
    setLogin(true);
  };

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
  //         userDataJson.userInfo.name,
  //         userDataJson.userInfo.username,
  //         userDataJson.userInfo.password,
  //         userDataJson.userInfo.phone,
  //         userDataJson.org,
  //       );
  //     }
  //   });
  // };

  const handleLogin = () => {
    // setClickLogin(true);
    setLoader(true);
    triggerLogin(
      loginForm.values.username,
      loginForm.values.password,
      selectCompany,
    );

    // if (isEmpty(loginForm.errors)) {
    //   console.log("Login details", loginForm.values);
    //   triggerLogin(
    //     loginForm.values.username,
    //     loginForm.values.password,
    //     selectCompany,
    //   );
    // }
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

  const _SignupFunc = async () => {

    const URL = "http://ec2-52-91-165-234.compute-1.amazonaws.com/api/user/register"
    // alert(URL)
    // console.log(URL)
    axios.post(URL, {
        name: loginForm.values.name,
        email: loginForm.values.username,
        password: loginForm.values.password,
        phone: loginForm.values.phone,
        businessType: "seller",
        // device_name:device  
        device_name: 'opppp'
    }).then(function (response) {
            // AsyncStorage.setItem('@storage_Key', response.data.token)
            // AsyncStorage.setItem('Name', response.data.data.name)
            // AsyncStorage.setItem('Image', response.data.data.profile_photo_url)
            // global.Token = response.data.token
            // global.Name = response.data.data.name
            // global.image = response.data.data.profile_photo_url
            // setEmail('')
            // setPassword('')   
            console.log(response)
            alert(JSON.stringify(response))
            // navigation.navigate("PropertyListingPage", { value: ["1"] })
            // setLoading(false)
        }).catch(function (error) {
            console.log(JSON.stringify(error), "hello");
            setLoading(false)
            if (error.response.data.errors) {
                Alert.alert("Error", Object.values(error.response.data.errors)[0][0])

            }
            else {
                Alert.alert("Error", error.response.data.message)
            }
            
        });

    // if (emailStatus != '') {
    //     if (passwordStatus != "") {

           

    //     }
    //     else {
    //         setPasswordError("Please enter the Passoword")
    //     }

     //}
    // else {
    //     setEmailError("Please enter the Email")
    // }

}

  const [title,setTitle]=useState('Hello!');
  const [title1,setTitle1]=useState('Forgot Password?');
  const [title2,setTitle2]=useState('Dont have an account?');
  const [title3,setTitle3]=useState('Create one');
  const [title4,setTitle4]=useState('Signup');

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
           
           <View style={{flexDirection: 'row', marginTop: 30,}}>
        <View style={{flex: 1,}}>
        <TouchableOpacity>  
                    <View>  
                    <Image style={{width: 24, height: 24, marginLeft: 24,}} source={require('../../assets/Images/signupImage/Left_Arrow_Icon.png')}  />   
                        
                    </View>  
                </TouchableOpacity>  
        </View>
        <View style={{flex: 1,}}>
        <TouchableOpacity>  
                    <View style={{alignItems: 'flex-end',}}>  
                        <Text style={{fontSize: 16, color: '#fff', marginRight: 20,}}>{title4}</Text>  
                    </View>  
                </TouchableOpacity>  
        </View>
          </View> 

        
            
           <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 160, height: 55}} source={require('../../assets/Images/signupImage/JaydeLogo01.png')}  />    
                {/* <Image
          style={{width: 34, height: 34}}
          source={{uri: 
       'https://i.ytimg.com/vi/h1iPGP72Y8c/maxresdefault.jpg'}}
        /> */}
              </View> 

              <View style={{alignItems: 'center', marginTop: 60,}}>
              <Text style={{color: '#fff', marginBottom: 20, fontSize : 40, lineHeight: 48, fontWeight: 'bold',}}>{title}{JSON.stringify(emLoginData)}</Text>
              </View>
            <View style={styles.formContainer}>
              {/* <CustomText
                fontSize={22}
                color={Colors.black}
                fontWeight={'500'}>
                Mobile Number*
              </CustomText> */}
              <CustomTextInput
                label={'Name'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Name'}
                value={loginForm.values.name}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('name', value)
                }
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('name')}
                error={clickLogin && loginForm.errors.name}
              />
              <CustomTextInput
                label={'Email'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Email'}
                value={loginForm.values.username}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('username', value)
                }
                returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('password')}
                error={clickLogin && loginForm.errors.username}
              />
              <CustomTextInput
                 label={'Password'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Password'}
                secureTextEntry={!hidePassword}
                showPasswordField={hidePassword}
                handleShowPassword={(value) => setHidePassword(value)}
                 icon={hidePassword ? Images.openEye : Images.closeEye}
                value={loginForm.values.password}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('password', value)
                }
                returnKeyType={'next'}
                showClearButton={false}
                keyboardType={'password'}
                refKey={'password'}
                error={clickLogin && loginForm.errors.password}
              />
              <CustomTextInput
                label={'Phone Number'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Please Enter Your Phone Number'}
                value={loginForm.values.phone}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('phone', value)
                }
                // returnKeyType={'next'}
                onSubmitEditing={() => onSubmitEditing('phone')}
                error={clickLogin && loginForm.errors.phone}
              />

<View style={{marginTop: 15}}>
              <Text style={commonStyles.inputLabelText}>Please choose User Type</Text>
              <DropDownPicker
                showArrow={true}
                items={[
                    // {label: 'USA', value: 'usa', hidden: true},
                    {label: 'Select one', value: '0'},
                    {label: 'Admin', value: 'admin'},
                    {label: 'Seller', value: 'seller'},
                    {label: 'Aggregator', value: 'aggregator'},
                    {label: 'Recycler', value: 'recycler'},
                ]}
                defaultValue={"0"}
                globalTextStyle={commonStyles.dropDownText}
                containerStyle={{height: 45}}
                style={{backgroundColor: '#e4e4e4'}}
                itemStyle={{
                    justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => console.log(item)}
              />
            </View>

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
               <View style={{marginTop: RfH(10)}}>
              <TouchableOpacity style={{marginTop:20,
    borderRadius: 10,
    backgroundColor: 'orange',
    paddingVertical: 15,
    alignItems:'center'}} onPress={() => {_SignupFunc()}}>
                  <Text style={{fontSize: 18, color: 'white'}}>CONFIRM</Text>
              </TouchableOpacity>
             </View>

              {/* <View style={{marginTop: RfH(21)}}>
                <GradientButton title={'Confirm'} onPress={handleLogin} />
              </View> */}
             
            </View>
{/*             
            <View style={{flex: 1}}>
          <View style={{alignItems: 'flex-end', marginTop: 20, marginRight: 25,}}>
                <Text style={{ marginLeft: 5, color: '#fff',}}>{title1}</Text>
          </View>
          <View style={{ alignItems: 'center'}}>
               <Text style={{ color: '#fff', marginTop: 30, marginBottom: 30,}}>{title2}<Text style={{color: '#fff',
    textDecorationLine: 'underline'}} onPress={ ()=> Linking.openURL('#') }>{title3}</Text></Text>
               </View> 
               </View> */}

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
export default SignUp;
