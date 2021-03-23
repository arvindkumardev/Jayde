import React, {useContext, useEffect, useState} from 'react';
import * as Alert from 'react-native';
import {KeyboardAvoidingView, Platform, TouchableOpacity, View, Text, Image, TextInput, ScrollView, } from 'react-native';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import Colors from '../../theme/Colors';
import {CheckBoxWrapper, CustomTextInput, GradientButton,} from '../../components';
import {alertBox, comingSoonAlert, getSaveData, isValidUserName, RfH, RfW, storeData} from '../../utils/helpers';
import CustomText from '../../components/CustomText';
import {isEmpty} from 'lodash';
import Images from '../../theme/Images';
import NavigationRouteNames from '../../routes/ScreenNames';
import {useNavigation} from '@react-navigation/core';
import UserContext from './user.context';
import useAxios from 'axios-hooks';
import styles from './styles';
import {LOGIN_URL} from '../../utils/urls';
import commonStyles from '../../theme/commonStyles';


function LoginWithEmail() {
  const navigation = useNavigation();
  const [clickLogin, setClickLogin] = useState(false);
  const {user, setUserObj, setLogin, orgLoading, orgData, setLoader} = useContext(UserContext);
  const [tries, setTries] = useState(2);
  const [selectCompany, setSelectCompany] = useState({});
  const [selectCompanyModal, setSelectCompanyModal] = useState(false);
  const [needHelpModal, setNeedHelpModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false);
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
  };



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


  useEffect(()=>{
    setLoader(emLoginLoading);
  }, [emLoginLoading]);

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
                    <Image style={{width: 24, height: 24, marginLeft: 24,}} source={require('../../assets/Images/LoginWithEmail/Left_Arrow_Icon.png')}  />   
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
                 <Image style={{width: 160, height: 55}} source={require('../../assets/Images/LoginWithEmail/JaydeLogo01.png')}  />    
              </View> 

              <View style={{alignItems: 'center', marginTop: 60,}}>
              <Text style={{color: '#fff', marginBottom: 20, fontSize : 40, lineHeight: 48, fontWeight: 'bold',}}>{title}</Text>
              </View>
            <View style={styles.formContainer}>
              <CustomTextInput
                label={'Email'}
                inputLabelStyle={commonStyles.inputLabelStyle}
                placeholder={'Email'}
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
                placeholder={'Password'}
                secureTextEntry={!hidePassword}
                showPasswordField={hidePassword}
                handleShowPassword={(value) => setHidePassword(value)}
                 icon={hidePassword ? Images.openEye : Images.closeEye}
                value={loginForm.values.password}
                onChangeHandler={(value) =>
                  loginForm.setFieldValue('password', value)
                }
                showClearButton={false}
                keyboardType={'password'}
                refKey={'password'}
                error={clickLogin && loginForm.errors.password}
              />
           

              <View style={{marginTop: RfH(21)}}>
                <GradientButton title={'Confirm'} onPress={handleLogin} />
              </View>
             
            </View>
            
            <View style={{flex: 1}}>
          <View style={{alignItems: 'flex-end', marginTop: 20, marginRight: 25,}}>
                <Text style={{ marginLeft: 5, color: '#fff',}}>{title1}</Text>
          </View>
          <View style={{ alignItems: 'center'}}>
               <Text style={{ color: '#fff', marginTop: 30, marginBottom: 30,}}>{title2}<Text style={{color: '#fff',
    textDecorationLine: 'underline'}} onPress={ ()=> Linking.openURL('#') }>{title3}</Text></Text>
               </View> 
               </View>

            </View>

          
               </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
export default LoginWithEmail;
