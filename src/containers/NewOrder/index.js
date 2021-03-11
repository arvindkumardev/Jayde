import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, FlatList, ScrollView} from 'react-native';

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
function NewOrder() {
  //const navigation = useNavigation();
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

   const [title,setTitle]=useState('NEW ORDER');
   const [title1,setTitle1]=useState('Please choose a category');
  // const [title2,setTitle2]=useState('Current Orders');

  // const [arraydata,setarraydata]=useState([
  //   {
  //   name: '3 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/019',
  //   image: require('./Group_9993.png'),
  //   images: require('./Fill_164.png'),
  //   status: 'Pending',
  // },  {
  //   name: '4 Ton Paper',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/021',
  //   image: require('./Group_9993.png'),
  //   images: require('./Icon_metro-truck.png'),
  //   status: 'In Transit',
  // },  {
  //   name: '3 Ton Plastic',
  //   date: '21/01/21',
  //   orderid: 'JYD/N/21/011',
  //   image: require('./Group_9992.png'),
  //   images: require('./Group_9995.png'),
  //   status: 'Completed',
  // }])

  const [arraydata1,setarraydata1]=useState([
    {
    menuname: 'PAPER',
    text: '01',
    menu2image: require('./Group_2687.png'),
  },  {
    menuname: 'PLASTIC',
    text: '02',
    menu2image: require('./Group_2687.png'),
  },  {
    menuname: 'E-WASTE',
    text: '03',
    menu2image: require('./Group_2687.png'),
  },  {
    menuname: 'MIX WASTE',
    text: '04',
    menu2image: require('./Group_2687.png'),
  }])

  // const _RenderItem = (index, item) => {
  //   return (
  //     <View style={{flexDirection: 'row', marginLeft: 24,}}>
  //     <View style={{flex: .2, }}>
  //     <Image style={{width: 66, height: 66, marginTop: 10,}} source={item.image}  />
  //     </View>
  //     <View style={{flex: .6, }}>
  //     <Text style={{fontSize: 17, marginLeft: 15, marginTop: 12,}}>{item.orderid}</Text>
  //     <Text style={{fontSize: 15, marginLeft: 15,}}>{item.name}</Text>
  //     <Text style={{fontSize: 11, marginLeft: 15,}}>{item.date}</Text>
  //     </View>
  //     <View style={{flex: .2,}}>
  //     <Image style={{width: 15, height: 18, marginTop: 30, marginLeft: 15,}} source={item.images}  />
  //     <Text style={{fontSize: 11, color: '#000',}}>{item.status}</Text>
  //     </View>
  //     </View>     
  //   )
  // }

  const _RenderItem1 = (index, item) => {
    return (
      
          <View style={{width: '35%', height: 149, backgroundColor: '#fff', marginLeft: 24, marginTop: 25, borderTopLeftRadius: 10, borderTopRightRadius : 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
          <Text style={{fontSize: 16, color: '#796a6a', fontWeight: 'Poppins-SemiBold', marginTop: 11,}}>{item.text}</Text>
          <View style={{alignItems: 'flex-end', marginRight: 26,}}>
          <Image style={{width: 26, height: 26, marginTop: 38,}} source={item.menu2image}  />
          </View>
          <View style={{alignItems: 'center', }}>
               <Text style={{fontSize: 16, color: '#796a6a', fontWeight: 'Poppins-SemiBold', marginTop: 11,}}>{item.menuname}</Text>
               </View>
            </View>     
           
               
    )
  }
  
  
  
  return (
    <View style={{flex: 1,backgroundColor: '#f6f6f6',}}>
       <ScrollView>
       <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 155, height: 54}} source={require('./Jayde_Logo_02.png')}  /> 
				 </View>
         <View style={{marginTop: 50, marginLeft: 24, alignItems: 'center',}}>
            <Text style={{fontSize: 16,}}>{title}</Text>
            <Text style={{fontSize: 14, marginTop: 5,}}>{title1}</Text>
        </View>
         {/* <View style={{flexDirection: 'row',}}>
         <View style={{flex: .6, marginTop: 50, marginLeft: 24,}}>
        <Text style={{fontSize: 20,}}>{title}</Text>
        <Text style={{fontSize: 34, marginTop: 5,}}>{title1}</Text>
        </View>

        <View style={{flex: .4, }}>
        <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10,}}>
          <Image style={{width: 125, height: 132,}} source={require('./Mask_Group_28.png')}  />
          </View>
          </View>
          </View> */}

          <FlatList
        data={arraydata1}
        //  horizontal={true}
        renderItem={({ index, item }) =>
          _RenderItem1(index, item)
          // numColumns={2}
        }
        numColumns={2}
      />

         
            
            {/* <View style={{marginLeft: 24, marginTop: 15,}}>
            <Text style={{fontSize: 17, color: '#000', fontFamily: 'Poppins-SemiBold', }}>{title2}</Text>
            </View> */}

            {/* <FlatList
        data={arraydata}
        
        renderItem={({ index, item }) =>
          _RenderItem(index, item)
        }
        
      /> */}

          </ScrollView> 
        {/* <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({android: 'height', ios: 'padding'})}
          enabled>
              <View style={{alignItems: 'center', marginTop: 40,}}>
                 <Image style={{width: 160, height: 55}} source={require('./JaydeLogo01.png')}  />     */}
                {/* <Image
          style={{width: 34, height: 34}}
          source={{uri: 
       'https://i.ytimg.com/vi/h1iPGP72Y8c/maxresdefault.jpg'}}
        /> */}
              {/* </View> 
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingBottom: RfH(40),
            }}>
           
              <View style={{alignItems: 'center', marginTop: 120,}}>
              <Text style={{color: '#fff', marginBottom: 20, fontSize : 40, lineHeight: 48, fontWeight: 'bold',}}>Hello!</Text>
              </View>
            <View style={styles.formContainer}>
              <CustomText
                fontSize={22}
                color={Colors.black}
                fontWeight={'500'}>
                Mobile Number*
              </CustomText> */}
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
              {/* <CustomTextInput
                 label={'Password'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'+91'}

                handleShowPassword={(value) => setHidePassword(value)}
                icon={hidePassword ? Images.openEye : Images.closeEye}
                value={loginForm.values.password}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('password', value)
                }
                showClearButton={false}
                keyboardType={'numeric'}
                refKey={'password'}
                error={clickLogin && loginForm.errors.password}
              /> */}
            

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
              {/* <View style={{marginTop: RfH(21)}}>
                <GradientButton title={'Confirm'} onPress={handleLogin} />
              </View>
             
            </View>
            </View>

           <View style={{flex: 1}}>
          <View style={{marginTop: 40, marginHorizontal: RfW(56),
    backgroundColor: Colors.white,
    padding: RfW(10),
    borderRadius: RfH(25),}}>
      <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <Text style={{color: 'orange',}}>PARTNER LOGIN</Text>
            <Text style={{ marginLeft: 5,}}>Click here</Text>
          </View>
          </View>
          <View style={{alignItems: 'flex-end', marginTop: 20, marginRight: 10,}}>
          <Image style={{width: 98, height: 103,}} source={require('./Mask_Group_28.png')}  />
          </View>
          <View style={{ alignItems: 'center'}}>
               <Text style={{ color: '#fff', marginTop: 10, marginBottom: 30,}}>Don't have an account? <Text style={{color: '#fff',
    textDecorationLine: 'underline'}} onPress={ ()=> Linking.openURL('#') }>Create one</Text></Text>
               </View> 
               </View>
          
        </KeyboardAvoidingView>
      <Biometric
        isFaceIdEnable={biometric.isFaceId}
        cancelButtonClick={cancelButtonClick}
        handleFailure={handleFailure}
        handleSuccessfulAuth={handleSuccessfulAuth}
        biometricModelVisible={biometric.modelVisible}
      /> */}
      
    </View>
  );
}
export default NewOrder;
